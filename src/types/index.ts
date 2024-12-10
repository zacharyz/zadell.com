export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  benefits: string[];
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  projectDetails: string;
  budget?: string;
}
