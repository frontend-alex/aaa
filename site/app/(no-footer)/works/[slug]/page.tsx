import NotFound from "@/app/not-found";
import PageClient from "./pageClient";

import { slugify } from "@/lib/utils";
import { projectsData } from "@/constants/data";


export default async function Works({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    const projectIndex = projectsData.findIndex(
        (project) => slugify(project.title) === slug
    );

    if (projectIndex === -1) return <NotFound />

    const project = projectsData[projectIndex];
    const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

    return <PageClient project={project} nextProject={nextProject} />
}
