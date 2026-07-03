import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";
import ProductOption from "./model/productOption.js";
import ProductDocument from "./model/productDocument.js";

dotenv.config();

const MOCK_PRODUCTS = [
    {
        "productId": "WEB-8000",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "Honeywell WEB-8000 Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The WEB-8000 is a compact embedded IoT controller and server platform designed for building automation and system integration. It connects multiple devices and subsystems with integrated control, supervision, data logging, alarming, scheduling, and network management. Powered by the Niagara Framework (WEBs-N4), it enables secure web-based monitoring and control through Ethernet or Wi-Fi. The controller supports flexible expansion with RS-485, RS-232, LON, and remote I/O modules, making it suitable for both small and large-scale automation systems.",
        _options: [
            {
                "partCode": "WEB-8000",
                "specification": "Base unit includes two isolated RS485 ports, two 10/100MB Ethernet ports, USB Backup & Restore and Wi-Fi connectivity.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-8000-DEMO",
                "specification": "Base unit includes two isolated RS485 ports, two 10/100MB Ethernet ports, USB Backup & Restore, Wi-Fi connectivity, all available Tridium drivers and a 500 device license. Hardware accessories purchased separately.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8005",
                "specification": "Up to 5 devices / 250 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8010",
                "specification": "Up to 10 devices / 500 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8025",
                "specification": "Up to 25 devices / 1,250 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8100",
                "specification": "Up to 100 devices / 5,000 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8200",
                "specification": "Up to 200 devices / 10,000 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-10",
                "specification": "Up to 10 devices / 500 point upgrade (can be purchased during initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-25",
                "specification": "Up to 25 devices / 1,250 point upgrade (can be purchased during initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-50",
                "specification": "Up to 50 devices / 2,500 point upgrade (can be purchased during initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-UP-10",
                "specification": "Up to 10 devices / 500 point upgrade (can be purchased post initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-UP-25",
                "specification": "Up to 25 devices / 1,250 point upgrade (can be purchased post initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-UP-50",
                "specification": "Up to 50 devices / 2,500 point upgrade (can be purchased post initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-8000-AX",
                "specification": "Enables WEB-8000 controller to run Webs-AX (3.8U). 3.8U build with JACE 8000 controller support.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-2X-485",
                "specification": "WEB-8000 controller add-on dual port RS-485 module.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-LON",
                "specification": "WEB-8000 controller add-on single port LON FTT10A module.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-232",
                "specification": "WEB-8000 controller add-on single port RS-232 module.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WPM-8000",
                "specification": "Universal power supply for WEB-8000 controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "T-IO-16-485",
                "specification": "Remote IO module compatible with WEB-8000 controller. Communication using RS485. Maximum IO supported: IO-16-REM-H modules: 16.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-PWR-H",
                "specification": "24V power supply for IO-16-REM-H.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-PWR-UN-H",
                "specification": "Universal power supply for IO-16-REM-H.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IQ4NC",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4NC Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The IQ4NC enables networks on different media including Ethernet, current loop, and MS/TP, allowing multiple networks to be interconnected in flexible configurations. It provides virtual CNCs for Ethernet-based supervisors and tools to access the system. It supports BACnet over IP and MS/TP, alarm forwarding, and web-based configuration. The controller integrates devices such as IQeco and can extend communication between different network types. Some models include I/O channels and can be expanded using external I/O modules up to 32 channels.",
        _options: [
            {
                "partCode": "IQ4NC/00/230",
                "specification": "Controller with 0 I/O channels, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/12/230",
                "specification": "Controller with 12 I/O channels, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/00/24VAC",
                "specification": "Controller with 0 I/O channels, 24 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/12/24VAC",
                "specification": "Controller with 12 I/O channels, 24 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/230",
                "specification": "Controller with 16 I/O channels, XNC functionality, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/230",
                "specification": "Controller with 16 I/O channels expandable to 32, XNC functionality, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/24VAC",
                "specification": "Controller with 16 I/O channels, XNC functionality, 24 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/24VAC",
                "specification": "Controller with 16 I/O channels expandable to 32, XNC functionality, 24 VAC supply.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IQ4-XNC",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4/.../XNC/... interface",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The IQ4 XNC functionality provides an interface between the Trend system and third-party systems using standard IQ strategy modules and Trend Custom Language (TCL). It allows external system data to be presented as if it were native to an IQ controller and enables parameter adjustment from Trend supervisors and software tools. It supports communication over RS232, RS485, and Ethernet, and integrates BACnet over IP and MS/TP. Some models include I/O channels and can be expanded using external modules up to higher channel counts depending on the model.",
        _options: [
            {
                "partCode": "IQ422/12/XNC/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/12/XNC/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/12/XNC/LAN/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/12/XNC/LAN/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/LAN/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/LAN/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/BAC/230",
                "specification": "IQ4E controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/LAN/BAC/230",
                "specification": "IQ4E controller with 230 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/BAC/24VAC",
                "specification": "IQ4E controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/LAN/BAC/24VAC",
                "specification": "IQ4E controller with 24 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/230",
                "specification": "IQ4NC controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, 10 universal inputs and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/230",
                "specification": "IQ4NC controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 32 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/24VAC",
                "specification": "IQ4NC controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, 10 universal inputs and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/24VAC",
                "specification": "IQ4NC controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 32 I/O channels.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TONN-8",
        "category": "Building Management",
        "brand": "Trend",
        "title": "TONN-8 Open Network Node",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The TONN-8 is a Trend Open Network Node designed to enable integration between Trend systems and third-party systems using the Niagara 4 Framework. It supports bidirectional data exchange, allowing reading and writing of information between HVAC and non-HVAC systems such as lighting and security. It also enables third-party systems to access Trend logged data, alarms, and scheduling functions. The device supports multiple communication protocols including BACnet, LonWorks, M-Bus, Modbus, and KNX, and provides flexible expansion through RS-232, RS-485, LON, and Wi-Fi connectivity options.",
        _options: [
            {
                "partCode": "TONN-8100-24",
                "specification": "TONN-8 with 100 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-8250-24",
                "specification": "TONN-8 with 250 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-8500-24",
                "specification": "TONN-8 with 500 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-81250-24",
                "specification": "TONN-8 with 1250 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-85000-24",
                "specification": "TONN-8 with 5000 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-810000-24",
                "specification": "TONN-8 with 10000 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-8100-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 100 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-8250-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 250 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-8500-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 500 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-81250-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 1250 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-85000-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 5000 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-810000-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 10000 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "PUC-IO-EXTENSION",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "PUC SERIES IO EXTENSION MODULE",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The PUC IO Extension Module is part of the Honeywell PUC Series programmable unitary controller system supporting Ethernet BACnet IP communication. It allows expansion of controller I/O points using RS-485 communication and enables connection of up to two extension modules per controller. The module supports integration with HVAC applications, providing flexible control through fully programmable Niagara-based tools. It includes secure communication, DIN-rail installation, and supports various input and output types including analog and digital signals.",
        _options: [
            {
                "partCode": "PUC5533-EM2",
                "specification": "I/O extension module with UI x5, DI x5, AO x3, DO x3.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PUC6002-EM2",
                "specification": "I/O extension module with UI x6, DO x2.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "HON-9000",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "HON-9000 CONTROLLER",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The HON-9000 is a high-performance IoT controller designed for building automation and system integration. It supports web-based control, data logging, alarming, scheduling, and network management over Ethernet and wireless connectivity. Built on the Niagara Framework, it enables scalable multi-site control, real-time data processing, and integration with HVAC and non-HVAC systems. It features quad-core processing, dual Ethernet ports, RS-485 communication, expandable I/O modules, optional wireless capability, and scalable licensing for devices and points.",
        _options: [
            {
                "partCode": "HON-9000",
                "specification": "Individual HON-9000 controller with microSD card, branding clip, dual 10/100/1000 Mbps Ethernet ports, and dual RS-485 serial ports. Requires NC-9XXX core software and SMA-9XXX maintenance.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-CSE-003",
                "specification": "Case pack of 15 units. Branding clip and microSD card not included. WLAN disabled configuration. Must be ordered in multiples of 15 units.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-DEMO",
                "specification": "Demo controller with 500-device license microSD card, full Optimizer drivers, dual Ethernet and RS-485 ports. Requires Optimizer Supervisor N4.13u2 or higher.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-BRAND",
                "specification": "Replacement branding clip for HON-9000 controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-HW",
                "specification": "Replacement hardware unit only. Excludes microSD card and software license. Branding clip included if requested.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-SD-HW",
                "specification": "Replacement 8GB microSD card for HON-9000 controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-USD-CSE",
                "specification": "Case pack of 15 microSD cards. Must be ordered in multiples of 15.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9000-EC",
                "specification": "Equipment controller base license with 0 devices and 0 points. Requires capacity licensing.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9005",
                "specification": "Core license supporting up to 5 devices or 250 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9010",
                "specification": "Core license supporting up to 10 devices or 500 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9025",
                "specification": "Core license supporting up to 25 devices or 1250 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9100",
                "specification": "Core license supporting up to 100 devices or 5000 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9200",
                "specification": "Core license supporting up to 200 devices or 10000 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9XXX-DEMO",
                "specification": "Demo license for 500 devices for non-production use. Includes all Optimizer drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IO-R-16",
                "specification": "16-point RS-485 I/O module with 8 universal inputs, 4 relay outputs, and 4 analog outputs (0–10 VDC).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IO-R-34",
                "specification": "34-point RS-485 I/O module with 16 universal inputs, 10 relay outputs, and 8 analog outputs (0–10 VDC).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-2X-485",
                "specification": "Dual RS-485 expansion module for WEB-8000 and HON-9000 controllers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-232",
                "specification": "RS-232 expansion module for WEB-8000 and HON-9000 controllers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-LON",
                "specification": "LON FTT10A expansion module for WEB-8000 and HON-9000 controllers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-1YR",
                "specification": "1-year maintenance agreement for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-3YR",
                "specification": "3-year maintenance agreement for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-5YR",
                "specification": "5-year maintenance agreement for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-1YR",
                "specification": "1-year maintenance agreement for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-3YR",
                "specification": "3-year maintenance agreement for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-5YR",
                "specification": "5-year maintenance agreement for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-1YR",
                "specification": "1-year maintenance agreement for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-3YR",
                "specification": "3-year maintenance agreement for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-5YR",
                "specification": "5-year maintenance agreement for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-1YR",
                "specification": "1-year maintenance agreement for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-3YR",
                "specification": "3-year maintenance agreement for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-5YR",
                "specification": "5-year maintenance agreement for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-1YR",
                "specification": "1-year maintenance agreement for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-3YR",
                "specification": "3-year maintenance agreement for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-5YR",
                "specification": "5-year maintenance agreement for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WPM-8000",
                "specification": "Universal 100–240 VAC wall adapter for WEB-8000 and HON-9000 controllers. Includes US, EU, UK, and AU plug types.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "EDGE-10",
        "category": "Building Management",
        "brand": "Tridium",
        "title": "NIAGARA EDGE 10",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The Niagara Edge 10 is an IP-based field equipment controller powered by the Niagara Framework®. It is designed for applications such as zone temperature control, fan coil units, single-stage air handling units, and water-source heat pumps. The controller features 10 onboard I/O points, supports one IO-R-34 expansion module, dual Ethernet ports for daisy-chain networking, one RS-485 serial port, and Niagara N4 licensing supporting up to 3 devices or 50 points. It includes BACnet, Modbus, and SNMP drivers and provides lifetime software updates for Niagara N4 commercial releases.",
        _options: [
            {
                "partCode": "EDGE-10",
                "specification": "Niagara Edge 10 field controller with 10 onboard I/O points, 1 RS-485 serial port, 2 × 10/100 Mbps Ethernet ports, supports one IO-R-34 expansion module, includes Niagara N4 with BACnet, Modbus, and SNMP drivers, supports up to 3 devices or 50 points, and includes lifetime Niagara N4 commercial software updates.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "WEB-C3036",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "CIPer Model 30 Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The CIPer Model 30 is an IP-based programmable field equipment controller powered by the Niagara 4 Framework. It is designed for VAV, unitary, equipment, and plant applications, featuring 12 onboard I/O, a 4-port Gigabit Ethernet switch, support for BACnet/IP and FOXS communication, and expansion up to 312 I/O points using compatible expansion modules.",
        _options: [
            {
                "partCode": "WEB-C3036EPUBNH",
                "specification": "CIPer IP Unitary Controller, 150 Point / 4-Device Niagara 4 License, SMA.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-C3036EPVBNH",
                "specification": "CIPer IP VAV Controller, 150 Point / 4-Device Niagara 4 License, SMA.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-O9056H",
                "specification": "CIPer IP Large Expansion Module, 50-Point Niagara 4 License, 20 I/O (9 UI, 6 BO, 5 UIO).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-O3022H",
                "specification": "CIPer Small Expansion Module, 50-Point Niagara 4 License, 7 I/O (3 UI, 2 BO, 2 UIO).",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IO-R",
        "category": "Building Management",
        "brand": "Tridium",
        "title": "JACE 8000 IO R Modules",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "IO R is part of Tridium’s portfolio of hardware, software and tools designed for remote monitoring and control applications that enables end-to-end automation and device-to-enterprise integration. IO R allows the JACE® 8000 to interface directly with simple non-intelligent inputs and outputs remotely located up to 4,000 feet from the JACE. The connection is established via an industry-standard RS 485 multi-drop communications bus. Multiple IO R devices can be utilized on a single JACE, providing 250+ IO points on a single JACE. IO R modules support Niagara 4.3 or later and Niagara AX 3.8u3 or later, with agency certifications including UL 916, C-UL, CE, RCM, FCC Part 15 Class B, RoHS2, REACH, and WEEE. Operating temperature range is -20–60°C with MTTF of 10+ years. Modules support DIN-rail EN50022 or panel mounting.",
        _options: [
            {
                "partCode": "IO-R-16",
                "specification": "16 Point IO Module: 8 Universal inputs (Type 3 thermistors, 0-100K ohm, 0-10VDC, 0-20 mA), 4 Relay outputs (Form A, 24VAC @ .5A), 4 Analog outputs (0-10VDC). Powered by IO-R-34. Connected to JACE 8000 remotely over RS485.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IO-R-34",
                "specification": "34 Point IO Module: 16 Universal inputs (Type 3 thermistors, 0-100K ohm, 0-10VDC, 0-20 mA), 10 Relay outputs (Form A, 24VAC @ .5A), 8 Analog outputs (0-10VDC). Powered by 24VAC/DC. Can power up to 4 IO-R-16 modules. Connected to JACE 8000 remotely over RS485.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IQ4/10",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4/IO Expansion Modules",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The IQ 4/10 range of DIN rail mounted I/O expansion modules are designed for use with IQ4E and IQ4NC/32/XNC controllers, offering additional input and output channel connection points. They are also compatible with IQ3XCITE/96 and IQ3XCITE/128 controllers (v3.10 firmware onwards) and XCITE/IO modules.",
        _options: [
            {
                "partCode": "IQ4/10/16DI",
                "specification": "I/O Module with 16 digital input channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8DO",
                "specification": "I/O Module with 8 digital/relay output channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/4DO",
                "specification": "I/O Module with 4 digital/relay output channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8UIO",
                "specification": "I/O Module with 8 universal input/output channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8DI",
                "specification": "I/O Module with 8 digital inputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8UI",
                "specification": "I/O Module with 8 universal inputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8AO",
                "specification": "I/O Module with 8 analogue outputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/4UIO",
                "specification": "I/O Module with 4 universal inputs/outputs",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "PUC Series",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "Programmable Unitary Controller PUC Series",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "Honeywell PUC Series PUC8445 programmable unitary controller supports Ethernet BACNet IP communication. The controller supports numerous network topologies allowing flexible networking and wiring. The controller is programmable and can be widely used to control different building equipment. Supports embedded programmable tool under Niagara platform.",
        _options: [
            {
                "partCode": "PUC8445-PB1",
                "specification": "Programmable unitary controller with UI, DI, AO, DO configuration. Supports Ethernet BACNet IP communication, dual Ethernet ports supporting star, daisy chain, and ring connection (optional RSTP switch required). Built-in input/output ports with RS-485 expansion support.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "PEC8445-PB1",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "Programmable Enhanced Unitary Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The PEC8445-PB1 Programmable Enhanced Unitary Controller is an IP-based BACnet control platform designed for advanced building automation and HVAC applications. Built on the Niagara 4 framework, it provides a flexible and scalable control solution for unitary equipment such as fan coil units, VAV systems, air handling units, and other mechanical plant systems. The controller combines onboard input/output capabilities with a modular expansion architecture, allowing integration of field devices through EM communication modules and external networks. It supports scalable system design using EM modules (PUC5533-EM2 and PUC6002-EM2), enabling expansion of I/O capacity depending on system requirements. Designed for Ethernet-based BACnet IP communication, the controller enables integration with supervisory systems and building management platforms. It provides core automation functions including scheduling, alarm handling, and device communication management, making it suitable for standalone or networked control applications. The PEC8445-PB1 is available in two functional variants (SM and SO), allowing either EM-only expansion or extended integration with Modbus RTU devices for third-party system connectivity. Overall, the PEC8445-PB1 serves as a flexible, scalable, and programmable controller platform for modern HVAC and building automation systems requiring IP connectivity and multi-protocol integration.",
        _options: [
            {
                "partCode": "PEC8445-PB1-SM",
                "specification": "Programmable Enhanced BACnet IP Controller. Supports 8 Universal Inputs, 4 Binary Inputs, 4 Modulating Outputs, 5 Binary Relay Outputs. Supports up to 8 EM modules (PUC5533-EM2 / PUC6002-EM2). Onboard I/O and expansion via EM bus. B-AAC profile. Supports BACnet scheduling and alarms.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PEC8445-PB1-SO",
                "specification": "Programmable Enhanced BACnet IP Controller. Supports 8 Universal Inputs, 4 Binary Inputs, 4 Modulating Outputs, 5 Binary Relay Outputs. Supports up to 8 EM modules and third-party Modbus RTU devices. Total integrated up to 128 Modbus RTU points. B-AAC profile. Supports BACnet scheduling and alarms.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "CIPer-EXTRA-PARTS",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "CIPer MODEL 50 CONTROLLER",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "Extra parts for CIPer Model 50 controller system used for terminal connection, signal distribution, signal conversion, grounding, and mechanical mounting accessories.",
        _options: [
            {
                "partCode": "XS830",
                "specification": "Set of ten terminals. Each package consists of two groups of nine internally connected push-in terminals, for distributing signals / power.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "XS831",
                "specification": "Set of ten terminals. Each package consists of two groups of four pairs of push-in terminals (each with a 499 Ω resistor), for converting 0…20 mA signals into 0…10 VDC signals, and one push-in ground terminal per group.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TPU-11-01",
                "specification": "Removable terminal plugs, push-in type; complete set of 3 plugs (for terminals 1, 2, 24-32); for the WEB-EAGLENX26.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TPU-45-01",
                "specification": "Removable terminal plugs, push-in type; complete set of 9 plugs (for terminals 1 - 47); for the WEB-EAGLENX26.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "MVC-80-AC1",
                "specification": "Terminal cover (color: RAL9011); package of ten.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "MVC-80-AC2",
                "specification": "Front door mounting accessory (color: RAL9011); package of ten.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "MVC-40-AC3",
                "specification": "Strain relief; package of ten.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQ4E-CONTROLLER",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4E Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The IQ4E controller is a flexible building automation controller with 10 universal inputs, 6 analogue outputs, and expandability up to 192 I/O channels depending on variant. It supports Ethernet TCP/IP networking, BACnet over IP, optional Trend current loop LAN, embedded XML web services, RS232/USB engineering ports, and Wallbus room display integration. It is designed for scalable HVAC and building management applications.",
        _options: [
            {
                "partCode": "IQ4E/16/BAC/230",
                "specification": "IQ4E controller with 16 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/BAC/230",
                "specification": "IQ4E controller expandable to 32 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/BAC/230",
                "specification": "IQ4E controller expandable to 64 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/BAC/230",
                "specification": "IQ4E controller expandable to 96 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/BAC/230",
                "specification": "IQ4E controller expandable to 128 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/BAC/230",
                "specification": "IQ4E controller expandable to 160 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/BAC/230",
                "specification": "IQ4E controller expandable to 192 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/16/BAC/24VAC",
                "specification": "IQ4E controller with 16 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/BAC/24VAC",
                "specification": "IQ4E controller expandable to 32 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/BAC/24VAC",
                "specification": "IQ4E controller expandable to 64 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/BAC/24VAC",
                "specification": "IQ4E controller expandable to 96 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/BAC/24VAC",
                "specification": "IQ4E controller expandable to 128 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/BAC/24VAC",
                "specification": "IQ4E controller expandable to 160 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/BAC/24VAC",
                "specification": "IQ4E controller expandable to 192 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/16/LAN/BAC/230",
                "specification": "IQ4E controller with Trend LAN + BACnet IP, 16 I/O channels, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 32 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 64 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 96 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 128 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 160 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 192 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/16/LAN/BAC/24VAC",
                "specification": "IQ4E controller with Trend LAN + BACnet IP, 16 I/O channels, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 32 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 64 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 96 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 128 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 160 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 192 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "HONEYWELL-CIPER-MODEL-10",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "CIPer Model 10 Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The Honeywell CIPer Model 10 is an IP-based field equipment controller powered by the Niagara Framework. It is designed for HVAC and building automation applications such as fan coil units, zone temperature control, and single-stage air handling units. The controller includes 10 onboard I/O points and supports IO-R-34 expansion. It operates on Niagara 4 (WEBs-N4.7 or later) and supports BACnet/IP, Modbus, and SNMP communication protocols over IP and RS-485 networks.",
        _options: [
            {
                "partCode": "EDGE-10",
                "specification": "CIPer Model 10 controller with 10 points of onboard IO, 1 RS-485 serial port, and 2 10/100 Ethernet ports. Supports 1 IO-R-34. Includes WEBs-N4 and drivers for BACnet, Modbus and SNMP. Supports up to 3 devices or 50 points. Includes all software updates released for commercial use by Honeywell for the life of N4, but not for any later versions.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "HONEYWELL-WEBS-N4-SUPERVISOR",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "WEBs-N4 Supervisor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Management Software",
        "brandSubCategoryLink": "/products/building-management/bms-management-software",
        "longDescription": "WEBs-N4 Supervisor is a Niagara-based building automation software platform used for enterprise management, monitoring, alarming, scheduling, data logging, and integration across multiple Niagara controllers and IP devices.",
        _options: [
            {
                "partCode": "WEB-S-0-N4",
                "specification": "No Niagara network – Devices only (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-0-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-1-N4",
                "specification": "1 Niagara network connection (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-1-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-2-N4",
                "specification": "2 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-2-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-3-N4",
                "specification": "3 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-3-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-10-N4",
                "specification": "10 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-10-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-100-N4",
                "specification": "100 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-100-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-UNL-N4",
                "specification": "Unlimited Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UNL-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEMO",
                "specification": "Niagara 4 Supervisor demo",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UP-1",
                "specification": "Adds one additional Niagara connection to Supervisor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UP-100",
                "specification": "Upgrades Supervisor 100 to unlimited Niagara connections",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UP-UNL",
                "specification": "Upgrades Supervisor 100 to unlimited Niagara connections",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-10",
                "specification": "10 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-25",
                "specification": "25 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-50",
                "specification": "50 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-100",
                "specification": "100 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-200",
                "specification": "200 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-AX",
                "specification": "Enables Supervisor to run Niagara AX (v3.8)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-[0-UNL]-SMA [1,3,5]YR",
                "specification": "Supervisor [0-UNL] Maintenance – [1,3,5] YR extensions",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQVISION-SUPERVISOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQVISION Supervisor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Management Software",
        "brandSubCategoryLink": "/products/building-management/bms-management-software",
        "longDescription": "IQVISION is a building monitoring and management platform built on the Niagara 4 framework. It integrates Trend controllers and third-party devices using open protocols such as BACnet, Modbus, KNX, M-Bus, SNMP, and OPC, providing enterprise-level supervision, data logging, alarming, scheduling, reporting, and energy management.",
        _options: [
            {
                "partCode": "IQV-500",
                "specification": "IQVISION starter kit including Trend native driver and 500 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-2500",
                "specification": "IQVISION starter kit including Trend native driver and 2500 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-5000",
                "specification": "IQVISION starter kit including Trend native driver and 5000 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-15000",
                "specification": "IQVISION starter kit including Trend native driver and 15000 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-100EXT",
                "specification": "IQVISION additional 100 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-500EXT",
                "specification": "IQVISION additional 500 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-2500EXT",
                "specification": "IQVISION additional 2500 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-5000EXT",
                "specification": "IQVISION additional 5000 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-15000EXT",
                "specification": "IQVISION additional 15000 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-500-OPEN",
                "specification": "Extend base license with additional 500 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-2500-OPEN",
                "specification": "Extend base license with additional 2500 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-5000-OPEN",
                "specification": "Extend base license with additional 5000 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-10000-OPEN",
                "specification": "Extend base license with additional 10000 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-1-N",
                "specification": "Add connectivity for 1 TONN device",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-10-N",
                "specification": "Add connectivity for 10 TONN devices",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-MNT1",
                "specification": "IQVISION maintenance upgrade additional 1 year",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-MNT3",
                "specification": "IQVISION maintenance upgrade additional 3 years",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-MNTS",
                "specification": "IQVISION maintenance upgrade additional 5 years",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-ALM-PORTAL",
                "specification": "License for Alarm Portal on a remote PC",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-OPC",
                "specification": "Extend open protocol points with OPC client connectivity",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-DB-CSV",
                "specification": "Extend the capability to interact with microsoft excel",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-DB-SQL",
                "specification": "Extended the capability for IQVISION to communicate SQL",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQVIEW4",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQView4",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The IQView4 is a touch screen display which provides an interface to an IQ controller. It enables the user to view and adjust operating times, monitor alarms, make adjustments to controller parameters, and display graphs of logged data.",
        _options: [
            {
                "partCode": "IQVIEW4/24",
                "specification": "IQView4 including 3 m (9' 10\") RJ11 to RJ11 RS232 cable.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-RS-WMB-RD-WMB",
        "category": "Building Management",
        "brand": "Trend",
        "title": "RS-WMB, RD-WMB",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The RS-WMB and RD-WMB series of room sensors and displays are designed for mounting on a standard electrical back box. They include a temperature sensor with versions which also include humidity and CO₂ sensors. The RD-WMB has a monochrome backlit LCD display with setpoint, override, and fan speed control.",
        _options: [
            {
                "partCode": "RS-WMB-T",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RS-WMB-TH",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, and dew point output.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RS-WMB-TC",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor and local CO₂ concentration sensor.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RS-WMB-THC",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, local CO₂ concentration sensor, and dew point output.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-T",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-TH",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-TC",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local CO₂ concentration sensor, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-THC",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, local CO₂ concentration sensor, dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQVIEW8",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQVIEW8 Touch Screen Display",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The IQVIEW8 is a touch screen display that provides an interactive user interface to the Trend system. It enables the user to view/adjust operating times, monitor alarms, make adjustments to controller parameters, display graphs of logged data, and interact with customized graphical schematics.",
        _options: [
            {
                "partCode": "IQVIEW8/24",
                "specification": "IQVIEW8 including 2GB memory card.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQVIEW8 SURFACE MOUNTING BOX",
                "specification": "Kit for mounting IQVIEW8 on a flat surface, or UK or USA double-gang back box.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQVIEW8 DRY PARTITION WALL BOX",
                "specification": "Kit for mounting IQVIEW8 embedded in an dry partition wall.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "CABLE/EJ105046",
                "specification": "RJ11 plug to RJ11 plug with crossover to connect to IQ4, IQ3, IQ2xx, and IQ1xx controller’s with RJ11 local supervisor port connector.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "CABLE/EJ105651",
                "specification": "RJ11 to 25 way D type male to connect to IQ1xx controller’s with RJ11 local supervisor port connector and to a CNC.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "CABLE/78-1172",
                "specification": "25 way D type female to 5 in line socket adapter to connect to IQ1xx controller’s with 5 in-line local supervisor port connector. Should be used in conjunction with CABLE/EJ105651).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/24VAC",
                "specification": "230/24 Vac, 36 VA, transformer for IQVIEW8 with surface mounting lugs, and through earth (ground) connection.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-RV-WMB-ROOM-VIEW-DISPLAY",
        "category": "Building Management",
        "brand": "Trend",
        "title": "Room View Display",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The RV-WMB Room View Display is designed for mounting on a standard electrical back box. It includes temperature and humidity sensors and features a high definition colour backlit LCD touch screen display with occupation override, setpoint, and fan speed control. It is designed to operate with Trend IQ4 and IQeco controllers and connects to the controller by a two wire polarity independent wall bus which carries both data and power.\n\nFeatures:\n- Single power/data connection to controller reduces wiring\n- Temperature and humidity sensing\n- Calculated dew point output\n- Operates in either °C or °F\n- Portrait or landscape orientation\n- High definition colour backlit touch screen LCD display\n- Setpoint, fan speed, and occupancy override controls\n- Display of CO₂ concentration and Outside Air Temperature values from controller\n- Function key options (lights, blinds etc)\n- Backup/Transfer of configuration details using micro SD card",
        _options: [
            {
                "partCode": "RV-WMB-TH",
                "specification": "Room Display (complete with dust cover). Compatible with IQ4 or IQeco with a wallbus connection. It has a temperature sensor, humidity sensor, calculated dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RV-WMB-TH-BX",
                "specification": "Room Display without bezel (complete with dust cover) for use RV-BW-A paintable bezel. Compatible with IQ4 or IQeco with a wallbus connection. It has a temperature sensor, humidity sensor, calculated dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RV-BW-A",
                "specification": "Paintable bezel for use with RV-WMB-TH-BX.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-HT-D-DUCT-HUMIDITY-TEMPERATURE-SENSORS",
        "category": "Building Management",
        "brand": "Trend",
        "title": "Duct Humidity and Temperature Sensors",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The HT/D Duct Humidity and Temperature Sensors are duct mounted relative humidity and temperature sensors for HVAC applications. The certified ±2% high accuracy (/2%) and standard ±3% versions offer excellent linearity and stability over a wide humidity range (10 to 90%RH). Features: Precalibrated for ease of commissioning, IP65, operates over 0 to 100%RH non-condensing, ±2% and 3% accuracy versions, 2 part connectors for ease of installation, humidity sensor element protected by replaceable filter, capacitive humidity sensing element provides excellent long term stability, adjustable depth duct mounting flange option.",
        _options: [
            {
                "partCode": "HT/D/2%",
                "specification": "Duct humidity and PRT temperature sensor with ±2% humidity accuracy over 0 to 90%RH and calibration certificate.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HT/D",
                "specification": "Duct humidity and thermistor temperature sensor, ±3% humidity accuracy over 10 to 90%RH.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/FLANGE/12MM/5",
                "specification": "Optional, adjustable depth, duct mounting flange pack of 5.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/HTD/FILTER",
                "specification": "Replacement PTFE membrane filter for duct sensor - pack of 5.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-HT-O-OUTSIDE-HUMIDITY-TEMPERATURE-SENSORS",
        "category": "Building Management",
        "brand": "Trend",
        "title": "HT/O",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The HT/O Outside Humidity and Temperature Sensors are designed for outside air measurement applications, providing high quality humidity sensing combined with temperature monitoring. The HT/O offers excellent linearity and stability over a wide humidity range (0 to 100%RH). This sensor is fitted with a radiation shield to avoid solar, rain and wind effects. Electronics are mounted in an IP65 (NEMA4) housing with M20 conduit entry with M16 cable gland. Features: Passive thermistor and active 4 to 20 mA temperature outputs, 4 to 20 mA humidity output, IP65 housing, operates over 0 to 100%RH non-condensing, humidity element protected by replaceable filter, capacitive humidity sensing element provides excellent long term stability, radiation shield reduces solar, rain, and wind effects.",
        _options: [
            {
                "partCode": "HT/O",
                "specification": "Outside humidity and temperature sensor with radiation shield including mounting bracket, screws, and wall plugs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/HTO/FILTER",
                "specification": "Replacement metal grid filter for HT/O (pack of 5 filters).",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-HT-S-SPACE-HUMIDITY-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "Space Humidity and Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The HT/S Space Humidity and Temperature Sensor is designed for wall mounted relative humidity measurement combined with temperature measurement. The certified 2% high accuracy (HT/S/2%) and standard 3% (HT/S) versions offer excellent linearity and stability over a wide humidity range. Features: Precalibrated for ease of commissioning, operates over 0 to 100%RH non-condensing, ±2% and 3% accuracy versions, 2 part connectors for ease of installation, capacitive humidity sensing element provides excellent long term stability.",
        _options: [
            {
                "partCode": "HT/S/2%",
                "specification": "Space humidity and PRT temperature sensor with ±2% humidity accuracy over 30 to 70%RH and ±3% over 20 to 90%RH. Complete with calibration certificate.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HT/S",
                "specification": "Space humidity and thermistor temperature sensor, ±3% humidity accuracy over 30 to 75%RH, and ±4.5% over 20 to 95%RH.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "AFS-SERIES-ADJUSTABLE-DIFFERENTIAL-PRESSURE-SWITCH",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "AFS Series",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The AFS Series Adjustable Differential Pressure Switch is designed for air pressure sensing applications. The plated housing contains a diaphragm, a calibration spring and a snap-acting SPDT switch. The sample connections located on each side of the diaphragm accept 6.35 mm (0.25\") OD tubing via the integral compression ferrule and nut or barbed fitting. An enclosure cover guards against accidental contact with the live switch terminal screws and the set point adjusting screw. The enclosure cover will accept a 12.7 mm (0.5\") conduit connection. Features: Air sample media, diaphragm mounting in any vertical plane, adjustable differential pressure switch, ferrule and nut compression or 1/4\" OD barbed sample line connections, screw top terminals with cup washers, automatic or manual reset depending on model, SPDT or SPDT-NC switch configuration depending on model, UL, FM, CSA and CE approvals depending on model.",
        _options: [
            {
                "partCode": "AFS-222-316",
                "specification": "0.05 ± 0.02” W.C. to 12.0” W.C. with Ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-222-112-316",
                "specification": "0.05 ± 0.02” W.C. to 12.0” W.C. with 1/4” OD barbed connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-262-316",
                "specification": "0.05 ± 0.02” W.C. to 2.0” W.C. with Ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-262-112-316",
                "specification": "0.05 ± 0.02” W.C. to 2.0” W.C. with 1/4” OD barbed connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-460",
                "specification": "0.40 ± 0.06” W.C. to 12.0” W.C. with Ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-460-112",
                "specification": "0.40 ± 0.06” W.C. to 12.0” W.C. with 1/4” OD barbed connections.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("MongoDB Connected for seeding Products...");

        await Promise.all([
            Product.deleteMany({}),
            ProductOption.deleteMany({}),
            ProductDocument.deleteMany({})
        ]);
        console.log("Old data cleared.");

        for (const item of MOCK_PRODUCTS) {
            const { _options, _documents, ...productData } = item;

            const product = await Product.create(productData);

            if (_options && _options.length > 0) {
                const opts = _options.map(opt => ({
                    productId: product._id,
                    partCode: opt.partCode,
                    specification: opt.specification,
                    price: opt.price || 0,
                    qty: opt.qty || 0
                }));
                const saved = await ProductOption.insertMany(opts);
                product.options = saved.map(o => o._id);
            }

            if (_documents && _documents.length > 0) {
                const docs = _documents.map(d => ({
                    productId: product._id,
                    name: d.name,
                    url: d.url
                }));
                const saved = await ProductDocument.insertMany(docs);
                product.documents = saved.map(d => d._id);
            }

            await product.save();
        }

        console.log(`${MOCK_PRODUCTS.length} products seeded successfully!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedDB();
