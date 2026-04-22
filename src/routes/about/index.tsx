import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container } from "@/components/site/Container";
import { Rocket, Eye, Shield, CheckCircle2 } from "lucide-react";
import { WhyChooseUs } from "@/components/site/SolutionsExpandableGrid";
import ceoImg from "@/assets/team/ceo.png";
import team1 from "@/assets/team/team1.png";
import team2 from "@/assets/team/team2.png";
import team3 from "@/assets/team/team3.png";
import team4 from "@/assets/team/team4.png";
import heroImg from "@/assets/hero.jpg";
import honeywellLogo from "@/assets/honeywelllogo.png";

export const Route = createFileRoute("/about/")({
    head: () => ({
        meta: [
            { title: "About Us — Intersys Solutions" },
            {
                name: "description",
                content: "Engineering the future of infrastructure. Learn about our mission, vision, and the team behind Cambodia's premier technology integrator.",
            },
        ],
    }),
    component: AboutPage,
});

const values = [
    {
        icon: Rocket,
        title: "Our Mission",
        desc: "To architect resilient, scalable, and intelligent digital ecosystems that empower businesses to operate with unprecedented precision and efficiency.",
    },
    {
        icon: Eye,
        title: "Our Vision",
        desc: "To be Cambodia’s most trusted provider of smart, safe, and sustainable building technology solutions.",
    },
    {
        icon: Shield,
        title: "Core Values",
        desc: "Integrity by design, relentless innovation, and a commitment to engineering excellence that transcends temporary trends.",
    },
];

const evolution = [
    {
        year: "2015",
        title: "Foundation",
        desc: "Introduced high-end building management System (BMS) solutions with global brands and strengthened operations across commercial building, industry, hospitality, education, and public sectors.",
        status: "completed" as const
    },
    {
        year: "2018",
        title: "Scale",
        desc: "Expanded engineering team and project capacity to enter larger-scale projects, integrating complex access control, surveillance, and PA systems.",
        status: "completed" as const
    },
    {
        year: "2021",
        title: "Diversified",
        desc: "Mission to deliver advanced ELV systems, starting with core services in fire detection and alarm systems and security systems.",
        status: "current" as const
    },
    {
        year: "2025",
        title: "Market Leadership",
        desc: "Positioned as the trusted leader in ELV integration through enhanced digital platforms, with a strategic focus on energy efficiency, BMS, and smart building solutions.",
        status: "future" as const
    },
];

const team = [
    { name: "Elena Vance", role: "Lead Systems Engineer", img: team1, bio: "Expert in high-density network architecture and automated systems integration." },
    { name: "Marcus Sterling", role: "Senior Project Manager", img: team2, bio: "Over 15 years of experience delivering multi-million dollar infrastructure projects." },
    { name: "Sarah Chen", role: "Head of Digital Strategy", img: team3, bio: "Specializes in digital transformation and cloud-native structural implementations." },
    { name: "David Miller", role: "Chief Technical Architect", img: team4, bio: "The visionary behind our core proprietary automation frameworks and security protocols." },
];

function AboutPage() {
    return (
        <div className="bg-white overflow-x-hidden text-sm">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#0A0F1A] overflow-hidden flex items-center justify-center min-h-[60vh]">
                <div className="absolute inset-0">
                    <img
                        src={heroImg}
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/80 via-[#0A0F1A]/40 to-[#0A0F1A]" />
                </div>

                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            src={honeywellLogo}
                            alt="Honeywell Authorized Partner"
                            className="h-8 md:h-10 mb-8 invert grayscale brightness-200"
                        />
                        <h1 className="text-4xl lg:text-5xl font-bold text-white font-display leading-[1.2] mb-6">
                            About <span className="text-red-600">Intersys</span> Solutions.
                        </h1>
                        <p className="text-base text-gray-300 max-w-2xl leading-relaxed mx-auto">
                            As Cambodia's premier authorized Honeywell partner since 2015, Intersys Solutions delivers international-standard building automation, security, and fire safety systems to meet the surging demands of the local construction sector.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Mission/Vision Section */}
            <section className="py-16 bg-[#F8F9FA]">
                <Container>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1, type: "spring", damping: 20 }}
                                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-500">
                                    <v.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0A0F1A] mb-3 font-display">{v.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {v.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Evolution Section */}
            <section className="py-16 bg-[#05080F] text-white overflow-hidden">
                <Container>
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold font-display">Our Evolution</h3>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Timeline Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block" />

                        <div className="grid md:grid-cols-4 gap-8 relative z-10">
                            {evolution.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.1, type: "spring", damping: 20 }}
                                    className="text-center md:text-left"
                                >
                                    <div className="flex flex-col items-center md:items-start">
                                        <div className={item.status === 'completed' ? 'text-red-500' : item.status === 'current' ? 'text-blue-400' : 'text-gray-600'}>
                                            <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center mb-4 mx-auto md:mx-0 bg-[#05080F]">
                                                {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                            </div>
                                        </div>
                                        <span className="text-2xl font-display font-bold mb-1">{item.year}</span>
                                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-[13px] leading-relaxed max-w-[240px] mx-auto md:mx-0">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Leadership Section */}
            <section className="py-16 bg-white overflow-hidden">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring", damping: 20 }}
                            className="relative"
                        >
                            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-red-600" />
                            <img
                                src={ceoImg}
                                alt="CEO"
                                className="rounded-xl shadow-xl grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover max-w-[320px] mx-auto lg:mx-0"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring", damping: 20 }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold font-display text-[#0A0F1A] leading-tight mb-6">
                                Engineering excellence isn't a goal, it's a standard of living.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed mb-6 italic">
                                "We built Intersys on the principle that the most complex problems require the most elegant, invisible solutions. Every project we undertake is a testament to our commitment to structural intelligence."
                            </p>
                            <div>
                                <h4 className="text-lg font-bold text-[#0A0F1A]">Nathaniel Thorne</h4>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-[#F1F3F5] overflow-hidden">
                <Container>
                    <div className="mb-12 text-center lg:text-left">
                        <h3 className="text-3xl font-bold font-display text-[#0A0F1A]">The Architects</h3>
                        <div className="w-10 h-1 bg-red-600 mt-4 mx-auto lg:mx-0" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1, type: "spring", damping: 20 }}
                                className="group"
                            >
                                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500">
                                    <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <h4 className="text-base font-bold text-[#0A0F1A]">{member.name}</h4>
                                    <p className="text-[11px] text-red-600 mt-0.5 mb-2 font-semibold">
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <WhyChooseUs />
        </div>
    );
}
