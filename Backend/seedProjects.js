import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./model/project.js";

dotenv.config();

const projects = [
    {
        title: "Phnom Penh International Airport",
        desc: "Large-scale BMS integration for Cambodia's primary aviation gateway, ensuring optimal climate and energy control.",
        image: "https://www.vietnamairlines.com/content/dam/legacy-site-assets/SEO-images/2025%20SEO/Traffic%20TV/san-bay-quoc-te-phnom-penh/san-bay-quoc-te-phnom-penh-se-hoat-dong-den-het-ngay-08092025_result.jpg",
        category: "Institutional",
        client: "Comin Khmer",
        location: "Phnom Penh, Cambodia",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Power Meter"]
    },
    {
        title: "Novotel Phnom Penh",
        desc: "The purpose of the project Novotel Phnom penh is to used Building Management System.",
        image: "https://www.maa-design.com/wp-content/uploads/2025/12/NOVOTEL_01_rev1.jpg",
        category: "Commercial",
        client: "Ecam Solution",
        location: "Street 51 Corner Street 294, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Wing Tower",
        desc: "Centralized smart building automation for one of Phnom Penh's most iconic corporate landmarks.",
        image: "https://static1.vietstock.vn/indochinastock/images/2024/03/29/Wing%20Bank%20A.jpg",
        category: "Commercial",
        client: "DBD Engineering Plc.",
        location: "Preah Monivong Blvd. & Kampuchea Krom Blvd., Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Laurelton Diamond Cambodia",
        desc: "Precision industrial BMS integration for specialized diamond manufacturing and processing facility.",
        image: "https://cominasia.com/wp-content/uploads/2022/12/Lourelton.jpg",
        category: "Industrial",
        client: "IRE Technology",
        location: "PPSE, National Road 4, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Power Meter"]
    },
    {
        title: "Novotel Holiday Palace",
        desc: "Comprehensive building management system for coastal hospitality and luxury resort operations.",
        image: "https://www.novotelsihanoukville.com/wp-content/uploads/sites/78/2024/02/Parking.png",
        category: "Hospitality",
        client: "Lotus Grean Team",
        location: "2 Thnou St, Preah Sihanouk",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "PPM Pharma Product Manufacture",
        desc: "Controlled environment management system for high-standard pharmaceutical manufacturing.",
        image: "https://fhdev.info/uploads/677-photo_2024-04-08_11-04-27.jpg",
        category: "Industrial",
        client: "Lotus Grean Team",
        location: "Russian Federation Blvd (110), Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Power Meter"]
    },
    {
        title: "Hongkong Land",
        desc: "Premium commercial real estate HVAC and lighting integration for Grade-A office standards.",
        image: "https://construction-property.com/wp-content/uploads/2019/05/hongkong-land-landmark-building-launches-new-name.jpg",
        category: "Commercial",
        client: "CE&P Corporation Ltd",
        location: "Preah Moha Ksatreiyani Kossamak Ave (106), Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System"]
    },
    {
        title: "ABA Headquarters",
        desc: "Reliable BMS infrastructure for national banking headquarters, focusing on HVAC and electrical uptime.",
        image: "https://cdn.kiripost.com/static/images/fb32x.2e16d0ba.fill-960x540.jpg",
        category: "Banking",
        client: "Krorvan I/O.",
        location: "Preah Sihanouk Blvd (274), Phnom Penh",
        scope: ["HVAC System", "Electrical System", "Lighting System"]
    },
    {
        title: "E‐Sun Tower",
        desc: "Intelligent office tower management featuring full HVAC, lift, and power metering integration.",
        image: "https://lotusgreenteam.com/wp-content/uploads/2022/02/E-Sun-Tower-for-web-2.jpg",
        category: "Office",
        client: "Lotus Green Team",
        location: "Preah Monivong Blvd, Phnom Penh",
        scope: ["HVAC System", "Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Sky Villa",
        desc: "Ultra-luxury residential BMS providing seamless control over common areas and building services.",
        image: "https://www.knightfrank.com.kh/resources/condos/sky-villa-3.jpg",
        category: "Residential",
        client: "TERRASYS S SOLUTION LTD",
        location: "Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
        scope: ["Plumbing System", "Electrical System", "Lighting System", "Ventilation System", "Lift System", "Power Meter"]
    },
    {
        title: "Data Center at Hatha Bank",
        desc: "Critical cooling and environmental control for secure data center operations.",
        image: "https://file.sunonglobal.com/wp-content/uploads/2025/07/1729668297-2.jpeg",
        category: "Banking",
        client: "Lotus Grean Team",
        location: "No.606, Street 271, Phnom Penh",
        scope: ["Control Chiller For Data Center"]
    },
    {
        title: "Zuellig Pharma",
        desc: "Logistics and pharmaceutical distribution center environmental monitoring and control.",
        image: "https://lotusgreenteam.com/wp-content/uploads/2022/03/Artist-impression-of-Zuellig-Pharma-web-large.jpg",
        category: "Industrial",
        client: "Lotus Grean Team",
        location: "Kandal Stueng, Siem Reap, Kandal Province",
        scope: ["HVAC System", "Electrical System", "Power Meter"]
    },
    {
        title: "Kerry Express (Warehouse)",
        desc: "Industrial warehouse BMS integration focusing on efficient lighting and power management.",
        image: "https://www.jobnet.com.kh/image/2UtsomdMLD_BCyJzUqHs5u2jWcoM2DXQ4VL5LukdYABBMihR0NxkFaLWXMQhOSipsGdIJhBv_zsJ0BzaDwqnFtWVSXx4L2ySCEAR2nulNyVQCPMfH7ha-Zz8jz7ZDl09mssxzl4MzCJOHdLu7wCsn__MKulajw9R1QoIJkxI7eo=",
        category: "Logistics",
        client: "Krorvan I/O.",
        location: "National Road #2, Khan Dangkor, Phnom Penh",
        scope: ["HVAC System", "Electrical System", "Power Meter"]
    },
    {
        title: "The Gateway",
        desc: "Smart utility metering and building management for modern mixed-use development.",
        image: "https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/97888_500x650.jpg",
        category: "Commercial",
        client: "TERRASYSS SOLUTION LTD",
        location: "Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
        scope: ["Water Meter", "Power Meter"]
    },
    {
        title: "Chip Mong 598 Mall",
        desc: "Retail center power management featuring integrated tenant billing and utility tracking.",
        image: "https://static.wixstatic.com/media/0a84f2_674cc3cd72384943908586bbd6edceb9~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ImageNotAvailable400x300.jpg",
        category: "Commercial",
        client: "DBD Engineering",
        location: "Street 598, Sangkat Chrang Chamres 1, Khan Russey Keo",
        scope: ["Power Meter", "Tenant Billing"]
    },
    {
        title: "CENTRAL Hospital",
        desc: "Precision AHU control for sterile clean room environments and hospital operations.",
        image: "https://www.cmgassets.com/s3fs-public/styles/article_details_tablet_image/public/2024-08/img_20240816_145333_199.jpg.webp?itok=ypCv_P7w",
        category: "Healthcare",
        client: "Krorvan I/O.",
        location: "82A, Street 154, Phnom Penh",
        scope: ["Control AHU System For Clean Room"]
    },
    {
        title: "Royal Phnom Penh Hospital",
        desc: "Critical HVAC and Chiller system automation for international hospital standards.",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Royal_Phnom_Penh_Hospital.jpg/3840px-Royal_Phnom_Penh_Hospital.jpg",
        category: "Healthcare",
        client: "V2S M.E.P SOLUTIONS CO., LTD",
        location: "888 Russian Federation Blvd (110), Phnom Penh",
        scope: ["Control AHU and Chiller System For Clean Room"]
    },
    {
        title: "Olympia Medical HUB",
        desc: "Integrated medical center AHU control for modern healthcare facilities.",
        image: "https://lh6.googleusercontent.com/proxy/_IsgbK933Yakn_24DRgj-Gg8lsMWHGhUHMC5lJfCYEuZ47VfuVxiwtChCELgwrzkkxfPP3NCIIRXVTk9bETuZs6zHvguL2YiGPUURFw6pT-_yZte",
        category: "Commercial",
        client: "Krorvan I/O.",
        location: "C5 , 5th floor , Olympia City, Building C5, Street 161, Sangkat Veal Vong, Khan 7 Makara, Phnom Penh",
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
