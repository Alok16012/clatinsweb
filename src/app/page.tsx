import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import CourseTabsSection from '@/components/CourseTabsSection';
import ExamsSection from '@/components/ExamsSection';
import FeaturedServices from '@/components/FeaturedServices';
import TestimonialsSection from '@/components/TestimonialsSection';
import FacultySection from '@/components/FacultySection';
import FAQSection from '@/components/FAQSection';
import CollegePredictorSection from '@/components/CollegePredictorSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <section style={{ background: '#F8FAFC', padding: '48px 0 44px' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ background: '#E6FAF4', color: '#08BD80', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '10px' }}>
              OUR PROGRAMS
            </span>
            <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '8px' }}>
              Courses for Every Aspirant
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
              Offline, Online, Mentorship, or Mock Tests — find the right program for your CLAT journey.
            </p>
          </div>
          <CourseTabsSection />
        </div>
      </section>
      <ExamsSection />
      <FeaturedServices />
      <TestimonialsSection />
      <FacultySection />
      <FAQSection />
      <CollegePredictorSection />
      <Footer />
    </main>
  );
}
