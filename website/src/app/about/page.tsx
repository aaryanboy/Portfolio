import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <BlogList />
      <About />
      <Footer />
    </main>
  );
}
