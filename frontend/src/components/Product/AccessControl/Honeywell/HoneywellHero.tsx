import { ProductHero } from "../../ProductHero";

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface HoneywellHeroProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    backLink?: string;
    backText?: string;
}

export function HoneywellHero({
    title = "Honeywell Systems",
    subtitle = "Industrial-grade security architecture designed for mission-critical infrastructure.",
    breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Access Control", href: "/products/access-control" },
        { name: "Honeywell", href: "/products/access-control/honeywell" },
    ],
}: HoneywellHeroProps) {
    return (
        <ProductHero
            title={title}
            subtitle={subtitle}
            categoryTag="HONEYWELL CATALOG"
            breadcrumbs={breadcrumbs}
        />
    );
}