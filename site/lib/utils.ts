import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return () => {
    hash = (hash * 16807 + 0) % 2147483647;
    return (hash & 0x7fffffff) / 2147483647;
  };
}

export function groupImages(images: string[], seed: string): string[][] {
  const rng = seededRandom(seed);
  const groups: string[][] = [];
  let i = 0;
  while (i < images.length) {
    if (i + 1 < images.length && rng() < 0.4) {
      groups.push([images[i], images[i + 1]]);
      i += 2;
    } else {
      groups.push([images[i]]);
      i += 1;
    }
  }
  return groups;
}
