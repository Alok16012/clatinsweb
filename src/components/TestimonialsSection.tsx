'use client';
import { useState } from 'react';

const testimonials = [
  { name: 'Aman Deep Singh', rank: 'AIR 23', college: 'NLU Delhi', year: 'CLAT 2024', avatar: 'AD', color: '#6366f1', quote: "CLATians gave me the structure, mentors, and mock tests I needed. A.K. Sir's teaching of legal reasoning is absolutely unmatched.", stars: 5 },
  { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR Hyderabad', year: 'CLAT 2024', avatar: 'PS', color: '#ec4899', quote: 'The online program was incredibly flexible. I could study from home while still getting personalized mentorship. Mock test analytics helped me improve 40 ranks.', stars: 5 },
  { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi', year: 'AILET 2024', avatar: 'RG', color: '#f59e0b', quote: 'AILET preparation at CLATians is top-notch. The specialized legal reasoning classes and focused GK sessions made all the difference.', stars: 5 },
  { name: 'Sneha Patel', rank: 'AIR 89', college: 'NLIU Bhopal', year: 'CLAT 2024', avatar: 'SP', color: '#14b8a6', quote: 'From a small town in Bihar to NLIU Bhopal — CLATians made my dream possible. The faculty is truly dedicated to every student.', stars: 5 },
  { name: 'Vikram Mishra', rank: 'AIR 156', college: 'GNLU Gandhinagar', year: 'CLAT 2024', avatar: 'VM', color: '#08BD80', quote: "I was a dropper who had failed CLAT twice. CLATians' personalized approach completely changed my strategy. Third attempt — AIR 156.", stars: 5 },
  { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR Hyderabad', year: 'CLAT 2025', avatar: 'KR', color: '#f97316', quote: 'The study material quality is exceptional. 8 volumes covering every topic in depth. Combined with daily GK sessions, I scored 98/120 in current affairs.', stars: 5 },
  { name: 'Arjun Tiwari', rank: 'AIR 67', college: 'RMLNLU Lucknow', year: 'CLAT 2024', avatar: 'AT', color: '#8b5cf6', quote: "Joined CLATians in Class 11. Two years of consistent preparation with A.K. Sir's guidance. Best decision of my life.", stars: 5 },
  { name: 'Riya Bose', rank: 'AIR 203', college: 'CNLU Patna', year: 'CLAT 2024', avatar: 'RB', color: '#ef4444', quote: 'As a girl from a small family, fees were a concern. CLATians offered scholarship which made it possible. Extremely grateful for the support.', stars: 5 },
];

const rankBadges = [
  { label: 'AIR 1–50', count: '47 students', bg: '#fef3c7', color: '#92400e' },
  { label: 'AIR 51–100', count: '112 students', bg: '#dcfce7', color: '#166534' },
  { label: 'AIR 101–500', count: '389 students', bg: '#e0f2fe', color: '#0369a1' },
  { label: 'NLU Selections', count: '1,000+', bg: '#ede9fe', color: '#5b21b6' },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: '#F7F9FB' }} className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#0D1837' }}>
            15,000+ Students Trust CLATians
          </h2>
          <p className="text-base mb-5" style={{ color: '#7A8B94' }}>
            Real students, real NLU selections. Their success is our greatest achievement.
          </p>

          {/* Count badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {rankBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                style={{ background: b.bg, color: b.color }}
              >
                <span>{b.label}</span>
                <span className="opacity-70">·</span>
                <span>{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: 4-column grid ── */}
        <div className="hidden md:grid grid-cols-4 gap-5 mb-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        {/* ── Mobile: Swipeable slider ── */}
        <div className="md:hidden">
          {/* Card */}
          <div
            className="bg-white rounded-2xl p-5 mb-5"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          >
            {/* College badge top-right + quote mark */}
            <div className="flex items-start justify-between mb-2">
              <div
                className="text-5xl font-black leading-none -mt-2"
                style={{ color: '#08BD80' }}
              >
                &ldquo;
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full ml-2 flex-shrink-0"
                style={{ background: testimonials[active].color + '20', color: testimonials[active].color }}
              >
                {testimonials[active].college}
              </span>
            </div>

            {/* Stars */}
            <div className="text-base mb-2" style={{ color: '#f59e0b' }}>
              {'⭐'.repeat(testimonials[active].stars)}
            </div>

            {/* Quote */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.80)' }}>
              {testimonials[active].quote}
            </p>

            {/* Avatar + info */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: testimonials[active].color }}
              >
                {testimonials[active].avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm" style={{ color: '#0D1837' }}>
                  {testimonials[active].name}
                </div>
                <div className="text-xs" style={{ color: '#08BD80', fontWeight: 600 }}>
                  {testimonials[active].rank} · {testimonials[active].year}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  background: i === active ? '#08BD80' : '#d1d5db',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Mini list for navigation */}
          <div className="space-y-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150"
                style={{
                  borderColor: i === active ? '#08BD80' : '#E9EEF2',
                  background: i === active ? '#E6FAF4' : 'white',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs" style={{ color: '#0D1837' }}>{t.name}</div>
                  <div className="text-[10px]" style={{ color: '#9CA3AF' }}>{t.college}</div>
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
        </div>

        {/* ── Green Stats Bar ── */}
        <div
          className="mt-8 rounded-2xl px-6 py-4 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-center"
          style={{ background: 'linear-gradient(90deg, #06a865, #08BD80)' }}
        >
          {[
            '1000+ NLU Selections',
            '23+ NLUs Covered',
            '15+ Years Track Record',
          ].map((stat, i) => (
            <div key={stat} className="flex items-center gap-4 md:gap-8">
              <span className="text-white font-bold text-sm md:text-base">{stat}</span>
              {i < 2 && (
                <span className="text-white/40 hidden md:inline">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="bg-white flex flex-col relative"
      style={{
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        padding: '20px',
      }}
    >
      {/* Achievement badge top-right */}
      <div
        className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full"
        style={{ background: t.color + '20', color: t.color }}
      >
        {t.college}
      </div>

      {/* Large green quote mark */}
      <div
        className="text-5xl font-black leading-none -mt-1 mb-1"
        style={{ color: '#08BD80' }}
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div className="text-sm mb-2" style={{ color: '#f59e0b' }}>
        {'⭐'.repeat(t.stars)}
      </div>

      {/* Quote text */}
      <p
        className="text-xs leading-relaxed mb-4 flex-1"
        style={{ color: 'rgba(0,0,0,0.78)' }}
      >
        {t.quote}
      </p>

      {/* Footer: avatar + info */}
      <div className="flex items-center gap-2 mt-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ background: t.color }}
        >
          {t.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-xs leading-tight" style={{ color: '#0D1837' }}>
            {t.name}
          </div>
          <div className="text-[10px] font-semibold" style={{ color: '#08BD80' }}>
            {t.rank}
          </div>
          <div className="text-[10px]" style={{ color: '#9CA3AF' }}>
            {t.year}
          </div>
        </div>
      </div>
    </div>
  );
}
