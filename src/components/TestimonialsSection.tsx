'use client';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Aman Deep Singh',
    achievement: 'CRACKED CLAT 2024',
    rank: 'AIR 23',
    college: 'NLU Delhi',
    avatar: 'AD',
    quote:
      "CLATians gave me the structure, mentors, and mock tests I needed. The faculty's guidance was exceptional throughout my preparation journey.",
  },
  {
    name: 'Priya Sharma',
    achievement: 'CRACKED CLAT 2024',
    rank: 'AIR 47',
    college: 'NALSAR Hyderabad',
    avatar: 'PS',
    quote:
      'The online program was incredibly flexible. I could study at my own pace while still getting personalized attention from mentors.',
  },
  {
    name: 'Rohan Gupta',
    achievement: 'CRACKED AILET 2024',
    rank: 'AIR 12',
    college: 'NLU Delhi',
    avatar: 'RG',
    quote:
      'AILET preparation at CLATians is top-notch. The specialized mock tests and legal reasoning classes made all the difference.',
  },
  {
    name: 'Sneha Patel',
    achievement: 'CRACKED CLAT 2024',
    rank: 'AIR 89',
    college: 'NLIU Bhopal',
    avatar: 'SP',
    quote:
      "From a small town to a national law university — CLATians made my dream possible. The faculty is truly dedicated to every student's success.",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-8 md:py-14" style={{ background: '#F7F9FB' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-10">
          <h2
            className="text-3xl mb-2"
            style={{ color: '#3C4852', fontWeight: 800 }}
          >
            Success Stories
          </h2>
          <p className="text-base" style={{ color: '#7A8B94' }}>
            Real students, real results. Their success is our pride.
          </p>
        </div>

        {/* Desktop: 2-col featured + grid */}
        <div className="hidden md:block">
          {/* Top row — 2 cards */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {testimonials.slice(0, 2).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          {/* Bottom row — 2 cards */}
          <div className="grid grid-cols-2 gap-5">
            {testimonials.slice(2, 4).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>

        {/* Mobile: tab slider */}
        <div className="md:hidden">
          {/* Active testimonial card */}
          <div
            className="bg-white rounded-xl p-5 mb-4 shadow-sm"
            style={{ borderRadius: '12px' }}
          >
            {/* Quote mark */}
            <div
              className="text-5xl font-black leading-none mb-2 -mt-1"
              style={{ color: '#08BD80' }}
            >
              &ldquo;
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.87)' }}>
              {testimonials[active].quote}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                style={{ background: '#3C4852' }}
              >
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: '#3C4852' }}>
                  {testimonials[active].name}
                </div>
                <div className="text-xs font-semibold" style={{ color: '#08BD80' }}>
                  {testimonials[active].rank} · {testimonials[active].college}
                </div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  background: i === active ? '#08BD80' : '#d1d5db',
                }}
              />
            ))}
          </div>

          {/* Mini list */}
          <div className="space-y-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all"
                style={{
                  borderColor: i === active ? '#08BD80' : '#E9EEF2',
                  background: i === active ? '#E6FAF4' : 'white',
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: '#3C4852' }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: '#3C4852' }}>
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: '#9CA3AF' }}>
                    {t.college}
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: '#E6FAF4', color: '#08BD80' }}
                >
                  {t.rank}
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <div className="text-3xl font-black" style={{ color: '#3C4852' }}>
              12K+
            </div>
            <div className="text-sm mb-3" style={{ color: '#9CA3AF' }}>
              NLU Selections
            </div>
            <a
              href="#"
              className="inline-block px-6 py-2.5 rounded-xl font-bold text-white text-sm"
              style={{ background: '#08BD80' }}
            >
              WATCH ALL SUCCESS STORIES
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="bg-white p-6 card-hover"
      style={{
        borderRadius: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Large green quote mark */}
      <div
        className="text-6xl font-black leading-none mb-2 -mt-2"
        style={{ color: '#08BD80' }}
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: 'rgba(0,0,0,0.87)' }}
      >
        {t.quote}
      </p>

      {/* Footer row */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: '#3C4852' }}
        >
          {t.avatar}
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm" style={{ color: '#3C4852' }}>
            {t.name}
          </div>
          <div className="text-xs font-semibold" style={{ color: '#08BD80' }}>
            {t.rank} · {t.college}
          </div>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: '#E6FAF4', color: '#08BD80' }}
        >
          {t.achievement}
        </span>
      </div>
    </div>
  );
}
