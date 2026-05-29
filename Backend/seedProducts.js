import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";

dotenv.config();

const MOCK_PRODUCTS = [
    {
        "productId": "xs4-original-plus-euro",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ORIGINAL+ EURO",
        "description": "State-of-the-art electronic lock with European profile compatibility and advanced security features.",
        "mainImage": "https://entrypass.co.id/wp-content/uploads/2023/12/Group-18-300x300.jpg",
        "thumbnails": [
            "https://entrypass.co.id/wp-content/uploads/2023/12/Group-18-300x300.jpg"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "State-of-the-art electronic lock with European profile compatibility and advanced security features.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-original-plus-ansi",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ORIGINAL + ANSI",
        "description": "Versatile ANSI-standard electronic lock designed for North American and international markets.",
        "mainImage": "https://manuals.plus/wp-content/uploads/2022/03/SALTO-XS4-Original-Doors-Lock-image-.jpg",
        "thumbnails": [
            "https://manuals.plus/wp-content/uploads/2022/03/SALTO-XS4-Original-Doors-Lock-image-.jpg"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "Versatile ANSI-standard electronic lock designed for North American and international markets.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "aelement-fusion-ansi",
        "category": "Access Control",
        "brand": "Salto",
        "title": "ÆLEMENT FUSION - ANSI",
        "description": "Minimalist design meeting heavy-duty ANSI standards for seamless architectural integration.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-fusion-ansi-satin-stainless-blacklector_1.png?itok=Ar6yoaUp",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-fusion-ansi-satin-stainless-blacklector_1.png?itok=Ar6yoaUp"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "Minimalist design meeting heavy-duty ANSI standards for seamless architectural integration.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-original-plus-scandinavian",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ORIGINAL + SCANDINAVIAN",
        "description": "Specialized electronic lock optimized for Scandinavian profile doors and locking hardware.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-original-plus-scan-list.png?itok=U_TVB4Jo",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-original-plus-scan-list.png?itok=U_TVB4Jo"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "Specialized electronic lock optimized for Scandinavian profile doors and locking hardware.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-one-eu",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ONE - EU",
        "description": "The classic SALTO One redesigned with a slim silhouette for modern European environments.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/xs4-one-eu-satin-stainless-blacklector_0.png?itok=jNkD-pEK",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/xs4-one-eu-satin-stainless-blacklector_0.png?itok=jNkD-pEK"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "The classic SALTO One redesigned with a slim silhouette for modern European environments.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-one-deadlatch",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ONE - DEADLATCH",
        "description": "High-security deadlatch integration for the proven XS4 One electronic platform.",
        "mainImage": "https://strapi-media-bucket.fly.storage.tigris.dev/salto_xs4_one_deadlatch_satin_stainless_steel_front_bc201e46b9.png",
        "thumbnails": [
            "https://strapi-media-bucket.fly.storage.tigris.dev/salto_xs4_one_deadlatch_satin_stainless_steel_front_bc201e46b9.png"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "High-security deadlatch integration for the proven XS4 One electronic platform.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-one-din",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ONE - DIN",
        "description": "DIN-standard compliant electronic lock providing robust security and easy system integration.",
        "mainImage": "https://entrypass.co.id/wp-content/uploads/2023/12/Group-13.jpg",
        "thumbnails": [
            "https://entrypass.co.id/wp-content/uploads/2023/12/Group-13.jpg"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "DIN-standard compliant electronic lock providing robust security and easy system integration.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "aelement-fusion-eu-din",
        "category": "Access Control",
        "brand": "Salto",
        "title": "ÆLEMENT FUSION - EU / DIN",
        "description": "An elegant, minimalist locking solution compatible with European and DIN hardware standards.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-fusion-eu-satin-stainless-blacklector.png?itok=mlcg0HnP",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-fusion-eu-satin-stainless-blacklector.png?itok=mlcg0HnP"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "An elegant, minimalist locking solution compatible with European and DIN hardware standards.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "aelement-eu",
        "category": "Access Control",
        "brand": "Salto",
        "title": "ÆLEMENT - EU",
        "description": "Premium European-style electronic lock blending advanced technology with refined aesthetics.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-eu-satin-stainless-blacklector.png?itok=YGcoOqY5",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-eu-satin-stainless-blacklector.png?itok=YGcoOqY5"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "Premium European-style electronic lock blending advanced technology with refined aesthetics.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-mini-ansi",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 MINI - ANSI",
        "description": "Compact ANSI-standard electronic lock ideal for internal office doors and light-duty applications.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-mini-ansi.png?itok=uBMfDGuD",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-mini-ansi.png?itok=uBMfDGuD"
        ],
        "brandSubCategory": "Electronic Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locks",
        "longDescription": "Compact ANSI-standard electronic lock ideal for internal office doors and light-duty applications.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-european",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - EUROPEAN CYLINDER",
        "description": "The platform's most versatile cylinder, compliant with European profile doors.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/cylinder-eu-satinchrome-black.png?itok=-ppoadNb",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/cylinder-eu-satinchrome-black.png?itok=-ppoadNb"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "The platform's most versatile cylinder, compliant with European profile doors.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-uk-oval",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - UK OVAL CYLINDER",
        "description": "Specialized oval cylinder designed for UK-standard professional installations.",
        "mainImage": "https://strapi-media-bucket.fly.storage.tigris.dev/salto_neo_cylinder_black_front_af26794bde.png",
        "thumbnails": [
            "https://strapi-media-bucket.fly.storage.tigris.dev/salto_neo_cylinder_black_front_af26794bde.png"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Specialized oval cylinder designed for UK-standard professional installations.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-swiss",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - SWISS CYLINDER",
        "description": "Swiss-standard compliant electronic cylinder with high-precision engineering.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/cylinder-swiss-satinchrome-black_0.png?itok=3Rh3_oDq",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/cylinder-swiss-satinchrome-black_0.png?itok=3Rh3_oDq"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Swiss-standard compliant electronic cylinder with high-precision engineering.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-scandinavian-oval",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - SCANDINAVIAN OVAL CYLINDER",
        "description": "Designed for Scandinavian profile doors, balancing security and ease of use.",
        "mainImage": "https://entrypass.co.id/wp-content/uploads/2023/12/Group-38.jpg",
        "thumbnails": [
            "https://entrypass.co.id/wp-content/uploads/2023/12/Group-38.jpg"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Designed for Scandinavian profile doors, balancing security and ease of use.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-scandinavian-security",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - SCANDINAVIAN SECURITY CYLINDER",
        "description": "Ultra-high security variant for specialized Scandinavian perimeter hardware.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-scand-security-list_0.jpg?itok=NpEHFh53",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-scand-security-list_0.jpg?itok=NpEHFh53"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Ultra-high security variant for specialized Scandinavian perimeter hardware.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-rim-uk",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - RIM UK CYLINDER",
        "description": "Rim-mounted cylinder solution for UK-style night latches and gates.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-rim-uk-satin-chrome-blacklector_7.jpg?itok=2-szuujY",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-rim-uk-satin-chrome-blacklector_7.jpg?itok=2-szuujY"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Rim-mounted cylinder solution for UK-style night latches and gates.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-rim-us",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - RIM US CYLINDER",
        "description": "US-standard Rim cylinder for panic bars and storefront locking hardware.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-rim-us-satin-chrome-blacklector_7.jpg?itok=ji6XLvS_",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-rim-us-satin-chrome-blacklector_7.jpg?itok=ji6XLvS_"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "US-standard Rim cylinder for panic bars and storefront locking hardware.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-mortise",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - MORTISE CYLINDER",
        "description": "Industrial-grade mortise cylinder for heavy-duty commercial locking systems.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-mortise-satin-chrome-blacklector_1.jpg?itok=Z-diQOsh",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-mortise-satin-chrome-blacklector_1.jpg?itok=Z-diQOsh"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Industrial-grade mortise cylinder for heavy-duty commercial locking systems.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-cam-lock",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - CAM LOCK CYLINDER",
        "description": "Compact cam lock cylinder for secure cabinets, lockers, and furniture.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-camlock-satin-chrome-blacklector_6.jpg?itok=qUr07kCe",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-camlock-satin-chrome-blacklector_6.jpg?itok=qUr07kCe"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Compact cam lock cylinder for secure cabinets, lockers, and furniture.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neo-deadbolt",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEO - DEADBOLT CYLINDER",
        "description": "Secure deadbolt integration providing high-torque resistance and keyless convenience.",
        "mainImage": "https://entrypass.co.id/wp-content/uploads/2023/12/Group-42.jpg",
        "thumbnails": [
            "https://entrypass.co.id/wp-content/uploads/2023/12/Group-42.jpg"
        ],
        "brandSubCategory": "Electronic Cylinders",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-cylinders",
        "longDescription": "Secure deadbolt integration providing high-torque resistance and keyless convenience.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "gantner-net-lock",
        "category": "Access Control",
        "brand": "Salto",
        "title": "GANTNER NET.LOCK",
        "description": "Smart networked locker lock for advanced facility management and security.",
        "mainImage": "https://entrypass.co.id/wp-content/uploads/2023/11/Group-1.jpg",
        "thumbnails": [
            "https://entrypass.co.id/wp-content/uploads/2023/11/Group-1.jpg"
        ],
        "brandSubCategory": "Electronic Locker Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locker-locks",
        "longDescription": "Smart networked locker lock for advanced facility management and security.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-locker-lock",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LOCKER LOCK",
        "description": "Sustainable and easy-to-install electronic locker lock for various applications.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-lock.png?itok=NLTskoUJ",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-lock.png?itok=NLTskoUJ"
        ],
        "brandSubCategory": "Electronic Locker Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locker-locks",
        "longDescription": "Sustainable and easy-to-install electronic locker lock for various applications.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "gantner-eco-side-lock",
        "category": "Access Control",
        "brand": "Salto",
        "title": "GANTNER ECO.SIDE LOCK",
        "description": "Battery-powered electronic lock for lockers with advanced RFID technology.",
        "mainImage": "https://www.gantner.com/Website/Products/ECO.Side%20Lock/876/image-thumb__876__image-slider-hero-image/Gantner-ECO-Side.Lock-220114148594.f502dc84.jpg",
        "thumbnails": [
            "https://www.gantner.com/Website/Products/ECO.Side%20Lock/876/image-thumb__876__image-slider-hero-image/Gantner-ECO-Side.Lock-220114148594.f502dc84.jpg"
        ],
        "brandSubCategory": "Electronic Locker Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locker-locks",
        "longDescription": "Battery-powered electronic lock for lockers with advanced RFID technology.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "gantner-eco-lock",
        "category": "Access Control",
        "brand": "Salto",
        "title": "GANTNER ECO.LOCK",
        "description": "Efficient and reliable electronic locker lock for secure storage solutions.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/eco-lock-finish.jpg?itok=Q7Rztwgd",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/eco-lock-finish.jpg?itok=Q7Rztwgd"
        ],
        "brandSubCategory": "Electronic Locker Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locker-locks",
        "longDescription": "Efficient and reliable electronic locker lock for secure storage solutions.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "gantner-gl7p",
        "category": "Access Control",
        "brand": "Salto",
        "title": "GANTNER GL7P",
        "description": "High-performance battery-operated locker lock for premium environments.",
        "mainImage": "https://www.gantner.com/Website/Products/GL7p/151/image-thumb__151__image-slider-hero-image/Battery%20Lock%20GL7p%20GANTNER%2002.c642728d.jpg",
        "thumbnails": [
            "https://www.gantner.com/Website/Products/GL7p/151/image-thumb__151__image-slider-hero-image/Battery%20Lock%20GL7p%20GANTNER%2002.c642728d.jpg"
        ],
        "brandSubCategory": "Electronic Locker Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locker-locks",
        "longDescription": "High-performance battery-operated locker lock for premium environments.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-eco-lock",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 ECO LOCK",
        "description": "Environmentally friendly and cost-effective electronic locker locking solution.",
        "mainImage": "https://support.saltosystems.com/installation-guides/locker-locks/images/xs4-eco-lock.7ce45aa38e6ada3ef71796ad1a6470862af360e4a048408ab7e6259d59d8dc90.png",
        "thumbnails": [
            "https://support.saltosystems.com/installation-guides/locker-locks/images/xs4-eco-lock.7ce45aa38e6ada3ef71796ad1a6470862af360e4a048408ab7e6259d59d8dc90.png"
        ],
        "brandSubCategory": "Electronic Locker Locks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-locker-locks",
        "longDescription": "Environmentally friendly and cost-effective electronic locker locking solution.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neoxx-g3",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEOXX G3 PADLOCK",
        "description": "The next generation of high-security electronic padlocks with a versatile design.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-g3-list-2.jpg?itok=pjj-u0VO",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-g3-list-2.jpg?itok=pjj-u0VO"
        ],
        "brandSubCategory": "Electronic Padlocks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-padlocks",
        "longDescription": "The next generation of high-security electronic padlocks with a versatile design.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-neoxx-g4",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO NEOXX G4 PADLOCK",
        "description": "Advanced electronic padlock featuring robust engineering and cloud-native integration.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-list_0.png?itok=EA1dtfcB",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-list_0.png?itok=EA1dtfcB"
        ],
        "brandSubCategory": "Electronic Padlocks",
        "brandSubCategoryLink": "/products/access-control/salto#electronic-padlocks",
        "longDescription": "Advanced electronic padlock featuring robust engineering and cloud-native integration.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "design-xs-european",
        "category": "Access Control",
        "brand": "Salto",
        "title": "DESIGN XS - EUROPEAN WALL READER",
        "description": "Sleek European-standard wall reader with advanced authentication technology.",
        "mainImage": "https://lsc.com.au/Images/ProductImages/WRDM0E4B.jpg",
        "thumbnails": [
            "https://lsc.com.au/Images/ProductImages/WRDM0E4B.jpg"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Sleek European-standard wall reader with advanced authentication technology.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "design-xs-european-keypad",
        "category": "Access Control",
        "brand": "Salto",
        "title": "DESIGN XS - EUROPEAN KEYPAD WALL READER",
        "description": "Integrated keypad and reader for multi-factor authentication in a European profile.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/news/design-xs-reader-keypad-1490-news.jpg?itok=0DTu8tUD",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/news/design-xs-reader-keypad-1490-news.jpg?itok=0DTu8tUD"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Integrated keypad and reader for multi-factor authentication in a European profile.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "design-xs-mullion",
        "category": "Access Control",
        "brand": "Salto",
        "title": "DESIGN XS - MULLION WALL READER",
        "description": "Compact mullion-mount reader ideal for narrow door frames and aluminum profiles.",
        "mainImage": "https://shop.cie-group.com/media/prod_images_nodel/WRD_MB_1-scaled.jpg",
        "thumbnails": [
            "https://shop.cie-group.com/media/prod_images_nodel/WRD_MB_1-scaled.jpg"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Compact mullion-mount reader ideal for narrow door frames and aluminum profiles.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "design-xs-ansi",
        "category": "Access Control",
        "brand": "Salto",
        "title": "DESIGN XS - ANSI WALL READER",
        "description": "ANSI-standard wall reader designed for the North American market and international standards.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/wallreader-ansi-blacklector_0.png?itok=JMLWsD0s",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/wallreader-ansi-blacklector_0.png?itok=JMLWsD0s"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "ANSI-standard wall reader designed for the North American market and international standards.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "design-xs-ansi-keypad",
        "category": "Access Control",
        "brand": "Salto",
        "title": "DESIGN XS - ANSI KEYPAD WALL READER",
        "description": "Robust ANSI-profile reader with integrated secure PIN keypad.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wallreader-ansi-keypad-2.png?itok=dExJDFMX",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wallreader-ansi-keypad-2.png?itok=dExJDFMX"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Robust ANSI-profile reader with integrated secure PIN keypad.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "wave-xs-eu",
        "category": "Access Control",
        "brand": "Salto",
        "title": "WAVE XS - EU TOUCHLESS BUTTON",
        "description": "Hygienic touchless exit button with customizable LED response for European gang boxes.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wave-xs-eu-list.jpg?itok=d7TjmIJa",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wave-xs-eu-list.jpg?itok=d7TjmIJa"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Hygienic touchless exit button with customizable LED response for European gang boxes.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "wave-xs-dk",
        "category": "Access Control",
        "brand": "Salto",
        "title": "WAVE XS - DK TOUCHLESS BUTTON",
        "description": "Advanced touchless button technology optimized for Danish-standard installations.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wave-xs-dk-list.jpg?itok=OlSKKETu",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wave-xs-dk-list.jpg?itok=OlSKKETu"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Advanced touchless button technology optimized for Danish-standard installations.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "modular-xs-eu",
        "category": "Access Control",
        "brand": "Salto",
        "title": "MODULAR XS - EU WALL READER",
        "description": "Flexible, modular reader solution designed for diverse mounting and integration requirements.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/modular-xs-eu-wr-list.jpg?itok=-nO_worG",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/modular-xs-eu-wr-list.jpg?itok=-nO_worG"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Flexible, modular reader solution designed for diverse mounting and integration requirements.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "panel-xs",
        "category": "Access Control",
        "brand": "Salto",
        "title": "PANEL XS READER",
        "description": "Integrated panel reader designed for seamless mounting within elevator or intercom panels.",
        "mainImage": "https://image.archify.com/catalog/product/l/sbz79-53v8u-1656562640.jpg",
        "thumbnails": [
            "https://image.archify.com/catalog/product/l/sbz79-53v8u-1656562640.jpg"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Integrated panel reader designed for seamless mounting within elevator or intercom panels.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "long-distance-xs",
        "category": "Access Control",
        "brand": "Salto",
        "title": "LONG DISTANCE XS READER",
        "description": "Specialized reader for long-range identification, ideal for vehicle gates and parking areas.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/long-distance-wr-list.jpg?itok=ekFE3zhI",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/long-distance-wr-list.jpg?itok=ekFE3zhI"
        ],
        "brandSubCategory": "Wall Readers",
        "brandSubCategoryLink": "/products/access-control/salto#wall-readers",
        "longDescription": "Specialized reader for long-range identification, ideal for vehicle gates and parking areas.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-face-camera",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 FACE CAMERA",
        "description": "AI-powered facial recognition camera for seamless and ultra-secure contactless access control.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/salto-product-orion-c-header-op.png?itok=_SEDnUCC",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/salto-product-orion-c-header-op.png?itok=_SEDnUCC"
        ],
        "brandSubCategory": "Face Recognition Terminals",
        "brandSubCategoryLink": "/products/access-control/salto#face-recognition-terminals",
        "longDescription": "AI-powered facial recognition camera for seamless and ultra-secure contactless access control.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "bluenet-door-controller",
        "category": "Access Control",
        "brand": "Salto",
        "title": "BLUENET DOOR CONTROLLER - STANDARD UNIT",
        "description": "Wireless network door controller with BlueNet technology for real-time access management.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bluenet-door-controller-finish.jpg?itok=bjRPVu37",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bluenet-door-controller-finish.jpg?itok=bjRPVu37"
        ],
        "brandSubCategory": "Access Controllers",
        "brandSubCategoryLink": "/products/access-control/salto#access-controllers",
        "longDescription": "Wireless network door controller with BlueNet technology for real-time access management.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-auxiliary-cu4200",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO AUXILIARY - CU4200 CONTROLLER",
        "description": "High-performance auxiliary door controller with enterprise-level security features.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU4200.jpg?itok=HiMr9eLJ",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU4200.jpg?itok=HiMr9eLJ"
        ],
        "brandSubCategory": "Access Controllers",
        "brandSubCategoryLink": "/products/access-control/salto#access-controllers",
        "longDescription": "High-performance auxiliary door controller with enterprise-level security features.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-svn-online-cu42eo",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO SVN ONLINE - CU42EO CONTROLLER",
        "description": "Smart online door controller powered by SALTO Virtual Network (SVN) technology.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU42E0.jpg?itok=MIpwy6A5",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU42E0.jpg?itok=MIpwy6A5"
        ],
        "brandSubCategory": "Access Controllers",
        "brandSubCategoryLink": "/products/access-control/salto#access-controllers",
        "longDescription": "Smart online door controller powered by SALTO Virtual Network (SVN) technology.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-ubox4000",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO UBOX4000",
        "description": "Robust and compact security unit for centralized access management.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/UBOX4000.jpg?itok=ytzYuEjO",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/UBOX4000.jpg?itok=ytzYuEjO"
        ],
        "brandSubCategory": "Access Controllers",
        "brandSubCategoryLink": "/products/access-control/salto#access-controllers",
        "longDescription": "Robust and compact security unit for centralized access management.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-expansion-board-cu4eb8",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO EXPANSION BOARD - CU4EB8",
        "description": "Versatile expansion board adding additional input/output capacity to CU series controllers.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU4EB8.jpg?itok=DowhAQPU",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU4EB8.jpg?itok=DowhAQPU"
        ],
        "brandSubCategory": "Access Controllers",
        "brandSubCategoryLink": "/products/access-control/salto#access-controllers",
        "longDescription": "Versatile expansion board adding additional input/output capacity to CU series controllers.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-com-igo",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 COM IGO",
        "description": "Smart video intercom unit providing secure and visual visitor management directly from your mobile device.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/product-XS4-com-igo-header.png?itok=Ls92RafT",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/product-XS4-com-igo-header.png?itok=Ls92RafT"
        ],
        "brandSubCategory": "Door Intercom Systems",
        "brandSubCategoryLink": "/products/access-control/salto#door-intercom-systems",
        "longDescription": "Smart video intercom unit providing secure and visual visitor management directly from your mobile device.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-danalock-v3-european",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO DANALOCK V3 - EUROPEAN",
        "description": "Smart motorized lock solution compatible with European profile doors for effortless entry.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/danalock-eu-ambiente.jpg?itok=isgApHhJ",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/danalock-eu-ambiente.jpg?itok=isgApHhJ"
        ],
        "brandSubCategory": "Motorized Locks",
        "brandSubCategoryLink": "/products/access-control/salto#motorized-locks",
        "longDescription": "Smart motorized lock solution compatible with European profile doors for effortless entry.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-danalock-v3-deadbolt",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO DANALOCK V3 - DEADBOLT",
        "description": "Heavy-duty smart deadbolt motorized lock for superior residential and commercial security.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/Danalock_deadbolt_black.png?itok=sx4G46IQ",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/Danalock_deadbolt_black.png?itok=sx4G46IQ"
        ],
        "brandSubCategory": "Motorized Locks",
        "brandSubCategoryLink": "/products/access-control/salto#motorized-locks",
        "longDescription": "Heavy-duty smart deadbolt motorized lock for superior residential and commercial security.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "salto-danalock-v3-scandinavian",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SALTO DANALOCK V3 - SCANDINAVIAN",
        "description": "Modern motorized smart lock optimized for Scandinavian door hardware standards.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/Danalock_silver_finish_0.png?itok=jKarA41K",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/Danalock_silver_finish_0.png?itok=jKarA41K"
        ],
        "brandSubCategory": "Motorized Locks",
        "brandSubCategoryLink": "/products/access-control/salto#motorized-locks",
        "longDescription": "Modern motorized smart lock optimized for Scandinavian door hardware standards.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-pbe900",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 PBE900 - PANIC BAR",
        "description": "Europe-compliant electronic panic bar solution for high-security emergency exits.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/PBE900-satin-stainless.jpg?itok=xbuFoIT5",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/PBE900-satin-stainless.jpg?itok=xbuFoIT5"
        ],
        "brandSubCategory": "Panic Bars & Emergency Exit Devices",
        "brandSubCategoryLink": "/products/access-control/salto#panic-bars",
        "longDescription": "Europe-compliant electronic panic bar solution for high-security emergency exits.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-pba1200",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 PBA 1200 - PANIC BAR",
        "description": "Advanced panic bar interface compatible with wide-stile doors and SALTO access control.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/PBA1200-satin-stainless.jpg?itok=fGpxdU0M",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/PBA1200-satin-stainless.jpg?itok=fGpxdU0M"
        ],
        "brandSubCategory": "Panic Bars & Emergency Exit Devices",
        "brandSubCategoryLink": "/products/access-control/salto#panic-bars",
        "longDescription": "Advanced panic bar interface compatible with wide-stile doors and SALTO access control.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-pbf110",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 PBF 110 - PANIC BAR",
        "description": "Secure push bar solution designed for rapid egress and effortless system integration.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-push-bar.png?itok=Rkeai8GW",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-push-bar.png?itok=Rkeai8GW"
        ],
        "brandSubCategory": "Panic Bars & Emergency Exit Devices",
        "brandSubCategoryLink": "/products/access-control/salto#panic-bars",
        "longDescription": "Secure push bar solution designed for rapid egress and effortless system integration.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-kpbs",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 KPBS - KEYPAD PANIC BAR",
        "description": "High-security keypad-integrated panic bar for controlled emergency exit monitoring.",
        "mainImage": "https://www.sourcesecurity.com/img/products/400/xs4-kpbs-400.jpg",
        "thumbnails": [
            "https://www.sourcesecurity.com/img/products/400/xs4-kpbs-400.jpg"
        ],
        "brandSubCategory": "Panic Bars & Emergency Exit Devices",
        "brandSubCategoryLink": "/products/access-control/salto#panic-bars",
        "longDescription": "High-security keypad-integrated panic bar for controlled emergency exit monitoring.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-le7s",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LE7S - EUROPEAN MORTISE LOCK",
        "description": "Standard European profile mortise lock for secure and reliable door operations.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le7s-list.jpg?itok=Rz3vMlqv",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le7s-list.jpg?itok=Rz3vMlqv"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "Standard European profile mortise lock for secure and reliable door operations.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-la1t",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LA1T - ANSI MORTISE LOCK",
        "description": "Heavy-duty ANSI-standard mortise lock designed for North American hardware requirements.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/la1t-automatic-list.jpg?itok=OX2SmrL2",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/la1t-automatic-list.jpg?itok=OX2SmrL2"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "Heavy-duty ANSI-standard mortise lock designed for North American hardware requirements.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-ls5n",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LS5N - SCANDINAVIAN MORTISE LOCK",
        "description": "Specialized Scandinavian profile mortise lock for northern European door standards.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ls5n-list.jpg?itok=zo2YMZSR",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ls5n-list.jpg?itok=zo2YMZSR"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "Specialized Scandinavian profile mortise lock for northern European door standards.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-le8p",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LE8P - EUROPEAN MORTISE LOCK",
        "description": "European-style mortise lock featuring high-torque resistance and precision engineering.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le8p-list.jpg?itok=h5dbdO-E",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le8p-list.jpg?itok=h5dbdO-E"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "European-style mortise lock featuring high-torque resistance and precision engineering.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-la1t-automatic",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LA1T - ANSI AUTOMATIC MORTISE",
        "description": "Automatic latching ANSI mortise lock for enhanced convenience and perimeter security.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/la1t-list.jpg?itok=a6-FmiDs",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/la1t-list.jpg?itok=a6-FmiDs"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "Automatic latching ANSI mortise lock for enhanced convenience and perimeter security.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-le9w",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LE9W - EUROPEAN MORTISE LOCK",
        "description": "Advanced European mortise lock optimized for wide-profile doors and electronic integration.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le9w-list.jpg?itok=PcfdPeGf",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le9w-list.jpg?itok=PcfdPeGf"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "Advanced European mortise lock optimized for wide-profile doors and electronic integration.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-le7w",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 LE7W - EUROPEAN MORTISE LOCK",
        "description": "Refined European mortise lock solution for modern architectural door hardware.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le7w-list.jpg?itok=18lw9pCn",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le7w-list.jpg?itok=18lw9pCn"
        ],
        "brandSubCategory": "Mortise Locks",
        "brandSubCategoryLink": "/products/access-control/salto#mortise-locks",
        "longDescription": "Refined European mortise lock solution for modern architectural door hardware.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "xs4-cartridge-cylindrical-latch",
        "category": "Access Control",
        "brand": "Salto",
        "title": "XS4 CARTRIDGE CYLINDRICAL LATCH",
        "description": "Innovative cylindrical latch cartridge designed for seamless electronic lock upgrades on standard latch hardware.",
        "mainImage": "https://www.sourcesecurity.com/img/products/400/salto-xs4-cartdridge-cylindrical-latch-electronic-locking-device.png",
        "thumbnails": [
            "https://www.sourcesecurity.com/img/products/400/salto-xs4-cartdridge-cylindrical-latch-electronic-locking-device.png"
        ],
        "brandSubCategory": "Cylindrical Latch Locks",
        "brandSubCategoryLink": "/products/access-control/salto#cylindrical-latch-locks",
        "longDescription": "Innovative cylindrical latch cartridge designed for seamless electronic lock upgrades on standard latch hardware.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "universal-esd",
        "category": "Access Control",
        "brand": "Salto",
        "title": "UNIVERSAL ESD",
        "description": "Universal energy saving device compatible with any type of card technology.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/uesd-white.jpg?itok=iQlOoN47",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/uesd-white.jpg?itok=iQlOoN47"
        ],
        "brandSubCategory": "Energy-Saving Devices",
        "brandSubCategoryLink": "/products/access-control/salto#energy-saving-devices",
        "longDescription": "Universal energy saving device compatible with any type of card technology.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "smart-esd",
        "category": "Access Control",
        "brand": "Salto",
        "title": "SMART ESD",
        "description": "Advanced smart energy saving device with intelligent card recognition and room management features.",
        "mainImage": "https://www.cts-direct.com/wp-content/uploads/2024/06/separata-ESD.jpg",
        "thumbnails": [
            "https://www.cts-direct.com/wp-content/uploads/2024/06/separata-ESD.jpg"
        ],
        "brandSubCategory": "Energy-Saving Devices",
        "brandSubCategoryLink": "/products/access-control/salto#energy-saving-devices",
        "longDescription": "Advanced smart energy saving device with intelligent card recognition and room management features.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "iq3",
        "category": "Access Control",
        "brand": "Salto",
        "title": "IQ3",
        "description": "Advanced smart hub for real-time access control management and wireless connectivity.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/IQ3_white.jpg?itok=WE1ACDRf",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/IQ3_white.jpg?itok=WE1ACDRf"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Advanced smart hub for real-time access control management and wireless connectivity.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "iq3-mini",
        "category": "Access Control",
        "brand": "Salto",
        "title": "IQ3 MINI",
        "description": "Compact and powerful smart gateway designed for seamless integration in smaller spaces.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/news/iq-mini-news-detail-image.jpg?itok=-8043Mc2",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/news/iq-mini-news-detail-image.jpg?itok=-8043Mc2"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Compact and powerful smart gateway designed for seamless integration in smaller spaces.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "gateway",
        "category": "Access Control",
        "brand": "Salto",
        "title": "GATEWAY",
        "description": "Robust communication bridge between SALTO electronic locks and the central management system.",
        "mainImage": "https://www.vedi-express.com/3244814-thickbox_default/gateway-salto-bluenet-wireless-blanc-pce.webp",
        "thumbnails": [
            "https://www.vedi-express.com/3244814-thickbox_default/gateway-salto-bluenet-wireless-blanc-pce.webp"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Robust communication bridge between SALTO electronic locks and the central management system.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "inroomnode",
        "category": "Access Control",
        "brand": "Salto",
        "title": "INROOMNODE",
        "description": "Wall-mounted node providing wireless range expansion for in-room hospitality applications.",
        "mainImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKh9wW0ktZIsneI5m6P_FBtjmy6ZEr_s3VA&s",
        "thumbnails": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKh9wW0ktZIsneI5m6P_FBtjmy6ZEr_s3VA&s"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Wall-mounted node providing wireless range expansion for in-room hospitality applications.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "node",
        "category": "Access Control",
        "brand": "Salto",
        "title": "NODE",
        "description": "High-performance wireless node extending the BLUEnet network to remote door points.",
        "mainImage": "https://www.beveridges.co.nz/wp-content/uploads/2022/11/SALTO-Wireless-Node-BLUEnet-RFNODE3W.jpg",
        "thumbnails": [
            "https://www.beveridges.co.nz/wp-content/uploads/2022/11/SALTO-Wireless-Node-BLUEnet-RFNODE3W.jpg"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "High-performance wireless node extending the BLUEnet network to remote door points.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "repeater",
        "category": "Access Control",
        "brand": "Salto",
        "title": "REPEATER",
        "description": "Reliable wireless signal booster to ensure stable communication across large installations.",
        "mainImage": "https://lsc.com.au/Images/ProductImages/RFREPEATER2W.jpg",
        "thumbnails": [
            "https://lsc.com.au/Images/ProductImages/RFREPEATER2W.jpg"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Reliable wireless signal booster to ensure stable communication across large installations.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "iq",
        "category": "Access Control",
        "brand": "Salto",
        "title": "IQ",
        "description": "The original cloud-native hub for SALTO KS (Keys as a Service) online access management.",
        "mainImage": "https://lsc.com.au/Images/ProductImages/IQ22W4AUKS.jpg",
        "thumbnails": [
            "https://lsc.com.au/Images/ProductImages/IQ22W4AUKS.jpg"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "The original cloud-native hub for SALTO KS (Keys as a Service) online access management.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "ncoder",
        "category": "Access Control",
        "brand": "Salto",
        "title": "NCODER",
        "description": "Fast and secure desktop encoder for easy management of SALTO credentials and smart cards.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ncoder-finish.jpg?itok=GL_yaGH5",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ncoder-finish.jpg?itok=GL_yaGH5"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Fast and secure desktop encoder for easy management of SALTO credentials and smart cards.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "ppd",
        "category": "Access Control",
        "brand": "Salto",
        "title": "PPD - PORTABLE PROGRAMMER DEVICE",
        "description": "Handheld configuration tool for offline door programming and audit trail retrieval.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ppd.jpg?itok=NPSvtUlL",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ppd.jpg?itok=NPSvtUlL"
        ],
        "brandSubCategory": "Peripherals",
        "brandSubCategoryLink": "/products/access-control/salto#peripherals",
        "longDescription": "Handheld configuration tool for offline door programming and audit trail retrieval.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "metal-fobs",
        "category": "Access Control",
        "brand": "Salto",
        "title": "METAL FOBS",
        "description": "Durable and stylish metal key fobs designed for high-end residential and commercial use.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/metal-fob-blue-finish.jpg?itok=T8t3Iezt",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/metal-fob-blue-finish.jpg?itok=T8t3Iezt"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/salto#credentials",
        "longDescription": "Durable and stylish metal key fobs designed for high-end residential and commercial use.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "key-fobs",
        "category": "Access Control",
        "brand": "Salto",
        "title": "KEY FOBS",
        "description": "Lightweight and versatile RFID key fobs available in various colors for easy access management.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/tag_blue_finish.jpg?itok=nTEpw7m8",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/tag_blue_finish.jpg?itok=nTEpw7m8"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/salto#credentials",
        "longDescription": "Lightweight and versatile RFID key fobs available in various colors for easy access management.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "key-cards",
        "category": "Access Control",
        "brand": "Salto",
        "title": "KEY CARDS",
        "description": "Standard smart cards for secure and easy identity verification across all SALTO readers.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/keycard-lists.jpg?itok=VFGh_jFz",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/keycard-lists.jpg?itok=VFGh_jFz"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/salto#credentials",
        "longDescription": "Standard smart cards for secure and easy identity verification across all SALTO readers.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "bamboo-hotel-guest-key-cards",
        "category": "Access Control",
        "brand": "Salto",
        "title": "BAMBOO HOTEL GUEST KEY CARDS",
        "description": "Eco-friendly bamboo key cards specifically designed for the sustainable hospitality industry.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bamboo_guest-key-card-finish.jpg?itok=Onv7G_FC",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bamboo_guest-key-card-finish.jpg?itok=Onv7G_FC"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/salto#credentials",
        "longDescription": "Eco-friendly bamboo key cards specifically designed for the sustainable hospitality industry.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "wearable-smart-wristbands",
        "category": "Access Control",
        "brand": "Salto",
        "title": "WEARABLE SMART WRISTBANDS",
        "description": "Waterproof and comfortable RFID wristbands ideal for gyms, pools, and spa facilities.",
        "mainImage": "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bracelet_blue_finish.jpg?itok=6Yg98dHa",
        "thumbnails": [
            "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bracelet_blue_finish.jpg?itok=6Yg98dHa"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/salto#credentials",
        "longDescription": "Waterproof and comfortable RFID wristbands ideal for gyms, pools, and spa facilities.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "paper-hotel-guest-key-card",
        "category": "Access Control",
        "brand": "Salto",
        "title": "PAPER HOTEL GUEST KEY CARD",
        "description": "Cost-effective and recyclable paper cards for short-term hospitality guest access.",
        "mainImage": "https://lsc.com.au/Images/ProductImages/PCMULCPG.jpg",
        "thumbnails": [
            "https://lsc.com.au/Images/ProductImages/PCMULCPG.jpg"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/salto#credentials",
        "longDescription": "Cost-effective and recyclable paper cards for short-term hospitality guest access.\n\nDesigned for seamless integration into modern access control systems.",
        "options": [
            {
                "partCode": "DEFAULT-1",
                "specification": "Standard Profile",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-accessories",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Accessories",
        "description": "Essential add-ons like power supplies, cables, and mounting parts to support system setup.",
        "mainImage": "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-nx4s1-access-control-controller.png",
        "thumbnails": [
            "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-nx4s1-access-control-controller.png"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Essential add-ons like power supplies, cables, and mounting parts to support system setup.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-credentials",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Credentials",
        "description": "Cards, fobs, or mobile IDs used by users to gain access.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1901440-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1901440-primaryimage"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Cards, fobs, or mobile IDs used by users to gain access.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-readers-keypads",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Readers & Keypads",
        "description": "Devices that scan credentials or accept PIN codes at entry points.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1917930-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1917930-primaryimage"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Devices that scan credentials or accept PIN codes at entry points.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-software",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Software",
        "description": "Tools to manage access, monitor activity, and control the system.",
        "mainImage": "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-wppee.jpg",
        "thumbnails": [
            "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-wppee.jpg"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Tools to manage access, monitor activity, and control the system.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-servers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Servers",
        "description": "Central systems that store data and run access control operations.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBA-Honeywell-Maxpro-VMS-Sever-RevB-Img1",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBA-Honeywell-Maxpro-VMS-Sever-RevB-Img1"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Central systems that store data and run access control operations.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-control-panel-kits",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Control Panel Kits",
        "description": "Ready-to-install packages with key components for quick deployment.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000KD4-KIT",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000KD4-KIT"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Ready-to-install packages with key components for quick deployment.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-lobby-kiosks-touch-screens",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Lobby Kiosks & Touch Screens",
        "description": "Self-service stations for visitor check-in and access management.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PWVM21-FrontFacingRightFull",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PWVM21-FrontFacingRightFull"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Self-service stations for visitor check-in and access management.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-system-agreements-upgrades",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "System Agreements & Upgrades",
        "description": "Plans and updates to keep the system secure and up to date.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hon-ba-fire-gfp-rld-right",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hon-ba-fire-gfp-rld-right"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Plans and updates to keep the system secure and up to date.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-door-hardware",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Door Hardware",
        "description": "Locks and physical devices that secure doors and entry points.",
        "mainImage": "https://preview1.assetsadobe.com/is/image/Honeywell65/hon-ba-security-allegion-schlage-grp-1",
        "thumbnails": [
            "https://preview1.assetsadobe.com/is/image/Honeywell65/hon-ba-security-allegion-schlage-grp-1"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Locks and physical devices that secure doors and entry points.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-main-products-control-panels",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Control Panels",
        "description": "Main units that process access decisions and connect all components.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/pmt-hps-cph-control-panel-primary-image",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/pmt-hps-cph-control-panel-primary-image"
        ],
        "brandSubCategory": "Main Products",
        "brandSubCategoryLink": "/products/access-control/honeywell/main-products",
        "longDescription": "Main units that process access decisions and connect all components.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-programmers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Programmers",
        "description": "Advanced flash programmers for Honeywell security modules and systems.",
        "mainImage": "https://cdn.webshopapp.com/shops/335010/files/472758643/700x700x2/honeywell-galaxy-flash-programmer-a221.jpg",
        "thumbnails": [
            "https://cdn.webshopapp.com/shops/335010/files/472758643/700x700x2/honeywell-galaxy-flash-programmer-a221.jpg"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Advanced flash programmers for Honeywell security modules and systems.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-interface-cards-modules",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Interface Cards & Modules",
        "description": "High-performance interface cards for seamless system integration.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Fire-P1914944-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Fire-P1914944-primaryimage"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "High-performance interface cards for seamless system integration.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-converters",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Converters",
        "description": "Signal and data conversion units for multi-protocol environments.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1917470-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1917470-primaryimage"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Signal and data conversion units for multi-protocol environments.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-housings",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Housings",
        "description": "Durable protective housings for indoor and outdoor installations.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1920766-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1920766-primaryimage"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Durable protective housings for indoor and outdoor installations.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-transmitters-receivers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Transmitters & Receivers",
        "description": "Reliable wireless transmission units for expansive security networks.",
        "mainImage": "https://i5.walmartimages.com/asr/a830500f-9be4-4a42-bad3-cd598852908b.34cfd057df724dbcdc0636173b9d9fe2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        "thumbnails": [
            "https://i5.walmartimages.com/asr/a830500f-9be4-4a42-bad3-cd598852908b.34cfd057df724dbcdc0636173b9d9fe2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Reliable wireless transmission units for expansive security networks.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-power-supplies",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Power Supplies",
        "description": "Industrial-grade 5Amp open-frame power units for consistent performance.",
        "mainImage": "https://ctcsolutions.co.ke/wp-content/uploads/2024/12/power_supply_5amps_open__1-1.jpg",
        "thumbnails": [
            "https://ctcsolutions.co.ke/wp-content/uploads/2024/12/power_supply_5amps_open__1-1.jpg"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Industrial-grade 5Amp open-frame power units for consistent performance.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-enclosure",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Enclosure",
        "description": "Secure metallic enclosures designed for centralized hardware protection.",
        "mainImage": "https://ctcsolutions.co.ke/wp-content/uploads/2024/12/power_supply_5amps_open__1-1.jpg",
        "thumbnails": [
            "https://ctcsolutions.co.ke/wp-content/uploads/2024/12/power_supply_5amps_open__1-1.jpg"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Secure metallic enclosures designed for centralized hardware protection.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-accessories-cables",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Cables",
        "description": "Industrial RS232 and specialized communication cabling for secure data flow.",
        "mainImage": "https://cdn11.bigcommerce.com/s-ka7ofex/images/stencil/1280x1280/products/3415/15912/CBL-020-300-C00-02_Industrial-Grade_RS232_Cable__41651.1637159016.jpg?c=2",
        "thumbnails": [
            "https://cdn11.bigcommerce.com/s-ka7ofex/images/stencil/1280x1280/products/3415/15912/CBL-020-300-C00-02_Industrial-Grade_RS232_Cable__41651.1637159016.jpg?c=2"
        ],
        "brandSubCategory": "Accessories",
        "brandSubCategoryLink": "/products/access-control/honeywell/accessories",
        "longDescription": "Industrial RS232 and specialized communication cabling for secure data flow.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-credentials-programmers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Programmers",
        "description": "Hardware programmers for encoding and managing proximity and smart credentials.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/pmt-hps-programmers-category-image",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/pmt-hps-programmers-category-image"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/honeywell/credentials",
        "longDescription": "Hardware programmers for encoding and managing proximity and smart credentials.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-credentials-interface-cards-modules",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Interface Cards & Modules",
        "description": "Integration modules designed to bridge credential readers with legacy and modern systems.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-bms-dd15-interface-module-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-bms-dd15-interface-module-primaryimage"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/honeywell/credentials",
        "longDescription": "Integration modules designed to bridge credential readers with legacy and modern systems.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-credentials-converters",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Converters",
        "description": "Wiegand-to-data converters and protocol modules for modular system expansion.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1917470-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1917470-primaryimage"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/honeywell/credentials",
        "longDescription": "Wiegand-to-data converters and protocol modules for modular system expansion.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-credentials-housings",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Housings",
        "description": "Secure enclosures and mounting solutions for credential management hardware.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1901061-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1901061-primaryimage"
        ],
        "brandSubCategory": "Credentials",
        "brandSubCategoryLink": "/products/access-control/honeywell/credentials",
        "longDescription": "Secure enclosures and mounting solutions for credential management hardware.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-readers-signature-pads",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Signature Pads",
        "description": "Electronic signature capture pads for secure identity verification and visitor logging.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-BP-Security-LWVMSSIG-PrimaryPhoto",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-BP-Security-LWVMSSIG-PrimaryPhoto"
        ],
        "brandSubCategory": "Readers",
        "brandSubCategoryLink": "/products/access-control/honeywell/readers",
        "longDescription": "Electronic signature capture pads for secure identity verification and visitor logging.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-readers-card-readers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Card Readers",
        "description": "High-security proximity and smart card readers supporting multi-protocol authentication.",
        "mainImage": "https://www.securityinformed.com/img/products/400/omniclass-2-400.jpg",
        "thumbnails": [
            "https://www.securityinformed.com/img/products/400/omniclass-2-400.jpg"
        ],
        "brandSubCategory": "Readers",
        "brandSubCategoryLink": "/products/access-control/honeywell/readers",
        "longDescription": "High-security proximity and smart card readers supporting multi-protocol authentication.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-readers-biometric-readers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Biometric Readers",
        "description": "Advanced fingerprint and facial recognition units for high-security entry points.",
        "mainImage": "https://www.yskelektronik.com/wp-content/uploads/2024/05/0127720.jpeg",
        "thumbnails": [
            "https://www.yskelektronik.com/wp-content/uploads/2024/05/0127720.jpeg"
        ],
        "brandSubCategory": "Readers",
        "brandSubCategoryLink": "/products/access-control/honeywell/readers",
        "longDescription": "Advanced fingerprint and facial recognition units for high-security entry points.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-readers-keypads",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Keypads",
        "description": "Robust backlit keypads for dual-factor authentication and standalone access control.",
        "mainImage": "https://cdn11.bigcommerce.com/s-9gh6w8fwxg/images/stencil/500x659/products/2989/20964/OS40KTOSDP__01226.1760375216.png?c=1",
        "thumbnails": [
            "https://cdn11.bigcommerce.com/s-9gh6w8fwxg/images/stencil/500x659/products/2989/20964/OS40KTOSDP__01226.1760375216.png?c=1"
        ],
        "brandSubCategory": "Readers",
        "brandSubCategoryLink": "/products/access-control/honeywell/readers",
        "longDescription": "Robust backlit keypads for dual-factor authentication and standalone access control.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-security-management-software",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch® Security Management Software",
        "description": "Enterprise-grade platform for global security management, integrating access control, video and intrusion.",
        "mainImage": "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-pro-watch-3-80-access-control-software.jpg",
        "thumbnails": [
            "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-pro-watch-3-80-access-control-software.jpg"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Enterprise-grade platform for global security management, integrating access control, video and intrusion.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-visitor-management-3-0",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch Visitor Management 3.0",
        "description": "Streamlined visitor check-in with specialized mobile app support for efficient arrivals.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PWVM-Monitor-VisitorList1-wMobileApp",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PWVM-Monitor-VisitorList1-wMobileApp"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Streamlined visitor check-in with specialized mobile app support for efficient arrivals.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-lobbyworks-visitor-management-suite",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "LobbyWorks® Visitor Management Suite",
        "description": "Complete visitor management solution (Version 4.1) for professional lobby operations.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1904914-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1904914-primaryimage"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Complete visitor management solution (Version 4.1) for professional lobby operations.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-win-pak-integrated-security-software",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "WIN-PAK Integrated Security Software",
        "description": "Cost-effective software for small-to-midsize businesses needing integrated access and video.",
        "mainImage": "https://honeywelldynamic.hashtechorange.com/uploads/security/product/images/161529184916653.png",
        "thumbnails": [
            "https://honeywelldynamic.hashtechorange.com/uploads/security/product/images/161529184916653.png"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Cost-effective software for small-to-midsize businesses needing integrated access and video.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-5-0",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "PRO-WATCH® 5.0",
        "description": "The latest standard in enterprise security, providing 360-degree situational awareness.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-security-pwhsdk256-pro-watch50-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-security-pwhsdk256-pro-watch50-primaryimage"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "The latest standard in enterprise security, providing 360-degree situational awareness.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pwhsdk",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "PWHSDK",
        "description": "Software development kit for deep integration with Pro-Watch core ecosystems.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-sec-prowatch-software-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-sec-prowatch-software-primaryimage"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Software development kit for deep integration with Pro-Watch core ecosystems.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-system-software-option",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch System Software Option",
        "description": "Graphical map interfaces and advanced control options for site monitoring.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW65-IC-MAPS",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW65-IC-MAPS"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Graphical map interfaces and advanced control options for site monitoring.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-premier-edition-kit",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Premier Edition Kit",
        "description": "All-in-one software bundle for mission-critical facility protection.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_17854c29bbcd46a98b4f5e990f6b549b~mv2.png/v1/fill/w_365,h_269,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_17854c29bbcd46a98b4f5e990f6b549b~mv2.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_17854c29bbcd46a98b4f5e990f6b549b~mv2.png/v1/fill/w_365,h_269,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_17854c29bbcd46a98b4f5e990f6b549b~mv2.png"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "All-in-one software bundle for mission-critical facility protection.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-neverfail-licenses",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Neverfail Licenses",
        "description": "High-availability license options ensuring 99.999% system uptime for critical sites.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "High-availability license options ensuring 99.999% system uptime for critical sites.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-exacq-vms-integration",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch Exacq VMS Integration",
        "description": "Dedicated licenses for seamless video management system coupling.",
        "mainImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJmWdULy5OtrewFBBISIIgSKkkSuES-sF1w&s",
        "thumbnails": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJmWdULy5OtrewFBBISIIgSKkkSuES-sF1w&s"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Dedicated licenses for seamless video management system coupling.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-server-add-on-redundant-licenses",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Server Add-On Redundant Licenses",
        "description": "Failover and redundancy licenses for centralized Pro-Watch servers.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW65-IC-MAPS",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW65-IC-MAPS"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Failover and redundancy licenses for centralized Pro-Watch servers.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-add-on-pe-and-ce",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch Add-On (PE and CE)",
        "description": "Expansion licenses for Professional and Corporate Edition environments.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW65-IC-MAPS",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PW65-IC-MAPS"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "Expansion licenses for Professional and Corporate Edition environments.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-software-pro-watch-integrated-security-suite",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch Integrated Security Suite",
        "description": "The ultimate unified security platform for large-scale enterprise deployments.",
        "mainImage": "https://img.securityinfowatch.com/files/base/cygnus/siw/image/2024/02/65d7cd1633b2ea001edfa8d4-hbtsecprw65dsusen1.png?auto=format,compress&fit=fill&fill=blur&w=1200&h=630",
        "thumbnails": [
            "https://img.securityinfowatch.com/files/base/cygnus/siw/image/2024/02/65d7cd1633b2ea001edfa8d4-hbtsecprw65dsusen1.png?auto=format,compress&fit=fill&fill=blur&w=1200&h=630"
        ],
        "brandSubCategory": "Software",
        "brandSubCategoryLink": "/products/access-control/honeywell/software",
        "longDescription": "The ultimate unified security platform for large-scale enterprise deployments.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panel-kits-pro4000-controllers-kit",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "PRO4000 Controllers Kit",
        "description": "Professional-grade integrated controller kit designed for scalable facility security management.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000KD4-KIT",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000KD4-KIT"
        ],
        "brandSubCategory": "Control Panel Kits",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panel-kits",
        "longDescription": "Professional-grade integrated controller kit designed for scalable facility security management.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-kiosks-call-station-pc",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Call Station PC",
        "description": "Touch-screen integrated call station for lobby management and visitor communication.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-fire-583560-pc-touch-screen-call-station-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-fire-583560-pc-touch-screen-call-station-primaryimage"
        ],
        "brandSubCategory": "Kiosks",
        "brandSubCategoryLink": "/products/access-control/honeywell/kiosks",
        "longDescription": "Touch-screen integrated call station for lobby management and visitor communication.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-pro-watch-enterprise-edition",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch Enterprise Edition",
        "description": "Scalable enterprise security management platform for global multi-site operations.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Scalable enterprise security management platform for global multi-site operations.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-pro-watch-software-support-agreement",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch® Software Support Agreement",
        "description": "Comprehensive support and maintenance plan ensuring your system is always peak performance.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Comprehensive support and maintenance plan ensuring your system is always peak performance.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-pro-watch-video-manager",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch Video Manager",
        "description": "Advanced video management integration for unified security situational awareness.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-sec-prowatch-software-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-sec-prowatch-software-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Advanced video management integration for unified security situational awareness.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-win-pak-integrated-security-software",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "WIN-PAK Integrated Security Software",
        "description": "Upgrade or extension for WIN-PAK environments requiring additional license capacity.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1904961-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1904961-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Upgrade or extension for WIN-PAK environments requiring additional license capacity.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-upgrade-kit",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Upgrade Kit",
        "description": "All-in-one upgrade package for legacy Honeywell systems transitioning to modern architecture.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "All-in-one upgrade package for legacy Honeywell systems transitioning to modern architecture.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-idemia-visionpass-license-upgrade",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "IDEMIA VisionPass License upgrade",
        "description": "Biometric identification expansion licenses for high-security checkpoints.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Biometric identification expansion licenses for high-security checkpoints.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-pro-watch-system-software-option",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch System Software Option",
        "description": "Additional software modules and feature options for Pro-Watch environments.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-sec-prowatch-software-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-sec-prowatch-software-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Additional software modules and feature options for Pro-Watch environments.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-premier-edition-kit",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Premier Edition Kit",
        "description": "Premium licensing kit for elite facility management and control.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-2-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Premium licensing kit for elite facility management and control.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-ssapwlt",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "SSAPWLT",
        "description": "Specialized Software Support Agreement for long-term technical reliability.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Specialized Software Support Agreement for long-term technical reliability.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-software-technical-support-contract",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Software Technical Support Contract",
        "description": "Direct access to Honeywell certified engineers for critical system resolution.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Direct access to Honeywell certified engineers for critical system resolution.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-upgrades-ssapwhsdk",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "SSAPWHSDK",
        "description": "Developer-level support agreement for custom SDK integrations.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-icon-licenses-and-agreements-primaryimage"
        ],
        "brandSubCategory": "Upgrades",
        "brandSubCategoryLink": "/products/access-control/honeywell/upgrades",
        "longDescription": "Developer-level support agreement for custom SDK integrations.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-door-hardware-locking-devices",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Locking Devices",
        "description": "High-security electronic locks and wireless locksets for versatile entry control.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-security-assa-abloy-aperio-wireless-lockset-is-a-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-security-assa-abloy-aperio-wireless-lockset-is-a-primaryimage"
        ],
        "brandSubCategory": "Door Hardware",
        "brandSubCategoryLink": "/products/access-control/honeywell/door-hardware",
        "longDescription": "High-security electronic locks and wireless locksets for versatile entry control.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-door-hardware-release-switches",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Release Switches",
        "description": "Request-to-exit (REX) switches and emergency release devices for safe facility egress.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/no-image?wid=200&hei=200&dpr=off",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/no-image?wid=200&hei=200&dpr=off"
        ],
        "brandSubCategory": "Door Hardware",
        "brandSubCategoryLink": "/products/access-control/honeywell/door-hardware",
        "longDescription": "Request-to-exit (REX) switches and emergency release devices for safe facility egress.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-pro4000-controllers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "PRO4000 Controllers",
        "description": "Advanced logic controllers designed for modular facility expansion.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000PD4",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000PD4"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Advanced logic controllers designed for modular facility expansion.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-pro-watch-7101-intelligent-ip-based-controller",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch 7101 Intelligent IP based Controller",
        "description": "High-performance IP-native controller with enterprise-grade data handling.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-Security-PRO22ENC1-PW7KBoards1",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-Security-PRO22ENC1-PW7KBoards1"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "High-performance IP-native controller with enterprise-grade data handling.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-pro-watch-7000-intelligent-controller",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch 7000 Intelligent Controller",
        "description": "Centralized intelligence unit for global Pro-Watch security management.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-Security-PRO22ENC1-PW7KBoards1",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-Security-PRO22ENC1-PW7KBoards1"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Centralized intelligence unit for global Pro-Watch security management.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-pro4200-controllers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "PRO4200 Controllers",
        "description": "Secondary controller array for localized entry and relay management.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-Security-PRO22ENC1-PW7KBoards1",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-Security-PRO22ENC1-PW7KBoards1"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Secondary controller array for localized entry and relay management.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-access-controller",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Access controller",
        "description": "Stand-alone access unit for smaller deployments or remote site integration.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hbt-sec-PRO3000",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hbt-sec-PRO3000"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Stand-alone access unit for smaller deployments or remote site integration.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-mercury-mp-series-controllers",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Mercury MP Series Controllers",
        "description": "Premium Mercury-based controller cluster for ultra-secure enterprise sites.",
        "mainImage": "https://www.keri-kb.com/help/Content/Mercury/Images/MP_Controllers/Mercury_MP_Controllers.png",
        "thumbnails": [
            "https://www.keri-kb.com/help/Content/Mercury/Images/MP_Controllers/Mercury_MP_Controllers.png"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Premium Mercury-based controller cluster for ultra-secure enterprise sites.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-maxpro-intrusion-enclosure-and-psu",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "MAXPRO Intrusion Enclosure and PSU",
        "description": "Hardened enclosures with integrated 12VDC power for centralized hardware.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/hbt-fire-fire-mpibxm35-maxpro-intrusion-enclosure-and-psu-primaryimage",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/hbt-fire-fire-mpibxm35-maxpro-intrusion-enclosure-and-psu-primaryimage"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Hardened enclosures with integrated 12VDC power for centralized hardware.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-pro-watch-7000-module",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Pro-Watch 7000 Module",
        "description": "Expansion modules for the PW7000 series, adding relay and reader capacity.",
        "mainImage": "https://s7d1.scene7.com/is/image/Honeywell65/HBT-Security-PW7K1R2",
        "thumbnails": [
            "https://s7d1.scene7.com/is/image/Honeywell65/HBT-Security-PW7K1R2"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Expansion modules for the PW7000 series, adding relay and reader capacity.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-mercury-lp-series-intelligent-controller",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "Mercury™ LP Series Intelligent Controller",
        "description": "Low-power, high-security intelligent controllers with extensive encryption support.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/hon-ba-security-mercury-pwlp4502",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/hon-ba-security-mercury-pwlp4502"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Low-power, high-security intelligent controllers with extensive encryption support.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "honeywell-control-panels-mpa2-and-mpa4-access-solution",
        "category": "Access Control",
        "brand": "Honeywell",
        "title": "MPA2 and MPA4 Access Solution",
        "description": "Door access control solutions (2 and 4 door) for versatile site protection.",
        "mainImage": "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-MPA2-MPA4-Enclosure-ControlPanel-Monitor",
        "thumbnails": [
            "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-MPA2-MPA4-Enclosure-ControlPanel-Monitor"
        ],
        "brandSubCategory": "Control Panels",
        "brandSubCategoryLink": "/products/access-control/honeywell/control-panels",
        "longDescription": "Door access control solutions (2 and 4 door) for versatile site protection.\n\nBuilt to meet the highest security standards for commercial and industrial applications.",
        "options": [
            {
                "partCode": "HW-DEF-01",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Technical Specifications",
                "url": "#"
            }
        ]
    },
    {
        "productId": "micro-dome-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Micro-Dome Cameras",
        "description": "Compact and discreet dome cameras designed for subtle high-definition indoor surveillance.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_b26d12913a0b4f8b922dc4088603cb5f~mv2.png/v1/fill/w_502,h_488,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_b26d12913a0b4f8b922dc4088603cb5f~mv2.png/v1/fill/w_502,h_488,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Compact and discreet dome cameras designed for subtle high-definition indoor surveillance.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "thermal-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Thermal Cameras",
        "description": "Advanced thermal imaging technology for superior detection in complete darkness or challenging weather.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_850558503705441bb667090e899adddb~mv2.png/v1/fill/w_414,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_850558503705441bb667090e899adddb~mv2.png/v1/fill/w_414,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Advanced thermal imaging technology for superior detection in complete darkness or challenging weather.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "dome-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Dome Cameras",
        "description": "Versatile, vandal-resistant dome cameras suitable for both indoor and outdoor security applications.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_4c3ae0174b6b4a94b8919040aabc9215~mv2.png/v1/fill/w_414,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_4c3ae0174b6b4a94b8919040aabc9215~mv2.png/v1/fill/w_414,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Versatile, vandal-resistant dome cameras suitable for both indoor and outdoor security applications.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "corner-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Corner Cameras",
        "description": "Specialized cameras designed for corner mounting to provide wide-angle coverage of entire rooms.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_7070598aa3f3442baca4f4518b8e57f3~mv2.png/v1/fill/w_436,h_440,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_7070598aa3f3442baca4f4518b8e57f3~mv2.png/v1/fill/w_436,h_440,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Specialized cameras designed for corner mounting to provide wide-angle coverage of entire rooms.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "explosion-proof-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Explosion-Proof Cameras",
        "description": "Heavy-duty cameras engineered for hazardous environments where safety and reliability are paramount.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_fd1eb100bdef440f9c3a2b25b68903e0~mv2.png/v1/fill/w_480,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_fd1eb100bdef440f9c3a2b25b68903e0~mv2.png/v1/fill/w_480,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Heavy-duty cameras engineered for hazardous environments where safety and reliability are paramount.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "fisheye-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Fisheye Cameras",
        "description": "360-degree panoramic cameras for complete situational awareness with no blind spots.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_d36cbb20f5964b84a88218b977b650be~mv2.png/v1/fill/w_402,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_d36cbb20f5964b84a88218b977b650be~mv2.png/v1/fill/w_402,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "360-degree panoramic cameras for complete situational awareness with no blind spots.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "ptz-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "PTZ Cameras",
        "description": "Pan-Tilt-Zoom cameras offering dynamic control and powerful optical zoom for large areas.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_20bc17c7cfdd4adf906e10afd45fc489~mv2.png/v1/fill/w_404,h_404,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_20bc17c7cfdd4adf906e10afd45fc489~mv2.png/v1/fill/w_404,h_404,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Pan-Tilt-Zoom cameras offering dynamic control and powerful optical zoom for large areas.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "ball-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Ball Cameras",
        "description": "Flexible ball-and-socket design for easy adjustment and precise targeting of surveillance areas.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_20de4f265f564c23a8f5df44bce8abbd~mv2.png/v1/fill/w_450,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_20de4f265f564c23a8f5df44bce8abbd~mv2.png/v1/fill/w_450,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Flexible ball-and-socket design for easy adjustment and precise targeting of surveillance areas.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "bullet-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Bullet Cameras",
        "description": "Visible deterrent bullet cameras with integrated IR for powerful long-range outdoor monitoring.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_41330c2f9f144a6cbd9b569af86d48ac~mv2.png/v1/fill/w_436,h_428,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_41330c2f9f144a6cbd9b569af86d48ac~mv2.png/v1/fill/w_436,h_428,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Visible deterrent bullet cameras with integrated IR for powerful long-range outdoor monitoring.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "accessories",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Accessories",
        "description": "Comprehensive range of mounts, brackets, and power solutions for surveillance installations.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_b18aeaae90dd4c82b76f9860e37829f6~mv2.png/v1/fill/w_448,h_448,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_b18aeaae90dd4c82b76f9860e37829f6~mv2.png/v1/fill/w_448,h_448,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Comprehensive range of mounts, brackets, and power solutions for surveillance installations.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "multi-sensor-cameras",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "Multi-Sensor Cameras",
        "description": "High-resolution multi-sensor cameras for seamless wide-area coverage with multiple focal points.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_c8187247a23945eb9562a1c7a3704bfd~mv2.png/v1/fill/w_520,h_516,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_c8187247a23945eb9562a1c7a3704bfd~mv2.png/v1/fill/w_520,h_516,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "High-resolution multi-sensor cameras for seamless wide-area coverage with multiple focal points.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "35-series-ip-camera",
        "category": "Surveillance (CCTV)",
        "brand": "Intersys",
        "title": "35 Series IP Camera",
        "description": "Next-generation IP cameras featuring smart analytics and ultra-high-definition video quality.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_8be9bd4cd60d44a3860f55fda58f1fe2~mv2.png/v1/fill/w_516,h_309,al_c,lg_1,q_85,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_8be9bd4cd60d44a3860f55fda58f1fe2~mv2.png/v1/fill/w_516,h_309,al_c,lg_1,q_85,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/surveillance",
        "longDescription": "Next-generation IP cameras featuring smart analytics and ultra-high-definition video quality.",
        "options": [
            {
                "partCode": "SURV-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "field-devices",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Field Devices",
        "description": "High-precision sensors and actuators for real-time monitoring and control of building environments.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_e1eea28ea2f44602b7bce78f2f1b4555~mv2.png/v1/fill/w_710,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_e1eea28ea2f44602b7bce78f2f1b4555~mv2.png/v1/fill/w_710,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "High-precision sensors and actuators for real-time monitoring and control of building environments.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "lighting-control",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Lighting Control",
        "description": "Intelligent lighting solutions that optimize energy consumption and enhance occupant comfort.",
        "mainImage": "https://www.mepmiddleeast.com/cloud/2021/07/07/Douglas_Bluetooth.jpg",
        "thumbnails": [
            "https://www.mepmiddleeast.com/cloud/2021/07/07/Douglas_Bluetooth.jpg"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Intelligent lighting solutions that optimize energy consumption and enhance occupant comfort.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "networking",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Networking",
        "description": "Robust and secure communication infrastructure for seamless integration of building systems.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_1a5d138124664a1d97ac8e3b6afd87d4~mv2.png/v1/fill/w_542,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/HBT-BP-Fire-NFN-GW-EM-3-PrimaryPhoto_edi.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_1a5d138124664a1d97ac8e3b6afd87d4~mv2.png/v1/fill/w_542,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/HBT-BP-Fire-NFN-GW-EM-3-PrimaryPhoto_edi.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Robust and secure communication infrastructure for seamless integration of building systems.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "controllers",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Controllers",
        "description": "Advanced programmable controllers for precise management of HVAC and other mechanical systems.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_4814d293199a43bb8e78b4972baaf8ed~mv2.png/v1/fill/w_632,h_298,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_4814d293199a43bb8e78b4972baaf8ed~mv2.png/v1/fill/w_632,h_298,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Advanced programmable controllers for precise management of HVAC and other mechanical systems.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "software",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Software",
        "description": "Unified software platforms for centralized monitoring, analytics, and optimization of building performance.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_d29b4edbf55e42dea4a9273e02511fa1~mv2.png/v1/fill/w_320,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_d29b4edbf55e42dea4a9273e02511fa1~mv2.png/v1/fill/w_320,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Unified software platforms for centralized monitoring, analytics, and optimization of building performance.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "additional-bms-products",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Additional BMS Products",
        "description": "Comprehensive range of auxiliary components to complete and enhance building management systems.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_32169f804ce549aaaf4129d10a9471b8~mv2.png/v1/fill/w_512,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_32169f804ce549aaaf4129d10a9471b8~mv2.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_32169f804ce549aaaf4129d10a9471b8~mv2.png/v1/fill/w_512,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_32169f804ce549aaaf4129d10a9471b8~mv2.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Comprehensive range of auxiliary components to complete and enhance building management systems.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "lighting",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Lighting",
        "description": "Energy-efficient LED lighting systems designed for durability and superior illumination.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_b6e1f107a2ad40b7ada10c62975ce213~mv2.png/v1/fill/w_372,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_b6e1f107a2ad40b7ada10c62975ce213~mv2.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_b6e1f107a2ad40b7ada10c62975ce213~mv2.png/v1/fill/w_372,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_b6e1f107a2ad40b7ada10c62975ce213~mv2.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Energy-efficient LED lighting systems designed for durability and superior illumination.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    },
    {
        "productId": "air-filtration-disinfection",
        "category": "Building Management",
        "brand": "BMS",
        "title": "Air Filtration & Disinfection",
        "description": "Innovative air purification solutions ensuring healthy and safe indoor air quality.",
        "mainImage": "https://static.wixstatic.com/media/3d5958_37bde61b1b5a41ddbddfd31c15ce2d90~mv2.png/v1/fill/w_462,h_334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        "thumbnails": [
            "https://static.wixstatic.com/media/3d5958_37bde61b1b5a41ddbddfd31c15ce2d90~mv2.png/v1/fill/w_462,h_334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png"
        ],
        "brandSubCategory": "General",
        "brandSubCategoryLink": "/products/building-management",
        "longDescription": "Innovative air purification solutions ensuring healthy and safe indoor air quality.",
        "options": [
            {
                "partCode": "BMS-DEF",
                "specification": "Standard Configuration",
                "price": 0,
                "qty": 0
            }
        ],
        "documents": [
            {
                "name": "Datasheet",
                "url": "#"
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
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
