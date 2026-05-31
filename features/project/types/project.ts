import { ProjectImages, ProjectProduct } from "..";

export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  images: ProjectImages[];
  products: ProjectProduct[];
}
