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
                id: "xs4-original-plus-euro",
                title: "XS4 ORIGINAL+ EURO",
                image: "https://entrypass.co.id/wp-content/uploads/2023/12/Group-18-300x300.jpg",
                description: "State-of-the-art electronic lock with European profile compatibility and advanced security features."
            },
            {
                id: "xs4-original-plus-ansi",
                title: "XS4 ORIGINAL + ANSI",
                image: "https://manuals.plus/wp-content/uploads/2022/03/SALTO-XS4-Original-Doors-Lock-image-.jpg",
                description: "Versatile ANSI-standard electronic lock designed for North American and international markets."
            },
            {
                id: "aelement-fusion-ansi",
                title: "ÆLEMENT FUSION - ANSI",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-fusion-ansi-satin-stainless-blacklector_1.png?itok=Ar6yoaUp",
                description: "Minimalist design meeting heavy-duty ANSI standards for seamless architectural integration."
            },
            {
                id: "xs4-original-plus-scandinavian",
                title: "XS4 ORIGINAL + SCANDINAVIAN",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-original-plus-scan-list.png?itok=U_TVB4Jo",
                description: "Specialized electronic lock optimized for Scandinavian profile doors and locking hardware."
            },
            {
                id: "xs4-one-eu",
                title: "XS4 ONE - EU",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/xs4-one-eu-satin-stainless-blacklector_0.png?itok=jNkD-pEK",
                description: "The classic SALTO One redesigned with a slim silhouette for modern European environments."
            },
            {
                id: "xs4-one-deadlatch",
                title: "XS4 ONE - DEADLATCH",
                image: "https://strapi-media-bucket.fly.storage.tigris.dev/salto_xs4_one_deadlatch_satin_stainless_steel_front_bc201e46b9.png",
                description: "High-security deadlatch integration for the proven XS4 One electronic platform."
            },
            {
                id: "xs4-one-din",
                title: "XS4 ONE - DIN",
                image: "https://entrypass.co.id/wp-content/uploads/2023/12/Group-13.jpg",
                description: "DIN-standard compliant electronic lock providing robust security and easy system integration."
            },
            {
                id: "aelement-fusion-eu-din",
                title: "ÆLEMENT FUSION - EU / DIN",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-fusion-eu-satin-stainless-blacklector.png?itok=mlcg0HnP",
                description: "An elegant, minimalist locking solution compatible with European and DIN hardware standards."
            },
            {
                id: "aelement-eu",
                title: "ÆLEMENT - EU",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/aelement-eu-satin-stainless-blacklector.png?itok=YGcoOqY5",
                description: "Premium European-style electronic lock blending advanced technology with refined aesthetics."
            },
            {
                id: "xs4-mini-ansi",
                title: "XS4 MINI - ANSI",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-mini-ansi.png?itok=uBMfDGuD",
                description: "Compact ANSI-standard electronic lock ideal for internal office doors and light-duty applications."
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
                id: "salto-neo-european",
                title: "SALTO NEO - EUROPEAN CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/cylinder-eu-satinchrome-black.png?itok=-ppoadNb",
                description: "The platform's most versatile cylinder, compliant with European profile doors."
            },
            {
                id: "salto-neo-uk-oval",
                title: "SALTO NEO - UK OVAL CYLINDER",
                image: "https://strapi-media-bucket.fly.storage.tigris.dev/salto_neo_cylinder_black_front_af26794bde.png",
                description: "Specialized oval cylinder designed for UK-standard professional installations."
            },
            {
                id: "salto-neo-swiss",
                title: "SALTO NEO - SWISS CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/cylinder-swiss-satinchrome-black_0.png?itok=3Rh3_oDq",
                description: "Swiss-standard compliant electronic cylinder with high-precision engineering."
            },
            {
                id: "salto-neo-scandinavian-oval",
                title: "SALTO NEO - SCANDINAVIAN OVAL CYLINDER",
                image: "https://entrypass.co.id/wp-content/uploads/2023/12/Group-38.jpg",
                description: "Designed for Scandinavian profile doors, balancing security and ease of use."
            },
            {
                id: "salto-neo-scandinavian-security",
                title: "SALTO NEO - SCANDINAVIAN SECURITY CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-scand-security-list_0.jpg?itok=NpEHFh53",
                description: "Ultra-high security variant for specialized Scandinavian perimeter hardware."
            },
            {
                id: "salto-neo-rim-uk",
                title: "SALTO NEO - RIM UK CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-rim-uk-satin-chrome-blacklector_7.jpg?itok=2-szuujY",
                description: "Rim-mounted cylinder solution for UK-style night latches and gates."
            },
            {
                id: "salto-neo-rim-us",
                title: "SALTO NEO - RIM US CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-rim-us-satin-chrome-blacklector_7.jpg?itok=ji6XLvS_",
                description: "US-standard Rim cylinder for panic bars and storefront locking hardware."
            },
            {
                id: "salto-neo-mortise",
                title: "SALTO NEO - MORTISE CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-mortise-satin-chrome-blacklector_1.jpg?itok=Z-diQOsh",
                description: "Industrial-grade mortise cylinder for heavy-duty commercial locking systems."
            },
            {
                id: "salto-neo-cam-lock",
                title: "SALTO NEO - CAM LOCK CYLINDER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/neo-camlock-satin-chrome-blacklector_6.jpg?itok=qUr07kCe",
                description: "Compact cam lock cylinder for secure cabinets, lockers, and furniture."
            },
            {
                id: "salto-neo-deadbolt",
                title: "SALTO NEO - DEADBOLT CYLINDER",
                image: "https://entrypass.co.id/wp-content/uploads/2023/12/Group-42.jpg",
                description: "Secure deadbolt integration providing high-torque resistance and keyless convenience."
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
                id: "gantner-net-lock",
                title: "GANTNER NET.LOCK",
                image: "https://entrypass.co.id/wp-content/uploads/2023/11/Group-1.jpg",
                description: "Smart networked locker lock for advanced facility management and security."
            },
            {
                id: "xs4-locker-lock",
                title: "XS4 LOCKER LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-lock.png?itok=NLTskoUJ",
                description: "Sustainable and easy-to-install electronic locker lock for various applications."
            },
            {
                id: "gantner-eco-side-lock",
                title: "GANTNER ECO.SIDE LOCK",
                image: "https://www.gantner.com/Website/Products/ECO.Side%20Lock/876/image-thumb__876__image-slider-hero-image/Gantner-ECO-Side.Lock-220114148594.f502dc84.jpg",
                description: "Battery-powered electronic lock for lockers with advanced RFID technology."
            },
            {
                id: "gantner-eco-lock",
                title: "GANTNER ECO.LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/eco-lock-finish.jpg?itok=Q7Rztwgd",
                description: "Efficient and reliable electronic locker lock for secure storage solutions."
            },
            {
                id: "gantner-gl7p",
                title: "GANTNER GL7P",
                image: "https://www.gantner.com/Website/Products/GL7p/151/image-thumb__151__image-slider-hero-image/Battery%20Lock%20GL7p%20GANTNER%2002.c642728d.jpg",
                description: "High-performance battery-operated locker lock for premium environments."
            },
            {
                id: "xs4-eco-lock",
                title: "XS4 ECO LOCK",
                image: "https://support.saltosystems.com/installation-guides/locker-locks/images/xs4-eco-lock.7ce45aa38e6ada3ef71796ad1a6470862af360e4a048408ab7e6259d59d8dc90.png",
                description: "Environmentally friendly and cost-effective electronic locker locking solution."
            }
        ]
    },
    {
        id: "electronic-padlocks",
        title: "Electronic Padlocks",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-black.jpg?itok=TO4tO2gD",
        description: "Electronic padlocks that offer a secure solution for gates, storage areas, and more, without the need for keys.",
        subProducts: [
            {
                id: "salto-neoxx-g3",
                title: "SALTO NEOXX G3 PADLOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-g3-list-2.jpg?itok=pjj-u0VO",
                description: "The next generation of high-security electronic padlocks with a versatile design."
            },
            {
                id: "salto-neoxx-g4",
                title: "SALTO NEOXX G4 PADLOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-list_0.png?itok=EA1dtfcB",
                description: "Advanced electronic padlock featuring robust engineering and cloud-native integration."
            }
        ]
    },
    {
        id: "wall-readers",
        title: "Wall Readers",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe7-GvxSQfvlme3tutFDIujhksIUYLIN93Ng&s",
        description: "High-performance wall readers for access control at main entrances, elevators, and other common access points.",
        subProducts: [
            {
                id: "design-xs-european",
                title: "DESIGN XS - EUROPEAN WALL READER",
                image: "https://lsc.com.au/Images/ProductImages/WRDM0E4B.jpg",
                description: "Sleek European-standard wall reader with advanced authentication technology."
            },
            {
                id: "design-xs-european-keypad",
                title: "DESIGN XS - EUROPEAN KEYPAD WALL READER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/news/design-xs-reader-keypad-1490-news.jpg?itok=0DTu8tUD",
                description: "Integrated keypad and reader for multi-factor authentication in a European profile."
            },
            {
                id: "design-xs-mullion",
                title: "DESIGN XS - MULLION WALL READER",
                image: "https://shop.cie-group.com/media/prod_images_nodel/WRD_MB_1-scaled.jpg",
                description: "Compact mullion-mount reader ideal for narrow door frames and aluminum profiles."
            },
            {
                id: "design-xs-ansi",
                title: "DESIGN XS - ANSI WALL READER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/wallreader-ansi-blacklector_0.png?itok=JMLWsD0s",
                description: "ANSI-standard wall reader designed for the North American market and international standards."
            },
            {
                id: "design-xs-ansi-keypad",
                title: "DESIGN XS - ANSI KEYPAD WALL READER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wallreader-ansi-keypad-2.png?itok=dExJDFMX",
                description: "Robust ANSI-profile reader with integrated secure PIN keypad."
            },
            {
                id: "wave-xs-eu",
                title: "WAVE XS - EU TOUCHLESS BUTTON",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wave-xs-eu-list.jpg?itok=d7TjmIJa",
                description: "Hygienic touchless exit button with customizable LED response for European gang boxes."
            },
            {
                id: "wave-xs-dk",
                title: "WAVE XS - DK TOUCHLESS BUTTON",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wave-xs-dk-list.jpg?itok=OlSKKETu",
                description: "Advanced touchless button technology optimized for Danish-standard installations."
            },
            {
                id: "modular-xs-eu",
                title: "MODULAR XS - EU WALL READER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/modular-xs-eu-wr-list.jpg?itok=-nO_worG",
                description: "Flexible, modular reader solution designed for diverse mounting and integration requirements."
            },
            {
                id: "panel-xs",
                title: "PANEL XS READER",
                image: "https://image.archify.com/catalog/product/l/sbz79-53v8u-1656562640.jpg",
                description: "Integrated panel reader designed for seamless mounting within elevator or intercom panels."
            },
            {
                id: "long-distance-xs",
                title: "LONG DISTANCE XS READER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/long-distance-wr-list.jpg?itok=ekFE3zhI",
                description: "Specialized reader for long-range identification, ideal for vehicle gates and parking areas."
            }
        ]
    },
    {
        id: "face-recognition-terminals",
        title: "Face Recognition Terminals",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-face-list-ok.png?itok=GqKA63Jt",
        description: "Advanced biometric facial recognition terminals for secure and contactless access control.",
        subProducts: [
            {
                id: "xs4-face-camera",
                title: "XS4 FACE CAMERA",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/salto-product-orion-c-header-op.png?itok=_SEDnUCC",
                description: "AI-powered facial recognition camera for seamless and ultra-secure contactless access control."
            }
        ]
    },
    {
        id: "access-controllers",
        title: "Access Controllers",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/cu42e0-list.jpg?itok=s6YV1oh7",
        description: "The core of the SALTO system, managing all access control data and communicating with locked components.",
        subProducts: [
            {
                id: "bluenet-door-controller",
                title: "BLUENET DOOR CONTROLLER - STANDARD UNIT",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bluenet-door-controller-finish.jpg?itok=bjRPVu37",
                description: "Wireless network door controller with BlueNet technology for real-time access management."
            },
            {
                id: "salto-auxiliary-cu4200",
                title: "SALTO AUXILIARY - CU4200 CONTROLLER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU4200.jpg?itok=HiMr9eLJ",
                description: "High-performance auxiliary door controller with enterprise-level security features."
            },
            {
                id: "salto-svn-online-cu42eo",
                title: "SALTO SVN ONLINE - CU42EO CONTROLLER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU42E0.jpg?itok=MIpwy6A5",
                description: "Smart online door controller powered by SALTO Virtual Network (SVN) technology."
            },
            {
                id: "salto-ubox4000",
                title: "SALTO UBOX4000",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/UBOX4000.jpg?itok=ytzYuEjO",
                description: "Robust and compact security unit for centralized access management."
            },
            {
                id: "salto-expansion-board-cu4eb8",
                title: "SALTO EXPANSION BOARD - CU4EB8",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/CU4EB8.jpg?itok=DowhAQPU",
                description: "Versatile expansion board adding additional input/output capacity to CU series controllers."
            }
        ]
    },
    {
        id: "door-intercom-systems",
        title: "Door Intercom Systems",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/salto-product-xs4-com-igo-list.png?itok=U3lOsg-T",
        description: "Integrated intercom solutions that allow you to see and speak with visitors before granting access.",
        subProducts: [
            {
                id: "xs4-com-igo",
                title: "XS4 COM IGO",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/product-XS4-com-igo-header.png?itok=Ls92RafT",
                description: "Smart video intercom unit providing secure and visual visitor management directly from your mobile device."
            }
        ]
    },
    {
        id: "motorized-locks",
        title: "Motorized Locks",
        image: "https://www.orbitadigital.com/401110-large_default/d0ze2sibtm.jpg",
        description: "High-security motorized locks for doors that require automatic locking and unlocking.",
        subProducts: [
            {
                id: "salto-danalock-v3-european",
                title: "SALTO DANALOCK V3 - EUROPEAN",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/danalock-eu-ambiente.jpg?itok=isgApHhJ",
                description: "Smart motorized lock solution compatible with European profile doors for effortless entry."
            },
            {
                id: "salto-danalock-v3-deadbolt",
                title: "SALTO DANALOCK V3 - DEADBOLT",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/Danalock_deadbolt_black.png?itok=sx4G46IQ",
                description: "Heavy-duty smart deadbolt motorized lock for superior residential and commercial security."
            },
            {
                id: "salto-danalock-v3-scandinavian",
                title: "SALTO DANALOCK V3 - SCANDINAVIAN",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/Danalock_silver_finish_0.png?itok=jKarA41K",
                description: "Modern motorized smart lock optimized for Scandinavian door hardware standards."
            }
        ]
    },
    {
        id: "panic-bars",
        title: "Panic Bars & Emergency Exit Devices",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-pbe900-list.jpg?itok=TtFO7x-F",
        description: "Compliant emergency exit solutions integrated with SALTO electronic access control.",
        subProducts: [
            {
                id: "xs4-pbe900",
                title: "XS4 PBE900 - PANIC BAR",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/PBE900-satin-stainless.jpg?itok=xbuFoIT5",
                description: "Europe-compliant electronic panic bar solution for high-security emergency exits."
            },
            {
                id: "xs4-pba1200",
                title: "XS4 PBA 1200 - PANIC BAR",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/PBA1200-satin-stainless.jpg?itok=fGpxdU0M",
                description: "Advanced panic bar interface compatible with wide-stile doors and SALTO access control."
            },
            {
                id: "xs4-pbf110",
                title: "XS4 PBF 110 - PANIC BAR",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-push-bar.png?itok=Rkeai8GW",
                description: "Secure push bar solution designed for rapid egress and effortless system integration."
            },
            {
                id: "xs4-kpbs",
                title: "XS4 KPBS - KEYPAD PANIC BAR",
                image: "https://www.sourcesecurity.com/img/products/400/xs4-kpbs-400.jpg",
                description: "High-security keypad-integrated panic bar for controlled emergency exit monitoring."
            }
        ]
    },
    {
        id: "mortise-locks",
        title: "Mortise Locks",
        image: "https://www.loktec-direct.co.uk/cdn/shop/files/LE7S15_1.jpg?v=1762349652&width=642",
        description: "A wide variety of mortise locks to fit any door type and ensure compatibility with SALTO electronic locks.",
        subProducts: [
            {
                id: "xs4-le7s",
                title: "XS4 LE7S - EUROPEAN MORTISE LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le7s-list.jpg?itok=Rz3vMlqv",
                description: "Standard European profile mortise lock for secure and reliable door operations."
            },
            {
                id: "xs4-la1t",
                title: "XS4 LA1T - ANSI MORTISE LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/la1t-automatic-list.jpg?itok=OX2SmrL2",
                description: "Heavy-duty ANSI-standard mortise lock designed for North American hardware requirements."
            },
            {
                id: "xs4-ls5n",
                title: "XS4 LS5N - SCANDINAVIAN MORTISE LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ls5n-list.jpg?itok=zo2YMZSR",
                description: "Specialized Scandinavian profile mortise lock for northern European door standards."
            },
            {
                id: "xs4-le8p",
                title: "XS4 LE8P - EUROPEAN MORTISE LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le8p-list.jpg?itok=h5dbdO-E",
                description: "European-style mortise lock featuring high-torque resistance and precision engineering."
            },
            {
                id: "xs4-la1t-automatic",
                title: "XS4 LA1T - ANSI AUTOMATIC MORTISE",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/la1t-list.jpg?itok=a6-FmiDs",
                description: "Automatic latching ANSI mortise lock for enhanced convenience and perimeter security."
            },
            {
                id: "xs4-le9w",
                title: "XS4 LE9W - EUROPEAN MORTISE LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le9w-list.jpg?itok=PcfdPeGf",
                description: "Advanced European mortise lock optimized for wide-profile doors and electronic integration."
            },
            {
                id: "xs4-le7w",
                title: "XS4 LE7W - EUROPEAN MORTISE LOCK",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/le7w-list.jpg?itok=18lw9pCn",
                description: "Refined European mortise lock solution for modern architectural door hardware."
            }
        ]
    },
    {
        id: "cylindrical-latch-locks",
        title: "Cylindrical Latch Locks",
        image: "https://cdn.adiglobaldistribution.us/pim/500X500/10610/9V-LC1KC70IM.jpg",
        description: "Electronic locks designed for doors with existing cylindrical latch preparations.",
        subProducts: [
            {
                id: "xs4-cartridge-cylindrical-latch",
                title: "XS4 CARTRIDGE CYLINDRICAL LATCH",
                image: "https://www.sourcesecurity.com/img/products/400/salto-xs4-cartdridge-cylindrical-latch-electronic-locking-device.png",
                description: "Innovative cylindrical latch cartridge designed for seamless electronic lock upgrades on standard latch hardware."
            }
        ]
    },
    {
        id: "energy-saving-devices",
        title: "Energy-Saving Devices",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/uesd-white.jpg?itok=iQlOoN47",
        description: "Smart energy-saving devices that help reduce energy consumption in hospitality and commercial buildings.",
        subProducts: [
            {
                id: "universal-esd",
                title: "UNIVERSAL ESD",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/uesd-white.jpg?itok=iQlOoN47",
                description: "Universal energy saving device compatible with any type of card technology."
            },
            {
                id: "smart-esd",
                title: "SMART ESD",
                image: "https://www.cts-direct.com/wp-content/uploads/2024/06/separata-ESD.jpg",
                description: "Advanced smart energy saving device with intelligent card recognition and room management features."
            }
        ]
    },
    {
        id: "peripherals",
        title: "Peripherals",
        image: "https://mtss.com.au/cdn/shop/files/1_e1a81315-df97-4ab3-aa8c-23b2ed01a49c.png?v=1721374901&width=1214",
        description: "Essential accessories and add-ons to complete and enhance your SALTO access control system.",
        subProducts: [
            {
                id: "iq3",
                title: "IQ3",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/IQ3_white.jpg?itok=WE1ACDRf",
                description: "Advanced smart hub for real-time access control management and wireless connectivity."
            },
            {
                id: "iq3-mini",
                title: "IQ3 MINI",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/news/iq-mini-news-detail-image.jpg?itok=-8043Mc2",
                description: "Compact and powerful smart gateway designed for seamless integration in smaller spaces."
            },
            {
                id: "gateway",
                title: "GATEWAY",
                image: "https://www.vedi-express.com/3244814-thickbox_default/gateway-salto-bluenet-wireless-blanc-pce.webp",
                description: "Robust communication bridge between SALTO electronic locks and the central management system."
            },
            {
                id: "inroomnode",
                title: "INROOMNODE",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKh9wW0ktZIsneI5m6P_FBtjmy6ZEr_s3VA&s",
                description: "Wall-mounted node providing wireless range expansion for in-room hospitality applications."
            },
            {
                id: "node",
                title: "NODE",
                image: "https://www.beveridges.co.nz/wp-content/uploads/2022/11/SALTO-Wireless-Node-BLUEnet-RFNODE3W.jpg",
                description: "High-performance wireless node extending the BLUEnet network to remote door points."
            },
            {
                id: "repeater",
                title: "REPEATER",
                image: "https://lsc.com.au/Images/ProductImages/RFREPEATER2W.jpg",
                description: "Reliable wireless signal booster to ensure stable communication across large installations."
            },
            {
                id: "iq",
                title: "IQ",
                image: "https://lsc.com.au/Images/ProductImages/IQ22W4AUKS.jpg",
                description: "The original cloud-native hub for SALTO KS (Keys as a Service) online access management."
            },
            {
                id: "ncoder",
                title: "NCODER",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ncoder-finish.jpg?itok=GL_yaGH5",
                description: "Fast and secure desktop encoder for easy management of SALTO credentials and smart cards."
            },
            {
                id: "ppd",
                title: "PPD - PORTABLE PROGRAMMER DEVICE",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/ppd.jpg?itok=NPSvtUlL",
                description: "Handheld configuration tool for offline door programming and audit trail retrieval."
            }
        ]
    },
    {
        id: "credentials",
        title: "Credentials",
        image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/key-fob-list.jpg?itok=6tuBCUqC",
        description: "A variety of user credentials including key cards, fobs, and mobile keys for secure access.",
        subProducts: [
            {
                id: "metal-fobs",
                title: "METAL FOBS",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/metal-fob-blue-finish.jpg?itok=T8t3Iezt",
                description: "Durable and stylish metal key fobs designed for high-end residential and commercial use."
            },
            {
                id: "key-fobs",
                title: "KEY FOBS",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/finishs/tag_blue_finish.jpg?itok=nTEpw7m8",
                description: "Lightweight and versatile RFID key fobs available in various colors for easy access management."
            },
            {
                id: "key-cards",
                title: "KEY CARDS",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/keycard-lists.jpg?itok=VFGh_jFz",
                description: "Standard smart cards for secure and easy identity verification across all SALTO readers."
            },
            {
                id: "bamboo-hotel-guest-key-cards",
                title: "BAMBOO HOTEL GUEST KEY CARDS",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bamboo_guest-key-card-finish.jpg?itok=Onv7G_FC",
                description: "Eco-friendly bamboo key cards specifically designed for the sustainable hospitality industry."
            },
            {
                id: "wearable-smart-wristbands",
                title: "WEARABLE SMART WRISTBANDS",
                image: "https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/bracelet_blue_finish.jpg?itok=6Yg98dHa",
                description: "Waterproof and comfortable RFID wristbands ideal for gyms, pools, and spa facilities."
            },
            {
                id: "paper-hotel-guest-key-card",
                title: "PAPER HOTEL GUEST KEY CARD",
                image: "https://lsc.com.au/Images/ProductImages/PCMULCPG.jpg",
                description: "Cost-effective and recyclable paper cards for short-term hospitality guest access."
            }
        ]
    }
];
