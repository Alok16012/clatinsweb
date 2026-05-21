'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { courses } from '@/data/courses';
import { batches, type Batch } from '@/data/batches';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type TabKey = 'offline' | 'online' | 'mentorship' | 'mock';

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'offline', label: 'Offline Course', icon: '🏫' },
  { key: 'online', label: 'Online Course', icon: '💻' },
  { key: 'mentorship', label: 'Mentorship', icon: '🎯' },
  { key: 'mock', label: 'Mock Tests', icon: '📝' },
];

const cardPalettes: Record<string, { from: string; to: string; avatarBg: string }> = {
  'Target Batch':     { from: '#0f3460', to: '#1a6b5c', avatarBg: '#08BD80' },
  'Foundation Batch': { from: '#1e3a5f', to: '#2563eb', avatarBg: '#3b82f6' },
  'Dream Batch':      { from: '#3b1f6b', to: '#7c3aed', avatarBg: '#8b5cf6' },
  'Crash Course':     { from: '#7c1d1d', to: '#c2410c', avatarBg: '#f97316' },
  'Starter Pack':     { from: '#134e2c', to: '#15803d', avatarBg: '#22c55e' },
  'Pro Pack':         { from: '#1e3a8a', to: '#1d4ed8', avatarBg: '#3b82f6' },
  'Ultimate Pack':    { from: '#78350f', to: '#b45309', avatarBg: '#f59e0b' },
};

const batchTypeColors: Record<string, { bg: string; color: string }> = {
  'Target Batch':     { bg: '#ccfbf1', color: '#0f766e' },
  'Foundation Batch': { bg: '#dbeafe', color: '#1d4ed8' },
  'Dream Batch':      { bg: '#ede9fe', color: '#6d28d9' },
  'Crash Course':     { bg: '#ffedd5', color: '#c2410c' },
  'Starter Pack':     { bg: '#dcfce7', color: '#15803d' },
  'Pro Pack':         { bg: '#dbeafe', color: '#1d4ed8' },
  'Ultimate Pack':    { bg: '#fef3c7', color: '#b45309' },
};

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getSeatsInfo(batch: Batch): { text: string; urgent: boolean } {
  const left = batch.seats - batch.filled;
  if (batch.seats >= 999) return { text: 'Open Enrollment', urgent: false };
  if (left <= 3)          return { text: `Only ${left} Seat${left === 1 ? '' : 's'} Left!`, urgent: true };
  if (batch.seats <= 20)  return { text: `Only ${batch.seats} Students`, urgent: false };
  return { text: `${left} Seats Left`, urgent: false };
}

function getBatchesForCourse(slug: string): Batch[] {
  return batches.filter((b) => b.courseSlug === slug);
}

