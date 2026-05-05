import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollingBanner from '@/components/ScrollingBanner';
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
      <BlogList title="Skills" sectionId="skills" />
      <ScrollingBanner text="CLEAN CODE ✦ RESPONSIVE DESIGN ✦ REST APIs ✦ GIT ✦ AGILE ✦ PERFORMANCE ✦ ACCESSIBILITY ✦ " />
      <Footer />
    </main>
  );
}
