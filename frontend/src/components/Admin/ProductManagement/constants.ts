export const CATEGORIES = ["Access Control", "Surveillance (CCTV)", "Building Management", "Integrated Systems", "Audio Visual", "Fire Systems", "Leak Detection"];

export const SUBCATEGORIES: Record<string, string[]> = {
  "Access Control": [
    "Control Panels", "Control Panel Kits", "Readers", "Credentials",
    "Software", "Accessories", "Lobby Kiosks", "System Agreements & Upgrades", "Door Hardware",
  ],
  "Surveillance (CCTV)": ["IP Cameras", "Analog Cameras", "NVR/DVR", "Accessories"],
  "Building Management": ["Field Devices", "Controllers", "Software", "Networking"],
};

export const ITEMS_PER_PAGE = 8;
