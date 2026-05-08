export interface BMSProduct {
    id: string;
    title: string;
    image: string;
    description: string;
}

export const bmsProducts: BMSProduct[] = [
    {
        id: "field-devices",
        title: "Field Devices",
        image: "https://static.wixstatic.com/media/3d5958_e1eea28ea2f44602b7bce78f2f1b4555~mv2.png/v1/fill/w_710,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        description: "High-precision sensors and actuators for real-time monitoring and control of building environments."
    },
    {
        id: "lighting-control",
        title: "Lighting Control",
        image: "https://www.mepmiddleeast.com/cloud/2021/07/07/Douglas_Bluetooth.jpg",
        description: "Intelligent lighting solutions that optimize energy consumption and enhance occupant comfort."
    },
    {
        id: "networking",
        title: "Networking",
        image: "https://static.wixstatic.com/media/3d5958_1a5d138124664a1d97ac8e3b6afd87d4~mv2.png/v1/fill/w_542,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/HBT-BP-Fire-NFN-GW-EM-3-PrimaryPhoto_edi.png",
        description: "Robust and secure communication infrastructure for seamless integration of building systems."
    },
    {
        id: "controllers",
        title: "Controllers",
        image: "https://static.wixstatic.com/media/3d5958_4814d293199a43bb8e78b4972baaf8ed~mv2.png/v1/fill/w_632,h_298,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        description: "Advanced programmable controllers for precise management of HVAC and other mechanical systems."
    },
    {
        id: "software",
        title: "Software",
        image: "https://static.wixstatic.com/media/3d5958_d29b4edbf55e42dea4a9273e02511fa1~mv2.png/v1/fill/w_320,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        description: "Unified software platforms for centralized monitoring, analytics, and optimization of building performance."
    },
    {
        id: "additional-bms-products",
        title: "Additional BMS Products",
        image: "https://static.wixstatic.com/media/3d5958_32169f804ce549aaaf4129d10a9471b8~mv2.png/v1/fill/w_512,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_32169f804ce549aaaf4129d10a9471b8~mv2.png",
        description: "Comprehensive range of auxiliary components to complete and enhance building management systems."
    },
    {
        id: "lighting",
        title: "Lighting",
        image: "https://static.wixstatic.com/media/3d5958_b6e1f107a2ad40b7ada10c62975ce213~mv2.png/v1/fill/w_372,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3d5958_b6e1f107a2ad40b7ada10c62975ce213~mv2.png",
        description: "Energy-efficient LED lighting systems designed for durability and superior illumination."
    },
    {
        id: "air-filtration-disinfection",
        title: "Air Filtration & Disinfection",
        image: "https://static.wixstatic.com/media/3d5958_37bde61b1b5a41ddbddfd31c15ce2d90~mv2.png/v1/fill/w_462,h_334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_edited.png",
        description: "Innovative air purification solutions ensuring healthy and safe indoor air quality."
    }
];
