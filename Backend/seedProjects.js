import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./model/project.js";

dotenv.config();

const projects = [
    {
        title: "Phnom Penh International Airport",
        desc: "Large-scale BMS integration for Cambodia's primary aviation gateway, ensuring optimal climate and energy control.",
        image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1470&auto=format&fit=crop",
        category: "Institutional",
        client: "Comin Khmer",
        location: "Phnom Penh, Cambodia",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Power Meter"]
    },
    {
        title: "Novotel Phnom Penh",
        desc: "High-end hospitality BMS solution designed for maximum guest comfort and operational efficiency.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
        category: "Hospitality",
        client: "Ecam Solution",
        location: "Street 51 Corner Street 294, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Wing Tower",
        desc: "Centralized smart building automation for one of Phnom Penh's most iconic corporate landmarks.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
        category: "Commercial",
        client: "DBD Engineering Plc.",
        location: "Preah Monivong Blvd. & Kampuchea Krom Blvd., Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Laurelton Diamond Cambodia",
        desc: "Precision industrial BMS integration for specialized diamond manufacturing and processing facility.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop",
        category: "Industrial",
        client: "IRE Technology",
        location: "PPSE, National Road 4, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Power Meter"]
    },
    {
        title: "Novotel Holiday Palace",
        desc: "Comprehensive building management system for coastal hospitality and luxury resort operations.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop",
        category: "Hospitality",
        client: "Lotus Grean Team",
        location: "2 Thnou St, Preah Sihanouk",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "PPM Pharma Product Manufacture",
        desc: "Controlled environment management system for high-standard pharmaceutical manufacturing.",
        image: "https://images.unsplash.com/photo-1563213126-a4273aed9016?q=80&w=1470&auto=format&fit=crop",
        category: "Industrial",
        client: "Lotus Grean Team",
        location: "Russian Federation Blvd (110), Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Power Meter"]
    },
    {
        title: "Hongkong Land",
        desc: "Premium commercial real estate HVAC and lighting integration for Grade-A office standards.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470&auto=format&fit=crop",
        category: "Commercial",
        client: "CE&P Corporation Ltd",
        location: "Preah Moha Ksatreiyani Kossamak Ave (106), Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System"]
    },
    {
        title: "ABA Headquarters",
        desc: "Reliable BMS infrastructure for national banking headquarters, focusing on HVAC and electrical uptime.",
        image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1470&auto=format&fit=crop",
        category: "Banking",
        client: "Krorvan I/O.",
        location: "Preah Sihanouk Blvd (274), Phnom Penh",
        scope: ["HVAC System", "Electrical System", "Lighting System"]
    },
    {
        title: "E‐Sun Tower",
        desc: "Intelligent office tower management featuring full HVAC, lift, and power metering integration.",
        image: "https://images.unsplash.com/photo-1423739509914-8b8eb9973c0e?q=80&w=1470&auto=format&fit=crop",
        category: "Office",
        client: "Lotus Green Team",
        location: "Preah Monivong Blvd, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Sky Villa",
        desc: "Ultra-luxury residential BMS providing seamless control over common areas and building services.",
        image: "https://images.unsplash.com/photo-1545324418-f1d3c5b53571?q=80&w=1470&auto=format&fit=crop",
        category: "Residential",
        client: "TERRASYS S SOLUTION LTD",
        location: "Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
        scope: ["Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Data Center at Hatha Bank",
        desc: "Critical cooling and environmental control for secure data center operations.",
        image: "https://images.unsplash.com/photo-1558494949-ef010915175e?q=80&w=1470&auto=format&fit=crop",
        category: "Banking",
        client: "Lotus Grean Team",
        location: "No.606, Street 271, Phnom Penh",
        scope: ["Control Chiller For Data Center"]
    },
    {
        title: "Zuellig Pharma",
        desc: "Logistics and pharmaceutical distribution center environmental monitoring and control.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
        category: "Industrial",
        client: "Lotus Grean Team",
        location: "Kandal Stueng, Siem Reap, Kandal Province",
        scope: ["HVAC System", "Electrical System", "Power Meter"]
    },
    {
        title: "Kerry Express (Warehouse)",
        desc: "Industrial warehouse BMS integration focusing on efficient lighting and power management.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
        category: "Logistics",
        client: "Krorvan I/O.",
        location: "National Road #2, Khan Dangkor, Phnom Penh",
        scope: ["HVAC System", "Electrical System", "Power Meter"]
    },
    {
        title: "The Gateway",
        desc: "Smart utility metering and building management for modern mixed-use development.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
        category: "Commercial",
        client: "TERRASYSS SOLUTION LTD",
        location: "Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
        scope: ["Water Meter", "Power Meter"]
    },
    {
        title: "Chip Mong 598 Mall",
        desc: "Retail center power management featuring integrated tenant billing and utility tracking.",
        image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1470&auto=format&fit=crop",
        category: "Commercial",
        client: "DBD Engineering",
        location: "Street 598, Sangkat Chrang Chamres 1, Khan Russey Keo",
        scope: ["Power Meter", "Tenant Billing"]
    },
    {
        title: "CENTRAL Hospital",
        desc: "Precision AHU control for sterile clean room environments and hospital operations.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1470&auto=format&fit=crop",
        category: "Healthcare",
        client: "Krorvan I/O.",
        location: "82A, Street 154, Phnom Penh",
        scope: ["Control AHU System For Clean Room"]
    },
    {
        title: "Royal Phnom Penh Hospital",
        desc: "Critical HVAC and Chiller system automation for international hospital standards.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1470&auto=format&fit=crop",
        category: "Healthcare",
        client: "V2S M.E.P SOLUTIONS CO., LTD",
        location: "888 Russian Federation Blvd (110), Phnom Penh",
        scope: ["Control AHU and Chiller System For Clean Room"]
    },
    {
        title: "Olympia Medical HUB",
        desc: "Integrated medical center AHU control for modern healthcare facilities.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1470&auto=format&fit=crop",
        category: "Healthcare",
        client: "Krorvan I/O.",
        location: "Olympia City, Building C5, Street 161, Phnom Penh",
        scope: ["Control AHU System For Medical Center"]
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Connected to MongoDB...");
        await Project.deleteMany({});
        await Project.insertMany(projects);
        console.log("Seeded projects successfully!");
        process.exit();
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
}

seed();
