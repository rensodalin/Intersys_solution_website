import { createFileRoute, Link } from "@tanstack/react-router";
import { TypeAnimation } from "react-type-animation";

import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import {
    Cpu,
    Zap,
    Settings,
    Activity,
    Shield,
    Globe,
    Layout,
    Database,
    Cloud,
    Smartphone,
    Thermometer,
    Droplets,
    Wind,
    Power,
    CheckCircle2,
    ChevronRight,
    ArrowRight,
    Flame,
    Code2,
    BarChart3,
    Lock,
    Server,
    Building2,
    SlidersHorizontal,
} from "lucide-react";

// Products
import { BuildingManagementGrid } from "@/components/Product/BuildingManagement/BuildingManagementGrid";
import { bmsProducts } from "@/components/Product/BuildingManagement/data";

export const Route = createFileRoute("/services_/building-management")({
    head: () => ({
        meta: [
            { title: "Building Management Systems (BMS) — Intersys Solutions" },
            {
                name: "description",
                content:
                    "Advanced Building Management Systems and Niagara Framework integration. Official Honeywell Engineering System Distributor.",
            },
        ],
    }),
    component: BMSPage,
});

function BMSPage() {
    return (
        <div className="bg-white overflow-hidden scroll-smooth">

            {/* ─── HERO ─── */}
            {/* ─── HERO ─── */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center pt-17 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://www.intersys-solutions.com/website_asset/IT KPS REVISE_37 - Photo (1).jpg"
                        alt="Modern Cityscape"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                </div>

                <Container className="relative z-10 text-white">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            Intelligent <br />

                            <span className="text-red-500">
                                Building Management Solutions.
                            </span>
                        </h1>

                        <p className="text-base text-white/70 max-w-2xl leading-relaxed">
                            Transform your facilities with advanced automation, safety, and efficiency
                        </p>

                        <div className="pt-2">
                        </div>
                    </div>
                </Container>
            </section>
            {/* ─── WHAT IS BMS ─── */}
            <section className="py-28 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* LEFT CONTENT */}
                        <div className="space-y-10">

                            <div className="space-y-5">
                                <h2 className="text-4xl font-bold text-[#1A3263] leading-tight">
                                    What is a{" "}
                                    <span className="text-red-500">Building Management System?</span>
                                </h2>

                                <p className="text-gray-500 leading-relaxed text-lg">
                                    BMS is a computer-based control system installed in buildings that monitors and controls
                                    mechanical and electrical equipment such as HVAC systems, lighting, power systems, fire systems,
                                    and fire protection infrastructure.
                                </p>
                            </div>

                            {/* CLEAN FEATURE PILLS (NO ICONS) */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "HVAC Systems",
                                    "Lighting Control",
                                    "Power Distribution",
                                    "Fire Detection",
                                    "Fire Fighting Systems",
                                    "Mechanical Control"
                                ].map((item, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-sm bg-gray-50 border border-gray-100 text-sm font-medium text-[#1A3263] hover:border-red-200 hover:bg-red-50/40 transition"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        {/* RIGHT IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: -90 }}
                            whileInView={{ opacity: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="relative perspective-[2000px]"
                        >
                            <img
                                src="https://uploads.onecompiler.io/42e6qwqtt/4463hvbwt/Screenshot%202025-11-29%20141610.png"
                                alt="BMS Diagram"
                                className="w-full h-auto rounded-xl shadow-xl border border-gray-100 backface-hidden"
                            />

                            {/* soft glow */}
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-500/10 blur-[90px] rounded-full -z-10" />
                        </motion.div>

                    </div>
                </Container>
            </section>

            {/* ─── SPLIT BOXES ─── */}
            <section className="grid md:grid-cols-2">
                <div className="bg-red-600 text-white p-16 md:p-24 flex flex-col justify-center items-start space-y-8 relative overflow-hidden">
                    <Layout className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10" />
                    <div className="text-6xl font-serif opacity-20 leading-none">"</div>
                    <h3 className="text-4xl font-bold max-w-md leading-tight">Advanced Building Management Systems</h3>
                    <p className="text-white/80 leading-relaxed max-w-lg">
                        Intersys Solutions provides intelligent Building Management Systems that optimize comfort, safety,
                        and energy efficiency. With our expertise and Honeywell-authorized technology, we help building
                        owners take control of their facilities with ease and reliability.
                    </p>
                </div>
                <div className="bg-[#1A3263] text-white p-16 md:p-24 flex flex-col justify-center items-start space-y-8 relative overflow-hidden">
                    <Database className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10" />
                    <div className="text-6xl font-serif opacity-20 leading-none">"</div>
                    <h3 className="text-4xl font-bold max-w-md leading-tight">Comprehensive IT Infrastructure</h3>
                    <p className="text-white/80 leading-relaxed max-w-lg">
                        Intersys Solutions Co., Ltd offers comprehensive IT infrastructure solutions tailored to the unique
                        needs of your business. From cloud computing and network infrastructure to cybersecurity and data
                        management, we deliver reliable solutions that empower your organization to thrive in the digital era.
                    </p>
                </div>
            </section>

            {/* ─── HONEYWELL DISTRIBUTOR ─── */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-gray-50 p-12 rounded-2xl border border-gray-100">
                        <div className="space-y-6 max-w-2xl">

                            <h2 className="text-4xl font-bold text-[#1A3263]">Honeywell Engineering System Distributor</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Intersys Solutions Co., Ltd delivers comprehensive IT and ELV infrastructure solutions
                                tailored to the unique demands of modern businesses. As an official Engineering System
                                Distributor for Honeywell, we integrate world-class technologies with local expertise to
                                ensure the highest standards of automation, safety, and efficiency.
                            </p>
                        </div>
                        <div className=" p-10 ">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Honeywell_logo.svg/1280px-Honeywell_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="Honeywell Logo" className="h-12 w-auto object-contain" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* ─── VALUE OF NIAGARA ─── */}
            <section className="py-28 bg-[#0A0F1A] text-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full -z-10" />
                <Container>
                    <div className="text-center mb-20 space-y-5">

                        <h2 className="text-3xl md:text-4xl font-bold">The Value of Niagara</h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-md">
                            Make device connectivity and application development simple and efficient.
                        </p>
                    </div>

                    {/* Niagara feature cards */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {[
                            {
                                image: "https://static.thenounproject.com/png/165980-200.png",
                                title: "Device Connectivity",
                                desc: "Seamlessly connect and manage devices across your network with Niagara's powerful connectivity framework."
                            },
                            {
                                image: "https://cdn-icons-png.flaticon.com/512/562/562626.png",
                                title: "Efficient Development",
                                desc: "Build powerful applications faster with Niagara's streamlined development tools and intuitive framework."
                            }
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="p-8 bg-white/5 border border-white/10 rounded-xl space-y-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>

                                <h4 className="font-bold text-white text-lg">
                                    {card.title}
                                </h4>

                                <p className="text-white/50 text-sm leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 border border-white/10 p-4 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <img src="https://uploads.onecompiler.io/42e6qwqtt/4463hvbwt/2.png" alt="The Solution" className="w-full h-auto rounded-xl" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 border border-white/10 p-4 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <img src="https://uploads.onecompiler.io/42e6qwqtt/4463hvbwt/1.png" alt="The Problem" className="w-full h-auto rounded-xl" />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ─── BMS FIELD DEVICES ─── */}
            <section className="py-20 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="max-w-xl mb-12 space-y-3">
                        <h2 className="text-3xl font-bold text-[#1A3263]">
                            BMS Field Devices
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Hardware engineered for accuracy. From damper solutions to hydronic balancing,
                            we provide the physical components that bring data to life.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                        {[
                            {
                                title: "Damper Solution",
                                imgs: [
                                    "https://static.wixstatic.com/media/3d5958_4102735087654d29a18eb02607645054~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_2bdfd4fbec4e4b27a3817a5848fa7b8d~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_2d4a184d3fe241a88937bb3f41a31d5e~mv2.png"
                                ]
                            },
                            {
                                title: "Hydronic Balancing",
                                imgs: [
                                    "https://static.wixstatic.com/media/3d5958_d6cb776d19b24fc6a48e5ffedd0324fb~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_9b5036f315d447319351826c00a6b2e2~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_5d22aed03e684b11af8173e5d876ec84~mv2.png"
                                ]
                            },
                            {
                                title: "HVAC Controls",
                                imgs: [
                                    "https://static.wixstatic.com/media/3d5958_9985ce1b314e4caf9608fc2e8f0a4e45~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_b26066ec2a624cebbea192b26ff0b09a~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_8676379a2153420c88543906ce4806f9~mv2.png"
                                ]
                            },
                            {
                                title: "Plumbing",
                                imgs: [
                                    "https://static.wixstatic.com/media/3d5958_430b097dcb3c48679cf11b7e8f8bb0c8~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_22ea7c4b173a47958f9d420a5279bffe~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_45fcae7078954288ac7799d9710b979e~mv2.png"
                                ]
                            },
                            {
                                title: "Sensors",
                                imgs: [
                                    "https://static.wixstatic.com/media/3d5958_a85ffab69748490a8942623992defc77~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_01cf937e2e31452b987172c278ebf4d1~mv2.png",
                                    "https://static.wixstatic.com/media/3d5958_284f99e86b9842a3ad41a10845510d25~mv2.png"
                                ]
                            },
                            {
                                title: "BTU",
                                imgs: [
                                    "https://static.wixstatic.com/media/3d5958_c97fbe455b274efdad5c64db369f421c~mv2.png"
                                ]
                            }
                        ].map((device, i) => (
                            <div
                                key={i}
                                className="group bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-[#1A3263] hover:border-[#1A3263] transition-all duration-300"
                            >

                                {/* TITLE */}
                                <p className="text-xs font-medium mb-4 text-center text-[#1A3263] group-hover:text-white transition-colors">
                                    {device.title}
                                </p>

                                {/* BIGGER IMAGE GRID */}
                                <div className="grid grid-cols-3 gap-3 place-items-center">
                                    {device.imgs.map((url, j) => (
                                        <div key={j} className="flex items-center justify-center">
                                            <img
                                                src={url}
                                                alt={device.title}
                                                className="h-12 md:h-14 object-contain transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </Container>
            </section>

            {/* ─── HVAC & ENERGY CONTROL ─── */}
            <section className="py-28 bg-[#F2F2F2]">
                <Container>
                    {/* Header row — title left, subtitle right */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
                        <h2 className="text-4xl font-bold text-[#1A3263] shrink-0">
                            HVAC & <span className="text-red-600">Energy Control</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Intelligent automation for optimal comfort and efficiency.
                        </p>
                    </div>

                    {/* Top row — white | dark navy | white */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-8 rounded-xl space-y-4 border border-gray-100">
                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-sm flex items-center justify-center">
                                <SlidersHorizontal size={18} />
                            </div>
                            <h4 className="text-lg font-bold text-[#1A3263]">Automated Control</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Honeywell's intelligent platforms automatically adjust temperature, ventilation, and energy
                                usage based on real-time conditions, reducing costs while maintaining comfort.
                            </p>
                        </div>

                        <div className="bg-[#1A3263] p-8 rounded-xl space-y-4">
                            <div className="w-10 h-10 bg-white/10 text-white rounded-sm flex items-center justify-center">
                                <Activity size={18} />
                            </div>
                            <h4 className="text-lg font-bold text-white">Real-time Monitoring</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Monitor energy usage, HVAC performance, and system health in real time with intuitive
                                dashboards, enabling fast decisions and preventing downtime.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl space-y-4 border border-gray-100">
                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-sm flex items-center justify-center">
                                <Settings size={18} />
                            </div>
                            <h4 className="text-lg font-bold text-[#1A3263]">Customized Solutions</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We design scalable systems tailored to your building needs, including climate control,
                                humidity regulation, and seamless system integration.
                            </p>
                        </div>
                    </div>

                    {/* Bottom row — Expert Support (1/3) | Real-Time Intelligence (2/3) */}
                    <div className="grid md:grid-cols-3 gap-6 items-stretch">
                        {/* LEFT (1 Col) */}
                        <div className="group bg-white p-7 rounded-xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 h-full">
                            <div className="w-11 h-11 bg-red-50 text-red-500 rounded-sm flex items-center justify-center">
                                <Shield size={18} />
                            </div>
                            <h4 className="text-lg font-bold text-[#1A3263]">Expert Support</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                As an authorized Honeywell distributor in Cambodia, we provide full lifecycle support —
                                from design and installation to maintenance and upgrades.
                            </p>
                        </div>

                        {/* RIGHT (2 Cols - Takes remaining space) */}
                        <div className="md:col-span-2 group bg-white p-7 rounded-xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">

                            <div className="flex gap-8 h-full">

                                {/* TEXT (FIXED WIDTH) */}
                                <div className="w-[360px] space-y-5 flex flex-col justify-center">

                                    <h4 className="text-xl font-bold text-[#1A3263]">
                                        Real-Time Intelligence
                                    </h4>

                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Critical data is collected, analyzed, and visualized in real time,
                                        enabling faster decisions and operational awareness.
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {["Centralized Control", "Real-Time Alerts", "Seamless Integration"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-50 border border-gray-200 text-[#1A3263]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                </div>

                                {/* IMAGE (TAKES REMAINING SPACE) */}
                                <div className="relative flex-1 rounded-xl overflow-hidden min-h-[260px]">

                                    <img
                                        src="https://static.wixstatic.com/media/3d5958_888336e6fc4e4b4eade3511d56bac693~mv2.png"
                                        alt="BMS Dashboard"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            {/* ─── PRODUCT SOLUTIONS ─── */}
            <section className="py-28 bg-white border-t border-gray-100">
                <Container>
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-4xl font-bold text-[#1A3263]">
                                Enterprise <span className="text-red-600">Product Solutions</span>
                            </h2>
                            <p className="text-gray-500 leading-relaxed">
                                Our comprehensive BMS portfolio features state-of-the-art Honeywell technologies designed for high-performance building automation and critical system management.
                            </p>
                        </div>

                        <Link
                            to="/products/building-management"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3263] text-white rounded-lg font-bold text-sm hover:bg-[#25417e] transition shadow-lg"
                        >
                            View Full Catalog <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <BuildingManagementGrid products={bmsProducts} />
                </Container>
            </section>


            {/* ─── SEAMLESS BMS INTEGRATION ─── */}
            <section className="py-28 bg-white">
                <Container>

                    {/* HEADER */}
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
                        <h2 className="text-4xl font-bold text-[#1A3263]">
                            Seamless BMS Integration
                        </h2>

                        <p className="text-gray-500 text-lg leading-relaxed">
                            Create a comfortable and safe environment for your building by centrally controlling and
                            monitoring all vital systems.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                        {[
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/2344/2344579.png",
                                title: "CCTV Surveillance",
                                desc: "Real-time monitoring and recording."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/702/702814.png",
                                title: "Smart Lighting",
                                desc: "Automated efficiency control."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
                                title: "Security & Safety",
                                desc: "24/7 asset protection systems."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/3524/3524636.png",
                                title: "Access Control",
                                desc: "Secure entry points management."
                            },
                            {
                                icon: "https://png.pngtree.com/png-vector/20230419/ourmid/pngtree-fire-alarm-line-icon-vector-png-image_6714983.png",
                                title: "Fire Alarms",
                                desc: "Early detection safety systems."
                            },
                            {
                                icon: "https://static.vecteezy.com/system/resources/thumbnails/021/013/590/small/icon-of-energy-thunder-lightning-bolt-symbol-or-electricity-power-electric-sign-symbol-free-png.png",
                                title: "Energy Management",
                                desc: "Consumption optimization."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/230/230531.png",
                                title: "Elevator Control",
                                desc: "Vertical transport logic."
                            },
                            {
                                icon: "https://cdn-icons-png.flaticon.com/512/1129/1129846.png",
                                title: "Energy Meters",
                                desc: "Precise utility tracking."
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group bg-gray-50 p-7 rounded-xl border border-gray-100 flex flex-col items-center text-center space-y-3 hover:border-red-500 hover:bg-red-50/30 transition-all duration-300"
                            >

                                {/* ICON */}
                                <div className="w-12 h-12  flex items-center justify-center  group-hover:shadow-md transition-all duration-300">
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>

                                {/* TITLE */}
                                <h4 className="font-bold text-[#1A3263] text-sm">
                                    {item.title}
                                </h4>

                                {/* DESCRIPTION */}
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    {item.desc}
                                </p>

                            </div>
                        ))}

                    </div>
                </Container>
            </section>

            {/* ─── PORTFOLIO GALLERY ─── */}
            <section className="py-10 px-6">
                <div className="grid md:grid-cols-4 gap-4">

                    {/* MAIN CARD */}
                    <div className="md:col-span-2 bg-[#1A3263] p-8 rounded-md text-white flex flex-col justify-between min-h-[320px]">

                        <div className="space-y-3">


                            <h3 className="text-2xl font-bold leading-snug">
                                Basic development platform to connect, operate and manage different protocols, networks, devices.
                            </h3>
                        </div>

                        <div className="pt-6 space-y-4">
                            <p className="text-white/50 uppercase tracking-widest text-[10px]">
                                Customizing intelligence for diverse operational environments.
                            </p>

                            <Link to="/projects" className="inline-block px-6 py-2.5 bg-red-600 rounded-sm font-semibold text-xs hover:bg-red-700 transition">
                                Explore Projects
                            </Link>
                        </div>
                    </div>

                    {/* CARD 1 */}
                    <div className="h-[320px] rounded-md overflow-hidden relative group">
                        <img
                            src="https://www.intersys-solutions.com/website_asset/support.jpg"
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white font-semibold text-xs">
                            Data Center
                        </div>
                    </div>

                    {/* CARD 2 */}
                    <div className="h-[320px] rounded-md overflow-hidden relative group">
                        <img
                            src="https://www.intersys-solutions.com/website_asset/BMS_image2.JPG"
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white font-semibold text-xs">
                            Industrial
                        </div>
                    </div>

                    {/* CARD 3 */}
                    <div className="md:col-span-2 h-[320px] rounded-md overflow-hidden relative group">
                        <img
                            src="https://www.intersys-solutions.com/website_asset/room.jpg"
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white font-semibold text-xs">
                            Smart Cities and Government
                        </div>
                    </div>

                    {/* CARD 4 */}
                    <div className="md:col-span-2 h-[320px] rounded-md overflow-hidden relative group">
                        <img
                            src="https://www.intersys-solutions.com/website_asset/office.jpg"
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white font-semibold text-xs">
                            Building Automation and Office Space
                        </div>
                    </div>

                </div>
            </section>
            {/* ─── ADVANCED MONITORING PLATFORMS ─── */}
            <section className="py-28 bg-white">
                <Container>
                    <div className="text-center mb-20 space-y-4">

                        <h2 className="text-4xl font-bold text-[#1A3263]">Advanced Monitoring Platforms</h2>
                        <div className="w-20 h-1 bg-red-600 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Central Monitoring",
                                desc: "We integrate Honeywell's enterprise-grade systems like EBI and Niagara Framework to centralize control over multiple building technologies.",
                                icon: Globe,
                                dark: false
                            },
                            {
                                title: "Cybersecurity",
                                desc: "Secure your infrastructure. With Honeywell's robust protocols, monitoring and reporting can be accessed safely from anywhere, at any time.",
                                icon: Lock,
                                dark: true
                            },
                            {
                                title: "Data Analytics",
                                desc: "We integrate Honeywell's enterprise-grade systems like EBI and Niagara Framework to centralize control over multiple building technologies.",
                                icon: BarChart3,
                                dark: true
                            },
                            {
                                title: "Cloud Services",
                                desc: "Experience true flexibility. With Honeywell's cloud-based solutions, critical monitoring and reporting can be accessed remotely 24/7.",
                                icon: Cloud,
                                dark: false
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-10 rounded-md space-y-6 ${card.dark ? "bg-[#1A3263] text-white" : "bg-gray-50 border border-gray-100"}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.dark ? "bg-white/10" : "bg-white border border-gray-100 shadow-sm"}`}>
                                    <card.icon size={22} className="text-red-600" />
                                </div>
                                <h4 className={`text-2xl font-bold ${card.dark ? "text-white" : "text-[#1A3263]"}`}>{card.title}</h4>
                                <p className={`leading-relaxed text-sm ${card.dark ? "text-white/60" : "text-gray-500"}`}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ─── BMS DASHBOARD ─── */}
            <section className="py-28 bg-[#F8F9FA] overflow-hidden">
                <Container>
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1A3263] text-left">
                            BMS Dashboard
                        </h2>
                    </div>

                    <div className="relative h-[400px] md:h-[600px] w-full max-w-6xl mx-auto">

                        {/* BACK IMAGE (Large Dashboard - Right) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute right-0 top-0 w-[75%] md:w-[70%] z-0"
                        >
                            <img
                                src="https://static.wixstatic.com/media/3d5958_1eb280653fcc43ceb2d5f13c048239ef~mv2.png"
                                alt="BMS Remote Manager"
                                className="w-full h-auto rounded-xl md:rounded-2xl shadow-xl border border-gray-100"
                            />
                        </motion.div>

                        {/* FRONT IMAGE (Monitor - Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute left-0 bottom-0 w-[65%] md:w-[60%] z-20"
                        >
                            <img
                                src="https://static.wixstatic.com/media/3d5958_888336e6fc4e4b4eade3511d56bac693~mv2.png"
                                alt="BMS Energy Overview"
                                className="w-full h-auto rounded-xl md:rounded-2xl"
                            />
                        </motion.div>

                        {/* MOBILE IMAGE (Center/Front) */}


                    </div>
                </Container>
            </section>


        </div>
    );
}
