import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollingBanner from '@/components/ScrollingBanner';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ScrollingBanner text="GOD ✦ GOD ✦ GOD ✦ GOD ✦ GOD ✦ GOD ✦ GOD ✦ GOD ✦ " />
      <Projects />
      <ScrollingBanner reversed text="NEXT.JS ✦ REACT ✦ TYPESCRIPT ✦ MONGODB ✦ NODE.JS ✦ TAILWIND CSS ✦ EXPRESS ✦ FULL STACK ✦ " />
      <Skills />
      <ScrollingBanner text="CLEAN CODE ✦ RESPONSIVE DESIGN ✦ REST APIs ✦ GIT ✦ AGILE ✦ PERFORMANCE ✦ ACCESSIBILITY ✦ " />
      <BlogList limit={1} title="Latest Post" />
      <Footer />
    </main>
  );
}
