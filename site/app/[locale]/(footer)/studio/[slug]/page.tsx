import NotFound from "@/app/[locale]/not-found";
import PageClient from "./pageClient";

import { slugify } from "@/lib/utils";
import { TEAM } from "@/constants/data";


export default async function StudioWorkers({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    const workersIndex = TEAM.findIndex(
        (project) => slugify(project.name) === slug
    );

    if (workersIndex === -1) return <NotFound />

    const worker = TEAM[workersIndex];
    const nextWorker = TEAM[(workersIndex + 1) % TEAM.length];

    if (!worker) return <NotFound />

    return <PageClient />
}
