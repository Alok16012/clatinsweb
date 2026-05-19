'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    exam: 'CLAT 2026',
    tag: '🏛️ Gateway to Top NLUs',
    heading: 'Crack CLAT with',
    highlight: 'Expert Coaching',
    sub: 'Your gateway to top National Law Universities. Join thousands of successful CLATians who secured their dream college.',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'CLAT 2026',
  },
  {
    exam: 'AILET',
    tag: '⚖️ NLU Delhi Preparation',
    heading: 'Crack AILET with',
    highlight: 'Focused Mentorship',
    sub: "Your path to NLU Delhi — one of India's most prestigious law schools. Expert guidance from NLU Alumni.",
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'AILET',
  },
  {
    exam: 'MH-CET Law',
    tag: '📍 Maharashtra Law Colleges',
    heading: 'Ace MH-CET with',
    highlight: 'Proven Strategies',
    sub: 'Top law colleges in Maharashtra are within your reach. Our MH-CET specialists ensure comprehensive preparation.',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'MH-CET',
  },
  {
    exam: 'CUET 2026',
    tag: '🎓 Top University Entrance',
    heading: 'Prepare for CUET with',
    highlight: 'Complete Guidance',
    sub: 'Gateway to top central universities across India. Comprehensive CUET Law preparation designed for success.',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'CUET',
  },
];

const examPills = ['CLAT', 'AILET', 'MH-CET Law', 'CUET', 'AIL-LET', 'LSAT'];

const heroStats = [
  { val: '15,000+', label: 'Students' },
  { val: '1000+', label: 'NLU Selections' },
  { val: '15+', label: 'Years Experience' },
  { val: '25+', label: 'Expert Faculty' },
];

