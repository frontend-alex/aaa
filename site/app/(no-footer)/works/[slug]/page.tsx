import NotFound from "@/app/not-found";
import PageClient from "./pageClient";

import { slugify } from "@/lib/utils";
import { projectsData } from "@/constants/data";


export default async function Works({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    const project = projectsData.find(
        (project) => slugify(project.title) === slug
    );

    if (!project) return <NotFound />


    return <PageClient project={project} />
}