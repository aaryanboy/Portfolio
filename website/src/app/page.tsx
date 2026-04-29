import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <BlogList limit={1} title="Latest Post" />
      <Footer />
    </main>
  );
}
