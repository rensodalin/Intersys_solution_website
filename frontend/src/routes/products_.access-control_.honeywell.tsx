import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { CtaBand } from "@/components/Common/CtaBand";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/products_/access-control_/honeywell")({
    head: () => ({
        meta: [
            { title: "Honeywell Access Control Systems — Intersys" },
            {
                name: "description",
                content: "Explore Honeywell's professional access control lineup. Technical expertise and system integration.",
            },
        ],
    }),
    component: HoneywellProductsPage,
});

const honeywellProducts = [
    {
        title: "Accessories",
        desc: "Essential add-ons like power supplies, cables, and mounting parts to support system setup.",
        image: "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-nx4s1-access-control-controller.png"
    },
    {
        title: "Credentials",
        desc: "Cards, fobs, or mobile IDs used by users to gain access.",
        image: "https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1901440-primaryimage"
    },
    {
        title: "Readers & Keypads",
        desc: "Devices that scan credentials or accept PIN codes at entry points.",
        image: "https://s7d1.scene7.com/is/image/Honeywell65/hbt-Security-P1917930-primaryimage"
    },
    {
        title: "Software",
        desc: "Tools to manage access, monitor activity, and control the system.",
        image: "https://www.sourcesecurity.com/img/products/400/honeywell-access-systems-wppee.jpg"
    },
    {
        title: "Servers",
        desc: "Central systems that store data and run access control operations.",
        image: "https://honeywell.scene7.com/is/image/Honeywell65/HBA-Honeywell-Maxpro-VMS-Sever-RevB-Img1"
    },
    {
        title: "Control Panel Kits",
        desc: "Ready-to-install packages with key components for quick deployment.",
        image: "https://honeywell.scene7.com/is/image/Honeywell65/hbt-security-PRO4000KD4-KIT"
    },
    {
        title: "Lobby Kiosks & Touch Screens",
        desc: "Self-service stations for visitor check-in and access management.",
        image: "https://honeywell.scene7.com/is/image/Honeywell65/HBT-SEC-PWVM21-FrontFacingRightFull"
    },
    {
        title: "System Agreements & Upgrades",
        desc: "Plans and updates to keep the system secure and up to date.",
        image: "https://honeywell.scene7.com/is/image/Honeywell65/hon-ba-fire-gfp-rld-right"
    },
    {
        title: "Door Hardware",
        desc: "Locks and physical devices that secure doors and entry points.",
        image: "https://preview1.assetsadobe.com/is/image/Honeywell65/hon-ba-security-allegion-schlage-grp-1"
    },
    {
        title: "Control Panels",
        desc: "Main units that process access decisions and connect all components.",
        image: "https://honeywell.scene7.com/is/image/Honeywell65/pmt-hps-cph-control-panel-primary-image"
    }
];

function HoneywellProductsPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Header */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-navy-deep">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1470&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30"
                        alt="Honeywell Infrastructure"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/90 to-white" />
                </div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <Link
                            to="/products/access-control"
                            className="group inline-flex items-center gap-2 text-white/40 hover:text-[#9B0F06] transition-all mb-8 text-[10px] font-bold uppercase tracking-[0.2em]"
                        >
                            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                            Back to Access Control
                        </Link>

                        <div className="h-[1px] w-16 bg-[#9B0F06] mb-6" />

                        <h1 className="text-3xl md:text-5xl font-black text-[#1A3263] mb-6 tracking-tighter uppercase italic">
                            Honeywell <span className="text-[#9B0F06]">Systems</span>
                        </h1>

                        <p className="text-navy-deep/60 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                            Industrial-grade security architecture designed for mission-critical infrastructure and enterprise environments.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Product Grid */}
            <section className="pb-24 -mt-12 relative z-20">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {honeywellProducts.map((product, i) => {
                            const cardLink = product.title === "Accessories"
                                ? "/products/access-control/honeywell/accessories"
                                : product.title === "Credentials"
                                    ? "/products/access-control/honeywell/credentials"
                                    : "/contact";

                            return (
                                <motion.div
                                    key={product.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                                    className="group relative"
                                >
                                    <Link
                                        to={cardLink}
                                        className="block bg-white border border-gray-100 p-1.5 rounded-3xl hover:border-[#9B0F06]/20 transition-all duration-500 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-xl group"
                                    >
                                        {/* Image Area */}
                                        <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-gray-50 flex items-center justify-center p-6">
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-contain relative z-10 transition-all duration-500"
                                            />

                                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="h-3 w-[1.5px] bg-[#9B0F06] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                                                <h3 className="text-sm font-bold text-[#162E93] group-hover:text-[#9B0F06] transition-colors leading-tight">
                                                    {product.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-500 text-[11px] leading-relaxed mb-6 h-8 line-clamp-2">
                                                {product.desc}
                                            </p>

                                            <div className="flex items-center justify-between group/btn w-full py-3 px-4 bg-gray-50 rounded-xl text-[#1A3263] font-bold text-[8px] uppercase tracking-[0.2em] group-hover:bg-[#1A3263] group-hover:text-white transition-all duration-300">
                                                <span>{product.title === "Accessories" || product.title === "Credentials" ? "Explore Range" : "Inquire Product"}</span>
                                                <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 text-center"
                    >
                        <div className="inline-flex flex-col items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(n => (
                                    <div key={n} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?u=${n}`} alt="Expert" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#9B0F06] text-white flex items-center justify-center text-[10px] font-bold">
                                    +15
                                </div>
                            </div>
                            <p className="text-gray-400 text-[12px] font-medium">
                                Talk to our <span className="text-[#162E93] font-bold">Honeywell Experts</span> for custom architecture.
                            </p>
                        </div>
                    </motion.div>
                </Container>
            </section>

            <CtaBand />
        </div>
    );
}
