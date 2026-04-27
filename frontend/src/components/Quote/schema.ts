import * as z from "zod";

export const productRowSchema = z.object({
    qty: z.string().optional(),
    productNo: z.string().optional(),
    description: z.string().optional(),
    application: z.string().optional(),
});

export const quoteSchema = z.object({
    cataloguePrinted: z.boolean(),
    catalogueElectronic: z.boolean(),
    products: z.array(productRowSchema),
    sections: z.array(z.string()).optional(),
    name: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company is required"),
    title: z.string().optional(),
    phone: z.string().min(6, "Phone is required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Address is required"),
    city: z.string().optional(),
    country: z.string().optional(),
    contactMethod: z.enum(["Email", "Phone", "Either"]),
    newsletter: z.string(),
    companyType: z.string().optional(),
    bmsSystem: z.string().optional(),
    otherBms: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const productSections = [
    "Temperature", "Humidity", "Pressure", "Flow", "Power",
    "Pneumatic Transducers", "Air & Gas", "Power Supplies", "Miscellaneous"
];

export const companyTypes = [
    "Manufacturer", "Distributor", "Contractor", "Engineering", "Building Management"
];
