import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";
import ProductOption from "./model/productOption.js";
import ProductDocument from "./model/productDocument.js";
import Category from "./model/category.js";

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
                "partCode": "IQV-MNT5",
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
    },
    {
        "productId": "INNCOM-S563-EV564-INNTOUCH-DND-MUR-CONTROLS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM S563 / EV564 INNtouch DND and MUR Controls",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The INNCOM INNtouch guestroom annunciation system is a two-component solution that provides guests with a convenient way to communicate privacy and room service preferences. The system includes the EV564 Guestroom Annunciator and DND/MUR Control and the S563 Corridor Annunciator and Doorbell Control. Together they provide Do Not Disturb (Privacy), Make Up Room indication, and doorbell functionality while supporting integration with the INNCOM Integrated Room Automation System.",
        _options: [
            {
                "partCode": "EV564",
                "specification": "Guestroom Annunciator and DND / MUR Control",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "S563",
                "specification": "Corridor Annunciator and Doorbell Control",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "GS564",
                "specification": "Corridor Annunciator and Doorbell Control",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "GS564",
                "specification": "Guestroom Annunciator and DND / MUR Control",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-DD1",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "DD15 Daikin VRV Interface Module",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "Honeywell INNCOM DD15 interface module providing direct digital integration between INNCOM room automation systems and Daikin VRV indoor units.",
        _options: [
            {
                "partCode": "62-1465",
                "specification": "",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "32315379",
                "specification": "",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-MINI-PIR-MOTION-SENSOR",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Mini PIR Motion Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM Mini Passive Infrared (PIR) Motion Sensor is a recessed ceiling-mounted occupancy sensor designed to enhance guestroom energy management. Used with a door contact device, room controller, and communication network, it accurately detects room occupancy to improve HVAC efficiency, lighting control, security, and overall guest comfort.",
        _options: [
            {
                "partCode": "04-1068.MI",
                "specification": "Mini PIR Motion Sensor | Recessed ceiling-mounted occupancy sensor | Part Number: PIR2036.EP | 8-16VDC operating voltage (12VDC nominal) | Typical current consumption 15mA @ 12VDC | Detection range 0.5-12m (1.64-40ft) | Maximum coverage 8 × 8m (26 × 26ft) | 120° detection angle | Quad-element pyro-sensor | Spectral detection 6-14µm | Alternate polarity signal processing | Power-up delay 2 minutes | Sensor output time 3 seconds | Selectable N.C. or N.O. dry relay contact with 10Ω current limiting resistor | Output rating 50VDC / 0.5A maximum | Operating temperature 10°C to 55°C | Relative humidity 95% non-condensing | Dimensions 54 × 40mm | Weight 30g | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-MOTION-SENSORS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Motion Sensors",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "Honeywell INNCOM Motion Sensors are passive infrared (PIR) occupancy sensors designed to provide intelligent occupancy detection for INNCOM Energy Management Systems (EMS). Available in wired and wireless models with wall-mounted, flush ceiling-mounted, recessed ceiling-mounted, and battery-powered options, these sensors help maximize guestroom energy savings, improve HVAC efficiency, enhance lighting control, and integrate with the INNCOM Deep Mesh Network and INNcontrol EMS software.",
        _options: [
            {
                "partCode": "K04-1067.H",
                "specification": "K594W Wall Mounted Motion Sensor | Wired PIR occupancy sensor | Dimensions: 105 × 61 × 44 mm | Input voltage: 9-15VDC | Alarm indication LED: 2.4 seconds | Selectable event counter: 2 or 4 pulse | Normally-closed tamper contacts rated ≤100mA, 25VDC, 2.5W | Operating temperature: 0°C to 49°C | RFI immunity",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1068.MI",
                "specification": "Mini PIR Motion Sensor (Recessed Ceiling Mounted) | Dimensions: 54 × 40 mm | Operating voltage: 8-16VDC (12VDC nominal) | Current consumption: 15mA typical @12VDC | Lens: 36 beams, 120° coverage, maximum coverage 8 × 8 m | Quad-element pyro sensor | Spectral detection: 6-14 µm | Alternate polarity signal processing | Detection range: 8 m @25°C | Selectable single or dual polarity pulse counting | Sensor output time: 3 seconds | Selectable N.C. or N.O. relay dry contact with 10Ω current limiting resistor | Output contact rating: 50VDC, 0.5A maximum | Walk-test LED after power-up delay | Operating temperature: 10°C to 55°C | Relative humidity: 95% non-condensing | Weight: 30 g",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PIR2036.EP",
                "specification": "Mini PIR Motion Sensor | Alternate model designation for the recessed ceiling-mounted Mini PIR | Same specifications as part number 04-1068.MI",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-WHUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | White | Mounts in a single US gang box | Dimensions: 119 × 74 × 7.4 mm | RF data rate: 250 kbps | SMT antenna | Indoor range: 21 m (70 ft) | Outdoor line-of-sight range: 165 m (540 ft) | Transmit power: 1mW (+0dBm) | Receive sensitivity: -94.6dBm | 2.4GHz | AES-128 encryption | IEEE 802.15.4 | Channels 11-26 | FCC and CE Mark",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-BKUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | Black | Same specifications as 201-595-WHUS.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-LAUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | Light Almond | Same specifications as 201-595-WHUS.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-XXUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | Custom finish | Same specifications as 201-595-WHUS.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1068.AEI",
                "specification": "K594C Flush Ceiling Mounted Motion Sensor | Wired PIR occupancy sensor | Dimensions: 25 × 86 mm | Input voltage: 8-16VDC | Maximum current drain: 15mA | Lens: 24 Fresnel beams, 24 + 14 curtain beams | Maximum coverage: 11 × 11 m (36 × 36 ft), 113° | Relay contact: 28VDC, 0.1A | Event counter: Normal response or 2 pulse within 10 seconds | Normally-closed tamper contacts rated 50mA @12VDC | Operating temperature: -10°C to 55°C | Storage temperature: -20°C to 60°C",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFWH.P",
                "specification": "K594.RF Battery Powered Motion Sensor | White | Dimensions: 89 × 89 × 64 mm | RF data rate: 250 kbps | SMT antenna | Indoor range: 21 m (70 ft) | Outdoor line-of-sight range: 165 m (540 ft) | Transmit power: 1mW (+0dBm) | Receive sensitivity: -94.6dBm | 2.4GHz | AES-128 encryption | IEEE 802.15.4 | Input voltage: 9-16VDC | Maximum current drain: 9mA @12VDC | FCC Part 15B Listed",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFBK.P",
                "specification": "K594.RF Battery Powered Motion Sensor | Black | Same specifications as 01-9912-RFWH.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFLA.P",
                "specification": "K594.RF Battery Powered Motion Sensor | Light Almond | Same specifications as 01-9912-RFWH.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFXX.P",
                "specification": "K594.RF Battery Powered Motion Sensor | Custom finish | Same specifications as 01-9912-RFWH.P",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-PC50X-DALI-MODULE",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM PC50X DALI Module",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM PC50X DALI Module is a Digital Addressable Lighting Interface (DALI) controller designed for hospitality applications. It provides granular lighting control, tunable white color temperature (DALI Type 8 Tc), scene management, energy-saving automation, and integration with the INNCOM INNcontrol™ Energy Management System (EMS). The module supports wired and wireless installation, Zigbee®, Bluetooth® Low Energy, Deep Mesh networking, and DALI lighting systems for centralized monitoring and intelligent guestroom lighting control.",
        _options: [
            {
                "partCode": "PC50X",
                "specification": "DALI Lighting Control Module | DALI Type 8 Tc (Tunable White Color Temperature) | Supports up to 16 lighting scenes and groups | Auto-on when guests enter and auto-off when room is empty | Restores previous lighting state after guest return or power outage | Very low dimming below 10% (driver/ballast dependent) | Supports incandescent, fluorescent, and LED lighting | Wired or wireless installation | Supports daisy-chain wiring | Zigbee® and Bluetooth® Low Energy configuration | DALI connector: 2-pin terminal block | DALI data rate: 1200bps | Isolation: 1500VDC (DALI-SELV) | INNCOM S5Bus: 2550bps, 50ft range, 20 nodes maximum | Zigbee RF: 100ft range, 19dBm (FCC), 9dBm (CE), -95.6dBm receive sensitivity, 2.4GHz IEEE 802.15.4, channels 11-26 | Bluetooth® Low Energy 5.0: 50ft range, 8dBm max output power, receive sensitivity -95dBm (1 Mbps), -92dBm (2 Mbps), -103dBm (125 kbps) | RS485: 250kbps Deep Mesh protocol, A/B/Ground, supports Multi-Point, Daisy-Chain, Tree and Star topologies, maximum 32 devices | I/O: 2 software-configurable digital TTL inputs/outputs and 1 open-collector relay output | Power input: 12VDC | Maximum current: 100mA | Operating temperature: 0°C to 50°C | Storage temperature: -20°C to 70°C | Humidity: 10-90% RH non-condensing | Indoor use only | Certifications: IEC 61347-2-11, EN 61547, EN 55015, EN 301489, EN 300328",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-B578-R-EDGE-ROUTER",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM B578.R Edge Router",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM B578.R Edge Router provides secure RF-to-Ethernet communication between INNCOM RF Room Gateway devices installed in guestrooms and the INNCOM Deep Mesh Server. Designed for hospitality applications, the B578.R supports Deep Mesh networking, end-to-end AES-128 encrypted communication, UDP packet transport, and Power over Ethernet (PoE) applications. It is optimized for buildings where RF communication is limited, such as concrete construction, and integrates with the INNCOM Room Automation System and INNcontrol 3 software.",
        _options: [
            {
                "partCode": "B578.R",
                "specification": "Edge Router | RF-to-Ethernet protocol converter | Deep Mesh Network gateway | Supports one router per guestroom | Wall, ceiling, standard 2-gang ring, or DIN rail mounting | Supports Power over Ethernet (PoE) applications | RF data rate: 250kbps | Indoor RF range: 100 ft | Transmit power: 50mW (+17dBm) | Receive sensitivity: -94.6dBm | Frequency band: 2.4GHz | AES-128 encryption | IEEE 802.15.4 protocol | Zigbee channels 11-26 (preferred: 15, 20, 25, 26) | Supports up to 50 in-room devices | Supply voltage: 12VDC | Current consumption: 200mA peak, 100mA RMS | Operating temperature: 0°C to 40°C | Dimensions: 4.75 × 4.9 × 0.8 in | Network connection: 10/100 Mbps Ethernet | Supported IP protocols: UDP, ICMP, DHCP | FCC Part 15, CE Mark ETSI, RoHS | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-CHM-S-ELECTRONIC-DOOR-CHIME",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM CHM-S Electronic Door Chime",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM CHM-S Electronic Door Chime is part of the Integrated Room Automation System (IRAS). It works with INNCOM System-5 (S5 bus) guestroom controls to provide an audible doorbell notification for hospitality guestrooms.",
        _options: [
            {
                "partCode": "04-1038",
                "specification": "Electronic Door Chime | Input voltage: 12VDC | Speaker: 1.0W, 8 Ohms | Dimensions: 70 × 119 × 54 mm (2.75 × 4.68 × 2.125 in) | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-D454-F-2-CHANNEL-AC-FET-DIMMER",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM D454-F 2-Channel AC FET Dimmer",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM D454-F is a 2-channel AC FET dimmer designed for the INNCOM In-Room Automation System (IRAS). It provides intelligent dimming control for incandescent, halogen, LED, and CFL lighting while integrating with INNCOM MODEVA, EVORA, Elements, and Designer Series room automation platforms. The D454-F also supports occupancy sensing, third-party switch interfaces, lighting scenes, and S5bus communication for seamless guestroom lighting automation.",
        _options: [
            {
                "partCode": "D454-F",
                "specification": "2-Channel AC FET Dimmer | Input voltage: 100-240VAC | Current consumption: Typical 100mA | S5bus communication | 2 open-collector digital outputs | 3 dry-contact digital inputs (0-5VDC) | Diagnostic and channel status LEDs | Dimensions: 157.2 × 86.6 × 57 mm | 35 mm DIN rail mountable | Operating temperature: 0°C to 40°C | Humidity: 0-90% RH non-condensing | Supports incandescent, halogen, LED, CFL, resistive, and electronic ballast loads | Dual 800W total output or 550W single-channel dimming | FCC, UL, CE, RoHS compliant | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E7-THERMOSTAT",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E7 Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM e7 Thermostat is a smart guestroom thermostat designed for hospitality applications. It provides temperature and humidity control, built-in occupancy detection, and serves as the central hub for the INNCOM room automation platform. The e7 supports standalone or networked energy management, integrates with INNcontrol software and third-party hotel systems, and is compatible with a wide range of HVAC configurations.",
        _options: [
            {
                "partCode": "201-528-24-BK*",
                "specification": "24VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-24-WH*",
                "specification": "24VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-BK*",
                "specification": "100-277VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-WH*",
                "specification": "100-277VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-100-BK",
                "specification": "100-277VAC Thermostat Installation Kit | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-100-WH",
                "specification": "100-277VAC Thermostat Installation Kit | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-24-BK",
                "specification": "24VAC Thermostat Installation Kit | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-24-WH",
                "specification": "24VAC Thermostat Installation Kit | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "32324212-001",
                "specification": "Thermostat Screw Kit Assembly",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1464.R",
                "specification": "Thermostat 24VAC Harness",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1096.FL",
                "specification": "e7 Remote Thermistor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-503",
                "specification": "PC-503 Configuration Tool for engINN",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-250",
                "specification": "RS485 DM485 Communication Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1455",
                "specification": "Thermostat 100-277VAC Harness",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E7W-WIRELESS-EMS-THERMOSTAT",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E7W Wireless EMS Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM e7w Wireless EMS Thermostat is a battery-powered thermostat designed for hospitality energy management systems. It provides wireless temperature and humidity control, built-in occupancy detection, and seamless integration with the INNCOM Integrated Room Automation System (IRAS). The e7w supports standalone or networked EMS applications and works with INNcontrol software to optimize guest comfort and energy efficiency.",
        _options: [
            {
                "partCode": "201-528-6V-BK**",
                "specification": "6V Wireless Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-6V-WH**",
                "specification": "6V Wireless Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-24-BK",
                "specification": "24VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-24-WH",
                "specification": "24VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-BK",
                "specification": "100-277VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-WH",
                "specification": "100-277VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PC502***",
                "specification": "Protocol Converter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47.L.P",
                "specification": "24VAC Relay Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47.H.P",
                "specification": "100-277VAC Relay Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "S541.RF",
                "specification": "Wireless Door Switch / Transmitter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1096.FL",
                "specification": "Remote Thermistor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-503",
                "specification": "PC-503 Configuration Tool for engINN",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-250",
                "specification": "RS485 DM485 Communication Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "32324212-001",
                "specification": "Thermostat Screw Kit Assembly",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1455",
                "specification": "Thermostat 100-277VAC Harness",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1464",
                "specification": "Thermostat 24VAC Harness",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E528-E529-EMS-THERMOSTATS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E528 & E529 EMS Thermostats",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The INNCOM e528 and e529 are e-Series hospitality EMS thermostats designed for scalable guestroom automation and energy management. The e528 supports line-voltage or low-voltage operation with built-in relays, while the e529 is a battery-powered wireless version. Both models function as standalone thermostats, in-room EMS devices, or networked IoT hubs integrated with INNCOM INNcontrol. They support optional occupancy sensing, RF communication, humidity sensing, ecoMODE energy-saving control, and integration with door locks and third-party systems for advanced energy optimization and guest comfort control.",
        _options: [
            {
                "partCode": "e528",
                "specification": "EMS Thermostat (Line Voltage / Low Voltage / Built-in Relay Versions)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "e529",
                "specification": "Battery Powered Wireless EMS Thermostat (4x AA batteries)",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-L510-LAMP-CONTROLLER",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM L510 Lamp Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "RF DeepMesh lamp controller designed for hospitality applications supporting incandescent, CFL, and LED loads with relay, TRIAC, or FET dimming control. Supports integration with INNCOM EMS and room automation systems.",
        _options: [
            {
                "partCode": "201-7050",
                "specification": "Relay Actuator RF Lamp Controller | 120-240VAC | 500W tungsten/ELV | 250VA electronic ballast | 1/10 HP motor | 4.1A resistive/general purpose load | IEEE 802.15.4 DeepMesh RF | 2405-2480MHz | 120-240VAC power input",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-7051",
                "specification": "TRIAC Dimmer RF Lamp Controller | 120VAC | 650W tungsten/ELV | 250VA electronic ballast | 1/10 HP motor | 2.9A resistive/general purpose load | IEEE 802.15.4 DeepMesh RF | 2405-2480MHz | dimming control for incandescent, CFL, LED lamps",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-7052",
                "specification": "FET Dimmer RF Lamp Controller | 120VAC | 350W tungsten/ELV | 250VA electronic ballast | 2.9A resistive/general purpose load | IEEE 802.15.4 DeepMesh RF | 2405-2480MHz | smooth dimming control for LED, CFL, incandescent lamps",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-PC-503-COMMISSIONING-TOOL",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM PC-503 Commissioning Tool",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "USB-based RF commissioning tool used with INNTOOL/EngINN application for installation and configuration of INNCOM devices. Provides RF-only communication and USB power interface with Tx/Rx LED indicators.",
        _options: [
            {
                "partCode": "201.503",
                "specification": "PC-503 Commissioning Tool | RF-only device | 2.4GHz IEEE 802.15.4 | 250kbps data rate | 70ft indoor range | +5dBm transmit power | -95dBm receive sensitivity | AES-128 encryption | USB 5V input power | Tx/Rx LED status indicators | 0–40°C operating temperature",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-POWER-SUPPLIES",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Power Supplies",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "Power supplies for INNCOM room automation and EMS systems.",
        _options: [
            {
                "partCode": "PS563",
                "specification": "40VA NEMA transformer that powers 24V–277VAC circuits in HVAC systems",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS564.DIN",
                "specification": "Universal input, 12VDC 1A output, DIN rail mountable enclosure with three (3) S5Bus connectors",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS564 SMPS",
                "specification": "Compact, universal input 12VDC output power supply",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS565",
                "specification": "Universal input 12VDC, 1A SMPS. This power supply uses a standard 110V outlet and provides two (2) 12VDC outputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS567 MEANWELL DR-30-12",
                "specification": "Meanwell DR-30-12 power supply used for applications which require up to 2A DC output. DIN rail mountable enclosure",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS576",
                "specification": "12 VDC, 4 amp power supply for the B576",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-RELAYS-CONTROLLERS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Relays & Controllers",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "INNCOM relays and controllers extend the Integrated Room Automation System (IRAS) by activating HVAC, lighting, drapes, and IoT devices.",
        _options: [
            {
                "partCode": "X05R",
                "specification": "Equipped with eight 15A relays to switch motor, pump, heater, tungsten, incandescent and fluorescent loads. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X05W",
                "specification": "Controls Williams FCU from INNCOM thermostat by modulating cooling, heating and fan motors. Includes switched relay output for heat. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X06",
                "specification": "Provides 1–5 relay outputs for HVAC, PTAC, FCU, lighting and drape control. Includes 12VDC 400mA power supply and S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X06.DIN",
                "specification": "DIN rail mountable universal relay pack for HVAC, PTAC, FCU, lighting and drape control applications. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X45RA",
                "specification": "Integrates lighting and guest room controls including 0–10V fluorescent ballasts, LED lights, occupancy detection and guest annunciation. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47",
                "specification": "Provides 5 relay outputs for FCU and light-duty applications. Supports S5 bus or RF (with PC502). Available in 24VAC or 100–277VAC models",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E527-THERMOSTAT",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E527 Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The INNCOM E527 is a low-voltage EMS thermostat designed for hospitality energy management systems. It provides intelligent HVAC control with optional PIR occupancy detection, door/window sensor integration, and humidity sensing. The E527 optimizes guestroom comfort while reducing HVAC energy consumption through occupancy-based setback control and integration with INNCOM INNcontrol software and Deep Mesh networking.",
        _options: [
            {
                "partCode": "PC502",
                "specification": "Protocol Converter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47.L.P",
                "specification": "24VAC Relay Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "S541.RF",
                "specification": "Wireless Door Switch / Transmitter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1096",
                "specification": "Remote Thermistor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-503",
                "specification": "PC-503 Configuration Tool used with engINN",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-250",
                "specification": "RS485 DM485 Communication Module",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    }
];

async function seedTaxonomy() {
  const existing = await Category.countDocuments({ parent: null });
  if (existing > 0) {
    console.log("Taxonomy already seeded, skipping...");
    return;
  }

  const taxData = [
    {
        "name": "Building Management",
        "children": [
            {
                "name": "BMS Controller",
                "children": [
                    {
                        "name": "DDC Controller"
                    },
                    {
                        "name": "Network Controller"
                    }
                ]
            },
            {
                "name": "BMS Field Device"
            },
            {
                "name": "BMS Management Software"
            }
        ]
    },
    {
        "name": "Room Control Unit(RCU)",
        "children": [
            {
                "name": "INNCOM(Controller + Sensor)",
                "label": "INNCOM (Controller + Sensor)"
            }
        ]
    }
];

  for (const root of taxData) {
    const { children, ...rootData } = root;
    const parent = await Category.create(rootData);
    for (const child of (children || [])) {
      const { children: grandChildren, ...childData } = child;
      const childDoc = await Category.create({ ...childData, parent: parent._id });
      for (const gc of (grandChildren || [])) {
        await Category.create({ ...gc, parent: childDoc._id });
      }
    }
  }
  console.log("Taxonomy seeded successfully.");
}

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("MongoDB Connected for seeding Products...");

        await seedTaxonomy();

        for (const item of MOCK_PRODUCTS) {
            const { _options, _documents, ...productData } = item;

            // Upsert by productId to preserve admin-uploaded images and options/documents
            const existing = await Product.findOne({ productId: productData.productId });
            if (existing) {
                // Only update fields that came from the seed, preserve images and existing options/documents
                const updateData = { ...productData };
                if (existing.mainImage) delete updateData.mainImage;
                if (existing.thumbnails && existing.thumbnails.length > 0) delete updateData.thumbnails;
                await Product.updateOne(
                    { productId: productData.productId },
                    { $set: updateData }
                );
                console.log(`Updated existing product: ${productData.productId} (preserved image & options)`);

                // Do NOT replace options or documents for existing products
            } else {
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
                console.log(`Created new product: ${productData.productId}`);
            }
        }

        console.log(`Products seeded successfully!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedDB();
