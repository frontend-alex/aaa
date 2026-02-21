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
    name: "Sketch Design",
  },
  {
    name: "Design Development",
  },
  {
    name: "Development Application",
  },
  {
    name: "Interior Design",
  },
  {
    name: "Building approval plans + documentation",
  },
  {
    name: "Construction Phase",
  },
  {
    name: "Construction plans + documentation",
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
