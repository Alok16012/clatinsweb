'use client';
import { useState } from 'react';
import { courses } from '@/data/courses';
import { batches } from '@/data/batches';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type TabKey = 'offline' | 'online' | 'mentorship' | 'mock';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'offline', label: 'Offline Course' },
  { key: 'online', label: 'Online Course' },
  { key: 'mentorship', label: 'Mentorship' },
  { key: 'mock', label: 'Mock Test' },
];

const mentorshipPlans = [
  {
    name: 'Starter',
    price: '₹5,000',
    sessions: '4 Sessions',
    color: '#08BD80',
    features: [
      'Initial assessment and goal setting',
      '4 one-on-one sessions with NLU mentor',
      'Custom study plan for 30 days',
      'WhatsApp support between sessions',
      'Study material recommendations',
    ],
  },
  {
    name: 'Pro',
    price: '₹9,000',
    sessions: '8 Sessions',
    color: '#0D1837',
    badge: 'Most Popular',
    features: [
      'Comprehensive performance evaluation',
      '8 one-on-one sessions with NLU mentor',
      'Custom 60-day study plan',
      'Daily WhatsApp check-ins',
      'Mock test review sessions',
      'Interview preparation included',
      'Priority response within 2 hours',
    ],
  },
  {
    name: 'Ultimate',
    price: '₹15,000',
    sessions: 'Unlimited',
    color: '#08BD80',
    features: [
      'Full exam cycle mentorship',
      'Unlimited sessions till exam day',
      'Personalized study schedule daily',
      '24/7 WhatsApp mentor access',
      'Personal mock test series',
      'Interview + counselling prep',
      'College selection guidance',
      'Post-result NLU counselling support',
    ],
  },
];

function getBatchCount(slug: string): number {
  return batches.filter((b) => b.courseSlug === slug).length;
}

function getTabCount(key: TabKey): number {
  if (key === 'mentorship') return 0;
  return courses.filter((c) => c.category === key).length;
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('offline');

  const filteredCourses = courses.filter((c) => c.category === activeTab);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}
          className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              All Courses &amp; Programs
            </h1>
            <p className="text-white/60 mt-4 text-base md:text-lg max-w-xl mx-auto">
              Discover the right coaching path for your law entrance exams.
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {[
                { label: '15,000+ Students' },
                { label: '1,000+ NLU Selections' },
                { label: '4 Course Types' },
              ].map((s) => (
                <div key={s.label}
                  className="px-5 py-2.5 rounded-full text-sm font-bold"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filter Tabs ────────────────────────────────────── */}
        <div className="sticky top-16 z-30 bg-white border-b"
          style={{ borderColor: '#E9EEF2', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
              {tabs.map((tab) => {
                const count = tab.key === 'mentorship' ? 3 : getTabCount(tab.key);
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0"
                    style={
                      isActive
                        ? { background: '#08BD80', color: 'white' }
                        : { background: 'white', color: '#5a6a75', border: '1.5px solid #E9EEF2' }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = '#08BD80';
                        (e.currentTarget as HTMLElement).style.color = '#08BD80';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = '#E9EEF2';
                        (e.currentTarget as HTMLElement).style.color = '#5a6a75';
                      }
                    }}
                  >
                    {tab.label}
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                      style={
                        isActive
                          ? { background: 'rgba(255,255,255,0.25)', color: 'white' }
                          : { background: '#F0FDF9', color: '#08BD80' }
                      }>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content Area ───────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">

          {/* Regular course tabs (offline / online / mock) */}
          {activeTab !== 'mentorship' && (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => {
                const batchCount = getBatchCount(course.slug);
                const categoryLabel =
                  course.category === 'offline' ? 'Offline' :
                  course.category === 'online' ? 'Online' :
                  course.category === 'mock' ? 'Mock Test' : '';
                return (
                  <div
                    key={course.slug}
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      border: '1.5px solid #E9EEF2',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#08BD80';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(8,189,128,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#E9EEF2';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)';
                    }}
                  >
                    {/* Card Main Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: icon + details */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                            style={{ background: course.bg }}>
                            {course.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-lg leading-tight" style={{ color: '#0D1837' }}>
                              {course.title}
                            </h3>
                            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#6B7280' }}>
                              {course.tagline}
                            </p>
                            <a
                              href={`/courses/${course.slug}`}
                              className="inline-flex items-center gap-1 mt-3 text-sm font-bold transition-colors"
                              style={{ color: '#08BD80' }}
                            >
                              View Batches →
                            </a>
                          </div>
                        </div>

                        {/* Right: badges */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: '#F0FDF9', color: '#08BD80' }}>
                            {categoryLabel}
                          </span>
                          {batchCount > 0 && (
                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                              style={{ background: '#FEF3C7', color: '#92400E' }}>
                              {batchCount} {batchCount === 1 ? 'Batch' : 'Batches'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Fee + Duration row */}
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <span className="text-base font-black" style={{ color: '#08BD80' }}>
                          {course.fee}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: '#F3F4F6', color: '#6B7280' }}>
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="px-6 py-3 flex items-center gap-3"
                      style={{ background: '#E6FAF4', borderTop: '1px solid #C6F3E4' }}>
                      <a
                        href={`/courses/${course.slug}`}
                        className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                        style={{ background: '#08BD80' }}
                      >
                        Enroll Now
                      </a>
                      <a
                        href="tel:8507700177"
                        className="text-xs font-bold px-4 py-2 rounded-lg border transition-colors"
                        style={{ borderColor: '#08BD80', color: '#08BD80' }}
                      >
                        Free Counselling
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mentorship tab — special plans */}
          {activeTab === 'mentorship' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#0D1837' }}>
                  1-on-1 Mentorship Plans
                </h2>
                <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
                  Get personalized guidance from NLU toppers and experienced advocates. Choose a plan that fits your preparation stage.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {mentorshipPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className="bg-white rounded-2xl overflow-hidden relative"
                    style={{
                      border: plan.badge ? `2px solid ${plan.color}` : '1.5px solid #E9EEF2',
                      boxShadow: plan.badge ? '0 4px 20px rgba(8,189,128,0.1)' : '0 1px 6px rgba(0,0,0,0.04)',
                    }}
                  >
                    {plan.badge && (
                      <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: '#08BD80' }}>
                        {plan.badge}
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="font-black text-xl" style={{ color: '#0D1837' }}>{plan.name}</h3>
                      <div className="mt-1">
                        <span className="text-3xl font-black" style={{ color: plan.color }}>{plan.price}</span>
                        <span className="text-sm text-gray-400 ml-2">· {plan.sessions}</span>
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0 mt-0.5"
                              style={{ background: '#08BD80' }}>
                              ✓
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="https://wa.me/918507700177"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 block text-center py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                        style={{ background: plan.badge ? plan.color : '#25D366' }}
                      >
                        💬 Book on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Not Sure CTA ──────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pb-14">
          <div className="rounded-2xl p-8 md:p-12 text-center"
            style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Not Sure Which Course Is Right for You?
            </h2>
            <p className="text-white/60 mt-3 text-sm md:text-base max-w-md mx-auto">
              Talk to our counselling team — they will help you choose the best program based on your goal, budget, and timeline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <a
                href="https://wa.me/918507700177"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                💬 WhatsApp Us Free
              </a>
              <a
                href="tel:8507700177"
                className="px-7 py-3.5 rounded-xl font-bold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors"
              >
                📞 Call: 8507700177
              </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
