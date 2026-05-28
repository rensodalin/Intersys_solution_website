import * as z from "zod";

export const productRowSchema = z.object({
    qty: z.string().min(1, "Qty required"),
    productNo: z.string().min(1, "Product No required"),
    description: z.string().min(1, "Description required"),
    application: z.string().min(1, "Application required"),
});

export const quoteSchema = z.object({
    solutionCategories: z.array(z.string()).optional(),
    products: z.array(productRowSchema),
    sections: z.array(z.string()).optional(),
    name: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company is required"),
    title: z.string().min(2, "Job title is required"),
    phone: z.string().min(6, "Phone is required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Address is required"),
    city: z.string().optional(),
    country: z.string().optional(),
    contactMethod: z.enum(["Email", "Phone", "Either"]),
    newsletter: z.string(),
    companyType: z.string().min(2, "Company type is required"),
    bmsSystem: z.string().optional(),
    otherBms: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const productSections = [
    "Controllers & Control Panels",
    "Software & Platforms",
    "Field Devices & Sensors",
    "Cameras & Surveillance Devices",
    "Fire Detection Devices",
    "Access Control Devices",
    "Audio Visual Equipment",
    "Networking & Communication Devices",
    "Power Supplies & Accessories"
];
export const companyTypes = [
    "Manufacturer", "Distributor", "Contractor", "Engineering", "Building Management"
];
