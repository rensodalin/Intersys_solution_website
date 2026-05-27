import mongoose from "mongoose";
import dotenv from "dotenv";
import Quote from "./model/quote.js";

dotenv.config();

const MOCK_QUOTES = [
    {
        solutionCategories: ["Fire Alarm System", "Access Control System"],
        products: [
            { qty: "5", productNo: "SEC-1", description: "Aero-Filter Panels (Basement)", application: "Access Protection" },
            { qty: "12", productNo: "HW-DR1", description: "Door Strike Lock", application: "Fire Escape Access" }
        ],
        name: "James Huang",
        company: "Vertex Contractors",
        title: "Lead Architect",
        phone: "+855 23 888 123",
        email: "j.huang@vertex.kh",
        address: "123 Sothearos Blvd",
        city: "Phnom Penh",
        country: "Cambodia",
        contactMethod: "Email",
        companyType: "Contractor",
        bmsSystem: "In-House DB",
        status: "In Progress",
        createdAt: new Date("2026-05-23T10:30:00Z")
    },
    {
        solutionCategories: ["Surveillance (CCTV)", "Audio Visual (AV) System"],
        products: [
            { qty: "1", productNo: "AV-L2", description: "Lume-Control Hub (Studio 1)", application: "AV Integration" },
            { qty: "8", productNo: "CTV-C4K", description: "Security High-Def Dome Node", application: "Perimeter Surveillance" }
        ],
        name: "Elena Rossi",
        company: "Moderna Engineering",
        title: "Design Principal",
        phone: "+39 02 1234567",
        email: "e.rossi@moderna.it",
        address: "Via Dante 14",
        city: "Milan",
        country: "Italy",
        contactMethod: "Either",
        companyType: "Consultant / Designer",
        bmsSystem: "Cloud v2.1",
        status: "Completed",
        createdAt: new Date("2026-05-21T14:15:00Z")
    },
    {
        solutionCategories: ["Building Management", "Smart HVAC"],
        products: [
            { qty: "2", productNo: "BMS-C1", description: "Master HVAC Controller", application: "Central Plant Automation" }
        ],
        name: "Sokha Vorn",
        company: "SOMA Construction",
        title: "MEP Engineer",
        phone: "+855 12 345 678",
        email: "sokha.vorn@soma.kh",
        address: "Preah Norodom Blvd",
        city: "Phnom Penh",
        country: "Cambodia",
        contactMethod: "Phone",
        companyType: "Contractor",
        bmsSystem: "On-Premises",
        status: "Pending",
        createdAt: new Date("2026-05-26T09:00:00Z")
    },
    {
        solutionCategories: ["Access Control System"],
        products: [
            { qty: "20", productNo: "AC-CARD-02", description: "Mifare Smart Credentials", application: "Staff Access" },
            { qty: "5", productNo: "HW-RDR", description: "Wall Mount RFID Reader", application: "Office Entry" }
        ],
        name: "Michael Chen",
        company: "Alpha Tech Solutions",
        title: "IT Operations Director",
        phone: "+65 6789 0123",
        email: "m.chen@alphatech.sg",
        address: "79 Ayer Rajah Crescent",
        city: "Singapore",
        country: "Singapore",
        contactMethod: "Email",
        companyType: "End User / Owner",
        bmsSystem: "Cloud v2.1",
        status: "Completed",
        createdAt: new Date("2026-05-25T16:45:00Z")
    },
    {
        solutionCategories: ["Fire Alarm System", "Building Management"],
        products: [
            { qty: "15", productNo: "SM-DET-01", description: "Photoelectric Smoke Detector", application: "Hotel Bedrooms" },
            { qty: "1", productNo: "FACP-02", description: "Addressable Fire Control Panel", application: "Main Lobby" }
        ],
        name: "Kunthea Meas",
        company: "Rosewood Hotel Group",
        title: "Facilities Manager",
        phone: "+855 15 999 888",
        email: "kunthea.meas@rosewood.kh",
        address: "Vattanac Capital Tower",
        city: "Phnom Penh",
        country: "Cambodia",
        contactMethod: "Either",
        companyType: "End User / Owner",
        bmsSystem: "In-House DB",
        status: "In Progress",
        createdAt: new Date("2026-05-24T11:20:00Z")
    },
    {
        solutionCategories: ["Solar Integration", "Building Management"],
        products: [
            { qty: "40", productNo: "SLR-PANEL-350", description: "350W Monocrystalline Solar Panel", application: "Rooftop Energy Generation" },
            { qty: "2", productNo: "SLR-INV-10K", description: "10kW Grid-Tie Inverter", application: "Power Inversion" }
        ],
        name: "David Smith",
        company: "EcoEnergy Dev",
        title: "Sustainability Consultant",
        phone: "+1 617 555 0199",
        email: "d.smith@ecoenergy.com",
        address: "50 Milk St",
        city: "Boston",
        country: "United States",
        contactMethod: "Email",
        companyType: "Consultant / Designer",
        bmsSystem: "Hybrid Cloud",
        status: "Pending",
        createdAt: new Date("2026-05-27T08:10:00Z")
    },
    {
        solutionCategories: ["Surveillance (CCTV)"],
        products: [
            { qty: "16", productNo: "CCTV-IP-BULLET", description: "4MP Outdoor Bullet IP Camera", application: "Parking Lot Coverage" },
            { qty: "1", productNo: "CCTV-NVR-32CH", description: "32-Channel Network Video Recorder", application: "Security Control Room" }
        ],
        name: "Antoine Dubois",
        company: "Dubois Logistics",
        title: "Security Manager",
        phone: "+33 1 42 68 53 00",
        email: "a.dubois@dubois-logistics.fr",
        address: "Zone Industrielle Nord",
        city: "Lyon",
        country: "France",
        contactMethod: "Either",
        companyType: "End User / Owner",
        bmsSystem: "On-Premises",
        status: "Completed",
        createdAt: new Date("2026-05-22T13:40:00Z")
    },
    {
        solutionCategories: ["Audio Visual (AV) System"],
        products: [
            { qty: "1", productNo: "AV-PROJ-4K", description: "4K Laser Projector 8000 Lumens", application: "Conference Room Display" },
            { qty: "4", productNo: "AV-SPK-WALL", description: "Wall-Mount Active Line Speaker", application: "Auditorium Audio" }
        ],
        name: "Kenji Sato",
        company: "Sato Technologies",
        title: "Project Coordinator",
        phone: "+81 3 5555 1234",
        email: "k.sato@sato-tech.co.jp",
        address: "Minato-ku",
        city: "Tokyo",
        country: "Japan",
        contactMethod: "Email",
        companyType: "Contractor",
        bmsSystem: "In-House DB",
        status: "Pending",
        createdAt: new Date("2026-05-25T10:05:00Z")
    }
];

const seedDB = async () => {
    try {
        const dbUri = process.env.URI || "mongodb://localhost:27017/intersys";
        console.log("Connecting to Database:", dbUri);
        await mongoose.connect(dbUri);
        console.log("MongoDB Connected for seeding Quotes...");

        // Remove old mock quotes (from our mock domain to not destroy existing real data)
        const mockEmails = MOCK_QUOTES.map(q => q.email);
        await Quote.deleteMany({ email: { $in: mockEmails } });
        console.log("Existing matching mock quotes cleared.");

        // Insert new quotes
        await Quote.insertMany(MOCK_QUOTES);
        console.log(`Seeded ${MOCK_QUOTES.length} quote requests successfully!`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding quotes:", error);
        process.exit(1);
    }
};

seedDB();