// ─── Batch Card ────────────────────────────────────────────────────────────
function BatchCard({ batch }: { batch: Batch }) {
  const palette   = cardPalettes[batch.batchType] || { from: '#0D1837', to: '#374151', avatarBg: '#6B7280' };
  const typeStyle = batchTypeColors[batch.batchType] || { bg: '#f3f4f6', color: '#374151' };
  const { text: seatsText, urgent } = getSeatsInfo(batch);
  const primaryFaculty = batch.faculty[0] || 'CLATians Faculty';
  const isSingle       = !primaryFaculty.includes('Team') && !primaryFaculty.includes('Faculty');

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
      style={{ background: 'white', border: '1.5px solid #E9EEF2', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
        el.style.transform  = 'translateY(-4px)';
        el.style.borderColor = '#08BD80';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow  = '0 2px 8px rgba(0,0,0,0.05)';
        el.style.transform  = 'translateY(0)';
        el.style.borderColor = '#E9EEF2';
      }}
    >
      {/* Header */}
      <div className="relative h-32 flex items-end justify-between px-4 pb-3 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)` }}>
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ background: 'white' }} />
        <div className="flex items-end gap-2.5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20 flex-shrink-0"
            style={{ background: palette.avatarBg }}>
            {isSingle
              ? <span className="text-lg font-black text-white">{getInitials(primaryFaculty)}</span>
              : <svg className="w-7 h-7 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
            }
          </div>
          <div className="pb-0.5">
            <p className="text-white/50 text-[9px] font-semibold uppercase tracking-wider">Instructor</p>
            <p className="text-white font-bold text-xs leading-tight">{primaryFaculty}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 pb-1">
          {batch.status === 'upcoming'     && <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(8,189,128,0.9)' }}>NEW</span>}
          {batch.status === 'filling-fast' && <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(249,115,22,0.9)' }}>🔥 HOT</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#FEF9C3', color: '#92400E' }}>{batch.language}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: typeStyle.bg, color: typeStyle.color }}>{batch.batchType}</span>
        </div>

        <h4 className="font-black text-sm leading-snug mb-2" style={{ color: '#0D1837' }}>{batch.name}</h4>

        <div className="flex items-center gap-1 text-[11px] mb-2.5" style={{ color: '#9CA3AF' }}>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{batch.startDate} · {batch.endDate}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2.5">
          {batch.chips.slice(0, 3).map((chip) => (
            <span key={chip} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: '#F0FDF9', color: '#0f766e', border: '1px solid #C6F3E4' }}>✓ {chip}</span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: urgent ? '#f97316' : '#08BD80' }} />
          <span className="text-[11px] font-semibold" style={{ color: urgent ? '#c2410c' : '#0f766e' }}>{seatsText}</span>
        </div>

        <div className="flex-1" />

        <div className="border-t pt-3 mt-2" style={{ borderColor: '#F3F4F6' }}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black" style={{ color: '#0D1837' }}>{batch.fee}</span>
                {batch.originalFee && <span className="text-xs line-through" style={{ color: '#9CA3AF' }}>{batch.originalFee}</span>}
              </div>
              {batch.offer && <p className="text-[10px] font-bold" style={{ color: '#08BD80' }}>🎉 {batch.offer}</p>}
            </div>
            <a href={`/courses/${batch.courseSlug}/${batch.slug}`}
              className="px-3.5 py-2 rounded-xl text-xs font-black text-white hover:opacity-90 transition-opacity flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}
              onClick={(e) => e.stopPropagation()}>
              Enroll →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Two-panel layout ──────────────────────────────────────────────────────
