import raw from "./projects.json";
export type Project = { slug: string; title: string; desc: string; hue: number; tags: string[]; url: string; badge?: string; points?: string[] };
export const projects = raw as unknown as Project[];
