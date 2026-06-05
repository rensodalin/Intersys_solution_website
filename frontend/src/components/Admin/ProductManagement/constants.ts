export const CATEGORIES = ["Access Control", "Surveillance (CCTV)", "Building Management", "Integrated Systems", "Audio Visual", "Fire Systems", "Leak Detection"];

export const BRANDS: Record<string, string[]> = {
  "Access Control": ["Honeywell", "SALTO"],
  "Surveillance (CCTV)": ["Intersys", "Hikvision", "Dahua", "Axis"],
  "Building Management": ["Schneider Electric", "Siemens", "Johnson Controls", "Other"],
  "Integrated Systems": [],
  "Audio Visual": [],
  "Fire Systems": [],
  "Leak Detection": [],
};

export const SUBCATEGORIES: Record<string, Record<string, string[]>> = {
  "Access Control": {
    Honeywell: [
      "Control Panels", "Control Panel Kits", "Readers", "Credentials",
      "Software", "Accessories", "Lobby Kiosks", "System Agreements & Upgrades", "Door Hardware",
    ],
    SALTO: ["Electronic Locks", "Online Systems", "Offline Systems", "Mobile & Cloud"],
  },
  "Surveillance (CCTV)": {
    Intersys: ["IP Cameras", "Analog Cameras", "NVR/DVR", "Accessories"],
    Hikvision: ["IP Cameras", "NVR/DVR", "Accessories"],
    Dahua: ["IP Cameras", "NVR/DVR", "Accessories"],
    Axis: ["IP Cameras", "Accessories"],
  },
  "Building Management": {
    "Schneider Electric": ["Field Devices", "Controllers", "Software", "Networking"],
    Siemens: ["Field Devices", "Controllers", "Software"],
    "Johnson Controls": ["Field Devices", "Controllers"],
    Other: ["General"],
  },
};

export const ITEMS_PER_PAGE = 8;
