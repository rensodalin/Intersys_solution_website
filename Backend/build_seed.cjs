const fs = require('fs');
const path = require('path');

// --- READ SALTO DATA ---
const saltoDataStr = fs.readFileSync(path.join(__dirname, '../frontend/src/components/Product/AccessControl/Salto/data.ts'), 'utf-8');
const saltoDataCode = saltoDataStr
    .replace(/export interface.*?\{[^}]*\}/gs, '')
    .replace(/export const saltoProducts.*?=/s, 'const saltoProducts =');

let saltoProducts = [];
eval(saltoDataCode + '\n saltoProducts_ = saltoProducts;');

// --- READ HONEYWELL DATA ---
const honeywellDataStr = fs.readFileSync(path.join(__dirname, '../frontend/src/components/Product/AccessControl/Honeywell/data.ts'), 'utf-8');
const honeywellDataCode = honeywellDataStr.replace(/export const /g, 'const ');

let honeywellMainProducts, honeywellAccessories, honeywellCredentials, honeywellReaders, honeywellSoftware, honeywellControlPanelKits, honeywellKiosks, honeywellUpgrades, honeywellDoorHardware, honeywellControlPanels;
eval(honeywellDataCode + `
    honeywellMainProducts_ = honeywellMainProducts;
    honeywellAccessories_ = honeywellAccessories;
    honeywellCredentials_ = honeywellCredentials;
    honeywellReaders_ = honeywellReaders;
    honeywellSoftware_ = honeywellSoftware;
    honeywellControlPanelKits_ = honeywellControlPanelKits;
    honeywellKiosks_ = honeywellKiosks;
    honeywellUpgrades_ = honeywellUpgrades;
    honeywellDoorHardware_ = honeywellDoorHardware;
    honeywellControlPanels_ = honeywellControlPanels;
`);

const finalProducts = [];

// Helper to generate slug
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Map Salto
saltoProducts_.forEach(category => {
    // If it has subProducts, each subProduct is a separate product in the database?
    // Or is the category itself a product? The user wants "product page in frontend ... product detail"
    // Usually, the subProducts are the actual products
    if (category.subProducts && category.subProducts.length > 0) {
        category.subProducts.forEach(sub => {
            finalProducts.push({
                productId: sub.id,
                category: "Access Control",
                brand: "Salto",
                title: sub.title,
                description: sub.description,
                mainImage: sub.image,
                thumbnails: [sub.image],
                brandSubCategory: category.title,
                brandSubCategoryLink: `/products/access-control/salto#${category.id}`,
                longDescription: sub.description + "\n\nDesigned for seamless integration into modern access control systems.",
                options: [
                    { partCode: "DEFAULT-1", specification: "Standard Profile", price: 0, qty: 0 }
                ],
                documents: [
                    { name: "Datasheet", url: "#" }
                ]
            });
        });
    } else {
        finalProducts.push({
            productId: category.id,
            category: "Access Control",
            brand: "Salto",
            title: category.title,
            description: category.description,
            mainImage: category.image,
            thumbnails: [category.image],
            brandSubCategory: "General",
            brandSubCategoryLink: `/products/access-control/salto`,
            longDescription: category.description,
            options: [],
            documents: []
        });
    }
});

// Map Honeywell
const processHoneywell = (arr, subCategoryName) => {
    if (!arr) return;
    arr.forEach(item => {
        const pId = `honeywell-${slugify(subCategoryName)}-${slugify(item.title)}`;
        finalProducts.push({
            productId: pId,
            category: "Access Control",
            brand: "Honeywell",
            title: item.title,
            description: item.desc,
            mainImage: item.image,
            thumbnails: [item.image],
            brandSubCategory: subCategoryName,
            brandSubCategoryLink: `/products/access-control/honeywell/${slugify(subCategoryName)}`,
            longDescription: item.desc + "\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
            options: [
                { partCode: "HW-DEF-01", specification: "Standard Configuration", price: 0, qty: 0 }
            ],
            documents: [
                { name: "Technical Specifications", url: "#" }
            ]
        });
    });
};

processHoneywell(honeywellMainProducts_, "Main Products");
processHoneywell(honeywellAccessories_, "Accessories");
processHoneywell(honeywellCredentials_, "Credentials");
processHoneywell(honeywellReaders_, "Readers");
processHoneywell(honeywellSoftware_, "Software");
processHoneywell(honeywellControlPanelKits_, "Control Panel Kits");
processHoneywell(honeywellKiosks_, "Kiosks");
processHoneywell(honeywellUpgrades_, "Upgrades");
processHoneywell(honeywellDoorHardware_, "Door Hardware");
processHoneywell(honeywellControlPanels_, "Control Panels");

const seedScriptContent = `import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";

dotenv.config();

const MOCK_PRODUCTS = ${JSON.stringify(finalProducts, null, 4)};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/intersys");
        console.log("MongoDB Connected for seeding Products...");

        await Product.deleteMany({});
        console.log("Old products cleared.");

        await Product.insertMany(MOCK_PRODUCTS);
        console.log("New products inserted successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedDB();
`;

fs.writeFileSync(path.join(__dirname, 'seedProducts.js'), seedScriptContent);
console.log('seedProducts.js generated successfully with ' + finalProducts.length + ' products.');