function CoursePanels({ categoryKey }: { categoryKey: TabKey }) {
  const filtered = courses.filter((c) => c.category === categoryKey);
  const [selectedSlug, setSelectedSlug] = useState(filtered[0]?.slug ?? '');

  // Reset selection when category changes
  useEffect(() => {
    const first = courses.find((c) => c.category === categoryKey);
    if (first) setSelectedSlug(first.slug);
  }, [categoryKey]);

  const selectedCourse  = courses.find((c) => c.slug === selectedSlug);
  const selectedBatches = getBatchesForCourse(selectedSlug);

  if (filtered.length === 0) return (
    <div className="text-center py-24">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-xl font-bold" style={{ color: '#0D1837' }}>Coming Soon</h3>
    </div>
  );

  return (
    <div className="flex gap-6 items-start">

      {/* ── Left sidebar — course list ── */}
      <div className="w-72 flex-shrink-0 sticky top-32">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#9CA3AF' }}>
          Select a Course
        </p>
        <div className="space-y-2">
          {filtered.map((course) => {
            const batchCount = getBatchesForCourse(course.slug).length;
            const isActive   = course.slug === selectedSlug;
            return (
              <button
                key={course.slug}
                onClick={() => setSelectedSlug(course.slug)}
                className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-150"
                style={isActive
                  ? { background: '#E6FAF4', border: '1.5px solid #08BD80', boxShadow: '0 2px 12px rgba(8,189,128,0.15)' }
                  : { background: 'white', border: '1.5px solid #E9EEF2' }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = '#08BD80';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = '#E9EEF2';
                }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: isActive ? '#C6F3E4' : course.bg }}>
                  {course.icon}
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-snug truncate"
                    style={{ color: isActive ? '#08BD80' : '#0D1837' }}>
                    {course.title}
                  </p>
                  <p className="text-[11px] mt-0.5 font-semibold"
                    style={{ color: isActive ? '#0f766e' : '#9CA3AF' }}>
                    {batchCount} {batchCount === 1 ? 'Batch' : 'Batches'}
                  </p>
                </div>
                {/* Active arrow */}
                {isActive && (
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#08BD80">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Counselling CTA */}
        <div className="mt-5 p-4 rounded-2xl text-center"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <p className="text-white text-xs font-bold mb-1">Need Help Choosing?</p>
          <p className="text-white/50 text-[11px] mb-3">Talk to our expert counsellors — free!</p>
          <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
            className="block py-2 rounded-xl text-xs font-black text-white transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}>
            💬 Free Counselling
          </a>
        </div>
      </div>

      {/* ── Right panel — batches ── */}
      <div className="flex-1 min-w-0">
        {selectedCourse && (
          <div className="mb-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: selectedCourse.bg }}>
              {selectedCourse.icon}
            </div>
            <div>
              <h2 className="font-black text-xl" style={{ color: '#0D1837' }}>{selectedCourse.title}</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>{selectedCourse.tagline}</p>
            </div>
          </div>
        )}

        {selectedBatches.length === 0 ? (
          <div className="text-center py-20 rounded-2xl"
            style={{ background: '#F8FAFC', border: '1.5px dashed #E9EEF2' }}>
            <div className="text-4xl mb-3">🔜</div>
            <p className="font-semibold" style={{ color: '#9CA3AF' }}>Batches coming soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {selectedBatches.map((batch) => (
              <BatchCard key={batch.slug} batch={batch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
function CoursesPageInner() {
  const searchParams = useSearchParams();
  const catParam     = searchParams.get('cat') as TabKey | null;
  const validTabs: TabKey[] = ['offline', 'online', 'mentorship', 'mock'];
  const initial: TabKey     = catParam && validTabs.includes(catParam) ? catParam : 'offline';
  const [activeTab, setActiveTab] = useState<TabKey>(initial);

  useEffect(() => {
    if (catParam && validTabs.includes(catParam)) setActiveTab(catParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catParam]);

  function getTabCount(key: TabKey) {
    return courses.filter((c) => c.category === key).length;
  }

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="relative overflow-hidden py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0D1837 100%)' }}>
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#08BD80' }} />
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
              style={{ background: 'rgba(8,189,128,0.15)', color: '#08BD80', border: '1px solid rgba(8,189,128,0.3)' }}>
              ✦ India&apos;s Best Law Entrance Coaching
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              All Courses &amp;{' '}
              <span style={{ background: 'linear-gradient(90deg, #08BD80, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Programs
              </span>
            </h1>
            <p className="text-white/60 mt-4 text-base max-w-xl mx-auto">
              Classroom · Online · 1-on-1 Mentorship — pick the format that fits you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[{ v: '15,000+', l: 'Students' }, { v: '1,000+', l: 'NLU Selections' }, { v: '98%', l: 'Success Rate' }].map(s => (
                <div key={s.l} className="px-5 py-2.5 rounded-2xl text-center"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="text-lg font-black" style={{ color: '#08BD80' }}>{s.v}</div>
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Bar ───────────────────────────────────────────── */}
        <div className="sticky top-16 z-30"
          style={{ background: 'white', borderBottom: '2px solid #E9EEF2', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-stretch overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const count    = getTabCount(tab.key);
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border-b-2 -mb-0.5"
                    style={isActive
                      ? { color: '#08BD80', borderBottomColor: '#08BD80' }
                      : { color: '#6B7280', borderBottomColor: 'transparent' }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#08BD80'; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
                  >
                    <span className="text-base">{tab.icon}</span>
                    {tab.label}
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                      style={isActive
                        ? { background: '#E6FAF4', color: '#08BD80' }
                        : { background: '#F3F4F6', color: '#9CA3AF' }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────── */}
        <div style={{ background: '#F8FAFC', minHeight: '70vh' }}>
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">

            <CoursePanels categoryKey={activeTab} />
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-12 text-center"
            style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
            <div className="absolute top-0 left-1/3 w-64 h-32 rounded-full opacity-20 blur-3xl" style={{ background: '#08BD80' }} />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Not Sure Which Course Is Right?</h2>
              <p className="text-white/60 text-sm max-w-md mx-auto mb-7">
                Talk to our counselling team — they&apos;ll help you pick the best program based on your goal, budget &amp; timeline.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ background: '#25D366' }}>💬 WhatsApp Us Free</a>
                <a href="tel:8507700177"
                  className="px-7 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                  style={{ color: 'white', border: '1.5px solid rgba(255,255,255,0.2)' }}>📞 8507700177</a>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={null}>
      <CoursesPageInner />
    </Suspense>
  );
}
