import {
    ShieldCheck,
    Cpu,
    Settings,
    Video,
    Volume2,
    Flame,
    LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavDataSubItem {
    label: string;
    icon?: LucideIcon;
    link?: string;
    sub?: NavDataSubItem[];
}

export interface NavDataItem {
    id: string;
    label: string;
    icon: LucideIcon;
    link: string;
    sub?: NavDataSubItem[];
}

export const NAVIGATION_DATA: NavDataItem[] = [
    {
        id: "access-control",
        label: "Access Control",
        icon: ShieldCheck,
        link: "/products/access-control",
        sub: [
            {
                label: "Honeywell Systems",
                link: "/products/access-control/honeywell",
                sub: [
                    { label: "Control Panels", link: "/products/access-control/honeywell/control-panels" },
                    { label: "Control Panel Kits", link: "/products/access-control/honeywell/control-panel-kits" },
                    { label: "Readers", link: "/products/access-control/honeywell/readers" },
                    { label: "Credentials", link: "/products/access-control/honeywell/credentials" },
                    { label: "Accessories", link: "/products/access-control/honeywell/accessories" },
                    { label: "Door Hardware", link: "/products/access-control/honeywell/door-hardware" },
                    { label: "Software", link: "/products/access-control/honeywell/software" },
                    { label: "Lobby Kiosks", link: "/products/access-control/honeywell/lobby-kiosks" },
                    { label: "System Agreements & Upgrades", link: "/products/access-control/honeywell/upgrades" },
                ]
            },
            {
                label: "SALTO Solutions",
                icon: LayoutGrid,
                link: "/products/access-control/salto",
                sub: [
                    { label: "Electronic Locks", link: "/products/access-control/salto/electronic-locks" },
                    { label: "Electronic Cylinders", link: "/products/access-control/salto/electronic-cylinders" },
                    { label: "Electronic Locker Locks", link: "/products/access-control/salto/electronic-locker-locks" },
                    { label: "Electronic Padlocks", link: "/products/access-control/salto/electronic-padlocks" },
                    { label: "Wall Readers", link: "/products/access-control/salto/wall-readers" },
                    { label: "Face Recognition Terminals", link: "/products/access-control/salto/face-recognition-terminals" },
                    { label: "Access Controllers", link: "/products/access-control/salto/access-controllers" },
                    { label: "Door Intercom Systems", link: "/products/access-control/salto/door-intercom-systems" },
                    { label: "Motorized Locks", link: "/products/access-control/salto/motorized-locks" },
                    { label: "Panic Bars & Emergency Exit Devices", link: "/products/access-control/salto/panic-bars" },
                    { label: "Mortise Locks", link: "/products/access-control/salto/mortise-locks" },
                    { label: "Cylindrical Latch Locks", link: "/products/access-control/salto/cylindrical-latch-locks" },
                    { label: "Energy-Saving Devices", link: "/products/access-control/salto/energy-saving-devices" },
                    { label: "Peripherals", link: "/products/access-control/salto/peripherals" },
                    { label: "Credentials", link: "/products/access-control/salto/credentials" },
                ]
            }
        ]
    },
    { id: "building-management", label: "Building Management", icon: Cpu, link: "/products/building-management" },
    { id: "integrated-systems", label: "Integrated Systems", icon: Settings, link: "/services" },
    { id: "surveillance", label: "Surveillance (CCTV)", icon: Video, link: "/products/surveillance" },
    { id: "audio-visual", label: "Audio Visual", icon: Volume2, link: "/services" },
    { id: "fire-systems", label: "Fire Systems", icon: Flame, link: "/services" },
];
