export const NAV_LINKS = [
  {
    name: "Works",
    href: "/works",
  },
  {
    name: "Studio",
    href: "/studio",
  },
  {
    name: "Process",
    href: "/process",
  },
  {
    name: "News",
    href: "/news",
  },
];

export const OFFICE_HOURS = {
  open: 9, // 9 AM
  close: 17, // 5 PM
  timeZone: "Europe/Sofia",
};

export const PROGRESS_STEPS = [
  {
    id: "sketch-design",
    index: "1",
    name: "Sketch Design",
    title: "Sketch Design",
    description:
      "Initial concept exploration through hand-drawn and digital sketches, establishing the project's visual direction, spatial relationships, and architectural intent.",
  },
  {
    id: "design-development",
    index: "2",
    name: "Design Development",
    title: "Design Development",
    description:
      "Refining the approved concept into detailed plans with defined materials, structural systems, and technical specifications that guide the project forward.",
  },
  {
    id: "development-application",
    index: "3",
    name: "Development Application",
    title: "Development Application",
    description:
      "Preparing and submitting all required documentation to regulatory authorities, ensuring compliance with zoning, building codes, and environmental standards.",
  },
  {
    id: "interior-design",
    index: "4",
    name: "Interior Design",
    title: "Interior Design",
    description:
      "Crafting the interior spaces with thoughtful selection of finishes, furnishings, lighting, and layouts that complement the architectural vision and enhance livability.",
  },
  {
    id: "building-approval",
    index: "5",
    name: "Building approval plans + documentation",
    title: "Building Approval",
    description:
      "Producing comprehensive technical drawings and supporting documents required for building permit approval, covering structural, mechanical, and safety requirements.",
  },
  {
    id: "construction-phase",
    index: "6",
    name: "Construction Phase",
    title: "Construction Phase",
    description:
      "On-site execution of the design with continuous quality oversight, coordinating contractors, managing timelines, and resolving challenges to bring the vision to life.",
  },
  {
    id: "construction-plans",
    index: "7",
    name: "Construction plans + documentation",
    title: "Construction Plans",
    description:
      "Delivering final as-built documentation, detailed construction drawings, and project records that serve as a complete reference for the finished build.",
  },
];

export type ProjectProps = {
  title: string;
  category: string;
  year: string;
  location: string;
  src: string;
  images: string[];
};

export const projectsData: ProjectProps[] = [
  {
    title: "S Tower",
    category: "Architecture",
    year: "Present",
    images: [
      "/images/slug/stower/1.jpg",
      "/images/slug/stower/2.jpg",
      "/images/slug/stower/3.jpg",
      "/images/slug/stower/4.jpg",
    ],
    location: "Sofia, Bulgaria",
    src: "/images/gallery/image1.png",
  },
  {
    title: "NV Towers",
    category: "Interior",
    year: "2021",
    location: "Sofia, Bulgaria",
    images: [],
    src: "/images/gallery/image2.png",
  },
  {
    title: "Adora 3",
    category: "Design",
    year: "2021",
    location: "Sofia, Bulgaria",
    images: [
      "/images/slug/adora3/1.jpg",
      "/images/slug/adora3/2.jpg",
      "/images/slug/adora3/3.jpg",
      "/images/slug/adora3/4.jpg",
      "/images/slug/adora3/5.jpg",
    ],
    src: "/images/gallery/image3.png",
  },
  {
    title: "Summer Vila R1",
    category: "Construction",
    year: "2020",
    images: [],
    location: "Sofia, Bulgaria",
    src: "/images/gallery/image4.png",
  },
  {
    title: "Amari Residence",
    category: "Design",
    year: "2023",
    images: [],
    location: "Sofia, Bulgaria",
    src: "/images/gallery/image5.jpg",
  },
  {
    title: "Desizo Monni Building",
    category: "Architecture",
    year: "2018",
    images: [],
    location: "Sofia, Bulgaria",
    src: "/images/gallery/image6.jpg",
  },
];

export const TEAM = [
  {
    name: "Angel Zahariev",
    image: "/images/team/angel.jpg",
    position: "Founder & Manager",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Asen Milev",
    image: "/images/team/asen-milev.jpg",
    position: "Founder & Manager",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Lili Petrova",
    image: "/images/team/lili-petrova.jpg",
    position: "Senior Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Siyka Mitova",
    image: "/images/team/siyka-mitova.jpg",
    position: "Project Leader",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Boryana Kalenva",
    image: "/images/team/boryana-kalenva.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Marina Vasileva",
    image: "/images/team/marina-vasileva.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Yuliyana Markova",
    image: "/images/team/yuliyana-markova.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Boryana Dimova",
    image: "/images/team/boryana-dimova.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Maxim Bakarzhy",
    image: "/images/team/maxim-bakarzhy.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Gancho Ganchev",
    image: "/images/team/gancho-ganchev.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
  {
    name: "Mustafa Mayrulov",
    image: "/images/team/mustafa-mayrulov.jpg",
    position: "Architect",
    additionalInformation: {
      bio: "",
    },
  },
];

export const AWARDS = [
  { year: "2020", project: "project.title.Building15", award: "award.1" },
  { year: "2020", project: "project.title.AA_Architects", award: "award.2" },
  { year: "2019", project: "project.title.Building15", award: "award.3" },
  { year: "2019", project: "project.title.Building15", award: "award.4" },
  { year: "2019", project: "project.title.Richhill", award: "award.5" },
  { year: "2019", project: "project.title.DesizoMonniClub", award: "award.6" },
  { year: "2019", project: "project.title.DesizoMonniCorp", award: "award.7" },
  { year: "2018", project: "project.title.CentralStation", award: "award.8" },
  { year: "2018", project: "project.title.AA_Architects", award: "award.9" },
  { year: "2018", project: "project.title.Building5", award: "award.10" },
  {
    year: "2018",
    project: "project.title.CapitalFortPodium",
    award: "award.11",
  },
  {
    year: "2017",
    project: "project.title.DesizoMonniPleven",
    award: "award.12",
  },
  {
    year: "2017",
    project: "project.title.IntegrationCenter",
    award: "award.13",
  },
  { year: "2016-17", project: "project.title.CapitalFort", award: "award.14" },
  { year: "2016-17", project: "project.title.CapitalFort", award: "award.15" },
  { year: "2016-17", project: "project.title.CapitalFort", award: "award.16" },
  { year: "2015", project: "project.title.CapitalFort", award: "award.17" },
  { year: "2015", project: "project.title.Muzeiko", award: "award.18" },
  { year: "2015", project: "project.title.AA_Architects", award: "award.19" },
  { year: "2015", project: "project.title.DimitrovPleven", award: "award.20" },
  { year: "2014", project: "project.title.Telenor", award: "award.21" },
  { year: "2014", project: "project.title.CapitalFort", award: "award.22" },
  { year: "2011", project: "project.title.CapitalFort", award: "award.23" },
  { year: "2007", project: "project.title.Building5", award: "award.24" },
  { year: "2007", project: "project.title.AA_Architects", award: "award.25" },
];

export const PUBLICATIONS: {
  year: string;
  publication: string;
  article: string;
}[] = [];
