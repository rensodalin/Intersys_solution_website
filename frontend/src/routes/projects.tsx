import { useState, useMemo, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/Common/CtaBand";

// Components
import { ProjectHero } from "@/components/Project/ProjectHero";
import { ProjectFilters } from "@/components/Project/ProjectFilters";
import { ProjectGrid } from "@/components/Project/ProjectGrid";
import { Project } from "@/components/Project/types";

// Data

export const Route = createFileRoute("/projects")({
    head: () => ({
        meta: [
            { title: "Our Projects — Intersys Solutions" },
            {
                name: "description",
                content: "Explore our complete portfolio of elite engineering and smart building system installations.",
            },
        ],
    }),
    component: ProjectsPage,
});

function ProjectsPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "full">("full");
    const [projectsList, setProjectsList] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const baseUrl = `http://${window.location.hostname}:5000`;

                // Fetch both Projects and Insights
                const [projRes, insRes] = await Promise.all([
                    fetch(`${baseUrl}/api/projects`),
                    fetch(`${baseUrl}/api/insights`)
                ]);

                let combined: Project[] = [];

                if (projRes.ok) {
                    const projData = await projRes.json();
                    if (projData.success) {
                        combined = [...projData.data];
                    }
                } else {
                    console.error("Projects API failed:", projRes.status, projRes.statusText);
                }

                if (insRes.ok) {
                    const insData = await insRes.json();
                    if (insData.success) {
                        // Map insights to Project format
                        const insightProjects: Project[] = insData.data.map((item: any) => {
                            const scope = [];
                            if (item.technicalTitle) scope.push(item.technicalTitle);
                            if (item.feature1Title) scope.push(item.feature1Title);
                            if (item.feature2Title) scope.push(item.feature2Title);

                            return {
                                _id: item._id,
                                title: item.title,
                                desc: item.desc,
                                image: item.image[0],
                                category: item.category,
                                client: item.author || "Intersys Solutions",
                                location: item.location || "Phnom Penh, Cambodia",
                                scope: scope.length > 0 ? scope : ["System Integration", "Smart Solutions"],
                                slug: item.slug
                            };
                        });

                        // Add insights to combined list, avoiding duplicates by title
                        combined = [...combined, ...insightProjects.filter(ip =>
                            !combined.some(cp => cp.title === ip.title)
                        )];
                    }
                }

                setProjectsList(combined);
            } catch (err) {
                    console.error("Failed to fetch project data:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, []);

    const filteredProjects = useMemo(() => {
        return activeTab === "All" ? projectsList : projectsList.filter((p) => p.category === activeTab);
    }, [activeTab, projectsList]);

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <ProjectHero />

            <ProjectFilters
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {loading ? (
                <div className="flex items-center justify-center py-32">
                    <div className="w-10 h-10 border-4 border-[#D62828] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <ProjectGrid
                    projects={filteredProjects}
                    viewMode={viewMode}
                />
            )}


        </div>
    );
}