const mobileSlides = [
  {
    initials: 'AK',
    name: 'A.K. SINGH',
    title: 'Director, IEE CLATians',
    subtitle: 'Founder — "BHARAT that is INDIA"',
    tagline:
      'Empowering CLAT aspirants with legal knowledge, social awareness, and the skills needed for top NLU admissions.',
    features: [
      { icon: '🎯', text: 'Individual Mentorship' },
      { icon: '📊', text: 'Weekly Progress Reports' },
      { icon: '📝', text: 'Unlimited Test-Series' },
    ],
  },
  {
    initials: 'CL',
    name: 'CLAT 2026 BATCH',
    title: 'Now Enrolling — Limited Seats',
    subtitle: 'Offline · Online · Mentorship',
    tagline:
      'Join thousands of CLATians who cracked top NLUs. Expert faculty, comprehensive material, proven results.',
    features: [
      { icon: '🏛️', text: 'Top NLU Selections' },
      { icon: '👨‍🏫', text: '20+ Expert Faculty' },
      { icon: '🏆', text: '5000+ Success Stories' },
    ],
  },
  {
    initials: 'MT',
    name: 'MOCK TEST SERIES',
    title: '150+ Full-Length Mock Tests',
    subtitle: 'CLAT · AILET · MH-CET · CUET',
    tagline:
      'AI-powered analytics, detailed solutions, and national rank predictions. The most comprehensive test series in India.',
    features: [
      { icon: '🤖', text: 'AI-Powered Analytics' },
      { icon: '📈', text: 'National Rank Predictor' },
      { icon: '📄', text: 'Detailed Solutions PDF' },
    ],
  },
  {
    initials: 'NL',
    name: 'NLU COLLEGE PREDICTOR',
    title: 'Know Your Chances Now',
    subtitle: 'Free Tool — Try It Today',
    tagline:
      'Enter your expected CLAT rank and instantly see which of the 23 NLUs you are likely to get into.',
    features: [
      { icon: '🔮', text: 'Rank-Based Prediction' },
      { icon: '🪑', text: 'All 23 NLUs Covered' },
      { icon: '✅', text: 'Category-Wise Results' },
    ],
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  const goTo = (idx: number) => {
    if (idx === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section>
      {/* ─── Desktop Hero ─────────────────────────────────────── */}
      <div
        className="hidden md:block relative overflow-hidden"
        style={{ background: '#0D1837', minHeight: '88vh' }}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: '#08BD80' }}
          />
          <div
            className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-5"
            style={{ background: '#08BD80' }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-5"
            style={{ background: '#ffffff' }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 flex items-center gap-16 relative z-10">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            {/* Exam pill */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: 'rgba(8,189,128,0.2)', border: '1px solid rgba(8,189,128,0.4)' }}
              >
                {slide.pill}
              </span>
              <span className="text-white/60 text-sm">{slide.tag}</span>
            </div>

            {/* Heading */}
            <h1
              className={`font-extrabold text-white leading-tight transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
              style={{ fontSize: '2.75rem' }}
            >
              {slide.heading}
              <br />
              <span style={{ color: '#08BD80' }}>{slide.highlight}</span>
            </h1>

            <p
              className={`mt-6 text-lg leading-relaxed max-w-md transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              style={{ color: 'rgba(255,255,255,0.70)' }}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href={slide.ctaLink}
                className="px-7 py-3.5 rounded-xl font-bold text-white text-base shadow-lg hover:opacity-90 transition-all duration-200"
                style={{ background: '#08BD80' }}
              >
                {slide.cta} →
              </a>
              <a
                href="#demo"
                className="px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-white/10 transition-all"
                style={{ color: 'white', border: '1px solid rgba(255,255,255,0.35)' }}
              >
                {slide.secondaryCta}
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex items-center gap-0 flex-wrap">
              {heroStats.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className="text-center px-5 first:pl-0">
                    <div className="text-2xl font-black text-white">{s.val}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {s.label}
                    </div>
                  </div>
                  {i < heroStats.length - 1 && (
                    <div className="w-px h-8 mx-1" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Exam selector card */}
          <div className="flex-1 max-w-sm">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Choose Your Exam</h3>
              <div className="space-y-2.5">
                {examPills.map((exam) => (
                  <a
                    key={exam}
                    href="#exams"
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer group transition-all hover:scale-[1.02]"
                    style={{
                      background:
                        exam === slides[current].pill
                          ? '#08BD80'
                          : 'rgba(255,255,255,0.08)',
                      border: `1px solid ${
                        exam === slides[current].pill
                          ? '#08BD80'
                          : 'rgba(255,255,255,0.1)'
                      }`,
                    }}
                  >
                    <span className="text-white font-semibold text-sm">{exam}</span>
                    <svg
                      className="w-4 h-4 text-white/60 group-hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                ))}
              </div>
              <a
                href="#admission"
                className="mt-4 block text-center py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
                style={{ background: '#08BD80' }}
              >
                Get Free Counselling
              </a>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                background: i === current ? '#08BD80' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Mobile Hero ─────────────────────────────────────── */}
      <div className="md:hidden relative overflow-hidden" style={{ background: '#0D1837', minHeight: '100svh' }}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: '#08BD80', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-5" style={{ background: '#08BD80', transform: 'translate(-30%, 0)' }} />

        <div className="relative z-10 px-5 pt-8 pb-6 flex flex-col" style={{ minHeight: '100svh' }}>

          {/* Top badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80', border: '1px solid rgba(8,189,128,0.35)' }}>
              🏛️ {slide.pill} 2026
            </span>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{slide.tag}</span>
          </div>

          {/* Heading */}
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <h1 className="font-black text-white leading-tight" style={{ fontSize: '2rem', lineHeight: '1.15' }}>
              {slide.heading}<br />
              <span style={{ color: '#08BD80' }}>{slide.highlight}</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '85%' }}>
              {slide.sub}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-6">
            <a href={slide.ctaLink}
              className="flex-1 text-center py-3.5 rounded-xl font-bold text-white text-sm shadow-lg"
              style={{ background: '#08BD80' }}>
              {slide.cta} →
            </a>
            <a href="tel:8507700177"
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm"
              style={{ color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-6 grid grid-cols-4 gap-0 py-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {heroStats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex-1 text-center">
                  <div className="text-base font-black text-white">{s.val}</div>
                  <div className="text-[9px] mt-0.5 leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                </div>
                {i < heroStats.length - 1 && <div className="w-px h-7 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }} />}
              </div>
            ))}
          </div>

          {/* Exam quick-pick cards */}
          <div className="mt-6 flex-1">
            <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Choose Your Exam</p>
            <div className="grid grid-cols-3 gap-2">
              {['CLAT', 'AILET', 'MH-CET', 'CUET', 'AIL-LET', 'LSAT'].map((exam) => (
                <a key={exam} href={`/exams/${exam.toLowerCase().replace('-', '-')}`}
                  className="flex items-center justify-center py-2.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: exam === slide.pill ? '#08BD80' : 'rgba(255,255,255,0.08)',
                    color: exam === slide.pill ? 'white' : 'rgba(255,255,255,0.7)',
                    border: `1px solid ${exam === slide.pill ? '#08BD80' : 'rgba(255,255,255,0.1)'}`,
                  }}>
                  {exam}
                </a>
              ))}
            </div>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? '24px' : '6px', height: '6px', background: i === current ? '#08BD80' : 'rgba(255,255,255,0.25)' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
