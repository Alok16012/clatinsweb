'use client';
import { useState, useEffect, useRef } from 'react';
import { batches as allBatches } from '@/data/batches';
import { courses } from '@/data/courses';

const catTabs = [
  { key: 'offline',    label: '🏛️ Offline',    color: '#0f3460', accent: '#08BD80' },
  { key: 'online',     label: '💻 Online',      color: '#6d28d9', accent: '#8b5cf6' },
  { key: 'mentorship', label: '🎯 Mentorship',  color: '#065f46', accent: '#34d399' },
  { key: 'mock',       label: '📝 Mock Tests',  color: '#92400e', accent: '#f59e0b' },
] as const;
type CatKey = typeof catTabs[number]['key'];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function CourseCard({ course: c, accent, catColor, idx }: { course: typeof courses[number]; accent: string; catColor: string; idx: number }) {
  const [hov, setHov] = useState(false);
  const courseBatches = allBatches.filter(b => b.courseSlug === c.slug);
  const minFee = courseBatches.length > 0
    ? courseBatches.reduce((min, b) => parseInt(b.fee.replace(/\D/g, '')) < parseInt(min.replace(/\D/g, '')) ? b.fee : min, courseBatches[0].fee)
    : null;
  const openSeats = courseBatches.reduce((sum, b) => sum + (b.seats < 999 ? b.seats - b.filled : 0), 0);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'white', borderRadius: '20px',
        border: '1.5px solid #E9EEF2',
        boxShadow: hov ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'transform .22s ease, box-shadow .22s ease',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animationDelay: `${idx * 0.1}s`,
      }}
    >
      {/* Gradient header */}
      <div style={{ background: `linear-gradient(135deg, ${catColor}, ${accent})`, padding: '22px 20px 18px', position: 'relative' }}>
        <div style={{ fontSize: '38px', marginBottom: '10px' }}>{c.icon}</div>
        <div style={{ color: 'white', fontWeight: 900, fontSize: '18px', lineHeight: 1.25 }}>{c.title}</div>
        {courseBatches.length > 0 && (
          <span style={{
            position: 'absolute', top: '14px', right: '14px',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: '10px', fontWeight: 700,
            padding: '4px 10px', borderRadius: '99px',
          }}>
            {courseBatches.length} batch{courseBatches.length > 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {minFee && (
          <div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, marginBottom: '2px' }}>STARTING FROM</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#0D1837' }}>{minFee}</div>
          </div>
        )}

        {c.includes && c.includes.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {c.includes.slice(0, 4).map(inc => (
              <div key={inc.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span>{inc.label}: <strong>{inc.value}</strong></span>
              </div>
            ))}
          </div>
        )}

        {openSeats > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>{openSeats} seats available</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <a href={`/courses?cat=${c.category}`}
            style={{ flex: 1, textAlign: 'center', padding: '11px', background: `linear-gradient(135deg, ${catColor}, ${accent})`, color: 'white', fontWeight: 700, fontSize: '13px', borderRadius: '12px', textDecoration: 'none' }}>
            View Batches →
          </a>
          <a href="/admission#form"
            style={{ padding: '11px 14px', background: '#F8FAFC', color: '#374151', fontWeight: 600, fontSize: '12px', borderRadius: '12px', textDecoration: 'none', border: '1.5px solid #E9EEF2', whiteSpace: 'nowrap' }}>
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CourseTabsSection() {
  const [activeTab, setActiveTab] = useState<CatKey>('offline');
  const { ref, visible } = useReveal(0.05);

  const getCourses = (key: CatKey) => courses.filter(c => c.category === key).slice(0, 3);
  const activeCat = catTabs.find(t => t.key === activeTab)!;

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'opacity .6s ease, transform .6s ease' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {catTabs.map(t => {
          const isActive = t.key === activeTab;
          const count = getCourses(t.key).length;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{
                padding: '10px 22px', borderRadius: '12px', fontWeight: 700, fontSize: '14px',
                cursor: 'pointer', border: 'none', outline: 'none',
                background: isActive ? `linear-gradient(135deg, ${t.color}, ${t.accent})` : 'white',
                color: isActive ? 'white' : '#374151',
                boxShadow: isActive ? `0 4px 16px ${t.color}44` : '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'all .2s ease',
              }}>
              {t.label}
              <span style={{
                marginLeft: '8px', fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px',
                background: isActive ? 'rgba(255,255,255,0.25)' : '#F3F4F6',
                color: isActive ? 'white' : '#6B7280',
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Course grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {getCourses(activeTab).map((c, i) => (
          <CourseCard key={c.slug} course={c} accent={activeCat.accent} catColor={activeCat.color} idx={i} />
        ))}
      </div>

      {/* View all */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <a href={`/courses?cat=${activeTab}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '14px', fontWeight: 700, color: activeCat.accent,
            textDecoration: 'none', padding: '10px 24px', borderRadius: '12px',
            border: `2px solid ${activeCat.accent}`, transition: 'all .2s ease',
          }}>
          View All {activeCat.label} Batches →
        </a>
      </div>
    </div>
  );
}
