export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export const blogs: BlogPost[] = [
  {
    id: 'first-blog-post',
    title: 'My Journey in Web Development',
    date: 'March 2026',
    category: 'Experience',
    excerpt: 'Reflecting on how I started with web development and where I am now.',
  },
  {
    id: 'qa-certificate',
    title: '2 Day QA Certificate Experience',
    date: 'April 2026',
    category: 'Certificate',
    excerpt: 'I recently completed a 2-day QA certification. Here is my experience and what I learned...',
  }
];
