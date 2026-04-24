export interface SaltoSubProduct {
    id: string;
    title: string;
    image: string;
    description: string;
}

export interface SaltoProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    subProducts?: SaltoSubProduct[];
}

export const saltoProducts: SaltoProduct[] = [
    {
        id: "electronic-locks",
        title: "Electronic Locks",
        image: "https://www.wplusm.de/media/pimg/SALTO/thumbs/379206_1077726.jpg",
        description: "A wide range of smart electronic locks to suit any door and any access control requirement.",
        subProducts: [
            {
                id: "xs4-one",
                title: "XS4 One",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list.jpg?itok=G-x6V6pG",
                description: "Revolutionary stand-alone electronic lock with a slim design and easy installation."
            },
            {
                id: "xs4-original-plus",
                title: "XS4 Original+",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-original-plus-list.jpg?itok=vj3Z_L1Q",
                description: "The next generation of the world's most versatile electronic lock."
            },
            {
                id: "xs4-mini",
                title: "XS4 Mini",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-mini-list.jpg?itok=zQ7K-e1C",
                description: "Small, discreet, and easy to install electronic lock for a wide range of doors."
            }
        ]
    },
    {
        id: "electronic-cylinders",
        title: "Electronic Cylinders",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-eu-list.jpg?itok=QQuuficY",
        description: "The most versatile electronic cylinder on the market, ideal for doors where an electronic lock cannot be fitted.",
        subProducts: [
            {
                id: "salto-neo",
                title: "SALTO Neo Cylinder",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-eu-list.jpg?itok=QQuuficY",
                description: "State-of-the-art electronic cylinder providing a higher level of security and flexibility."
            },
            {
                id: "xs4-cylinder",
                title: "XS4 Geo Cylinder",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-geo-list.jpg?itok=i3J_uS6f",
                description: "Compact and easy to install electronic cylinder for any type of door."
            }
        ]
    },
    {
        id: "electronic-locker-locks",
        title: "Electronic Locker Locks",
        image: "https://static.wixstatic.com/media/13caa3_100fa632de7848339aca174598619ef4~mv2.jpg/v1/fill/w_412,h_613,al_c,lg_1,q_80,enc_avif,quality_auto/net-lock-list.jpg",
        description: "Innovative electronic locker locks designed to provide a high level of security to a wide range of lockers and cabinets.",
        subProducts: [
            {
                id: "xs4-locker",
                title: "XS4 Locker Lock",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-list.jpg?itok=S8m5Z_h6",
                description: "Electronic locker lock designed to provide a high level of security to a wide range of lockers."
            },
            {
                id: "gantner-locker",
                title: "GANTNER Locker Solution",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/gantner-netlock-list.jpg?itok=N3_L9_uB",
                description: "Advanced smart locker systems for leisure, corporate, and education facilities."
            }
        ]
    },
    {
        id: "electronic-padlocks",
        title: "Electronic Padlocks",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-black.jpg?itok=TO4tO2gD",
        description: "Electronic padlocks that offer a secure solution for gates, storage areas, and more, without the need for keys."
    },
    {
        id: "wall-readers",
        title: "Wall Readers",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe7-GvxSQfvlme3tutFDIujhksIUYLIN93Ng&s",
        description: "High-performance wall readers for access control at main entrances, elevators, and other common access points."
    },
    {
        id: "face-recognition-terminals",
        title: "Face Recognition Terminals",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-face-list-ok.png?itok=GqKA63Jt",
        description: "Advanced biometric facial recognition terminals for secure and contactless access control."
    },
    {
        id: "access-controllers",
        title: "Access Controllers",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/cu42e0-list.jpg?itok=s6YV1oh7",
        description: "The core of the SALTO system, managing all access control data and communicating with locked components."
    },
    {
        id: "door-intercom-systems",
        title: "Door Intercom Systems",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/salto-product-xs4-com-igo-list.png?itok=U3lOsg-T",
        description: "Integrated intercom solutions that allow you to see and speak with visitors before granting access."
    },
    {
        id: "motorized-locks",
        title: "Motorized Locks",
        image: "https://www.orbitadigital.com/401110-large_default/d0ze2sibtm.jpg",
        description: "High-security motorized locks for doors that require automatic locking and unlocking."
    },
    {
        id: "panic-bars",
        title: "Panic Bars & Emergency Exit Devices",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-pbe900-list.jpg?itok=TtFO7x-F",
        description: "Compliant emergency exit solutions integrated with SALTO electronic access control."
    },
    {
        id: "mortise-locks",
        title: "Mortise Locks",
        image: "https://www.loktec-direct.co.uk/cdn/shop/files/LE7S15_1.jpg?v=1762349652&width=642",
        description: "A wide variety of mortise locks to fit any door type and ensure compatibility with SALTO electronic locks."
    },
    {
        id: "cylindrical-latch-locks",
        title: "Cylindrical Latch Locks",
        image: "https://cdn.adiglobaldistribution.us/pim/500X500/10610/9V-LC1KC70IM.jpg",
        description: "Electronic locks designed for doors with existing cylindrical latch preparations."
    },
    {
        id: "energy-saving-devices",
        title: "Energy-Saving Devices",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/uesd-white.jpg?itok=iQlOoN47",
        description: "Smart energy-saving devices that help reduce energy consumption in hospitality and commercial buildings."
    },
    {
        id: "peripherals",
        title: "Peripherals",
        image: "https://mtss.com.au/cdn/shop/files/1_e1a81315-df97-4ab3-aa8c-23b2ed01a49c.png?v=1721374901&width=1214",
        description: "Essential accessories and add-ons to complete and enhance your SALTO access control system."
    },
    {
        id: "credentials",
        title: "Credentials",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/key-fob-list.jpg?itok=6tuBCUqC",
        description: "A variety of user credentials including key cards, fobs, and mobile keys for secure access."
    }
];
