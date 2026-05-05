import blogsData from './blogs.json';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  kicker?: string;
  subHeadline?: string;
  author?: string;
  certificateImage?: string;
  certificateCaption?: string;
  paragraphs?: string[];
  blockquote?: string;
  sectionTitle?: string;
  sectionParagraphs?: string[];
  images?: { src: string; caption: string }[];
  takeaways?: string[];
  eventInfo?: string;
  footerInfo?: string;
}

export const blogs: BlogPost[] = blogsData as BlogPost[];
