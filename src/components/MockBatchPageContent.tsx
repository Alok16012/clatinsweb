import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';

const faqs = [
  ['Can I attempt mocks online?', 'Yes. You get online access, and supported packs also include printable PDF practice.'],
  ['Will I get solutions?', 'Every mock comes with detailed solutions so you can review mistakes after each attempt.'],
  ['Is this useful for beginners?', 'Yes. Pick the 10 mock pack if you are starting, 20 mocks for steady practice, and 40 mocks for full rank push.'],
  ['How should I use the series?', 'Attempt, analyse, revise weak areas, then attempt the next mock with a corrected strategy.'],
];

const defaultAnalytics = [
  { title: 'Section-wise score tracking', desc: 'Know which section needs immediate attention.' },
  { title: 'Time management review', desc: 'Understand where minutes are getting lost.' },
  { title: 'Weak-area detection', desc: 'Spot repeated mistakes before the exam does.' },
  { title: 'Attempt accuracy insight', desc: 'Balance speed, selection and accuracy.' },
  { title: 'Rank comparison', desc: 'Benchmark your preparation with serious aspirants.' },
  { title: 'Revision priorities', desc: 'Get a clear list of what to fix next.' },
];

const defaultFlow = [
  { title: 'Attempt', desc: 'Take the mock in exam-like timing.' },
  { title: 'Analyse', desc: 'Review section score, accuracy, and skipped questions.' },
  { title: 'Fix', desc: 'Revise weak topics and redo key questions.' },
  { title: 'Repeat', desc: 'Build speed and confidence with the next mock.' },
];

const paletteByType: Record<string, { from: string; to: string; accent: string; soft: string }> = {
  'Starter Pack': { from: '#073b3a', to: '#0f766e', accent: '#08BD80', soft: '#E6FAF4' },
  'Pro Pack': { from: '#0f2454', to: '#1d4ed8', accent: '#3b82f6', soft: '#DBEAFE' },
  'Ultimate Pack': { from: '#3b1f6b', to: '#7c3aed', accent: '#8b5cf6', soft: '#EDE9FE' },
};

function clean(items: string[] | undefined) {
  return (items || []).map((item) => item.trim()).filter(Boolean);
}

export default function MockBatchPageContent({
  course,
  batch,
  otherBatches,
}: {
  course: Course;
  batch: Batch;
  otherBatches: Batch[];
}) {
  const palette = paletteByType[batch.batchType] || {
    from: '#060d1f',
    to: '#0D1837',
    accent: batch.color || '#08BD80',
    soft: batch.bg || '#E6FAF4',
  };
  const highlights = clean(batch.highlights).slice(0, 6);
  const chips = clean(batch.chips).slice(0, 6);
  const syllabus = clean(batch.syllabus).slice(0, 6);
  const moreDetails = clean(batch.details?.moreDetails).slice(0, 6);
  const flowSteps = (batch.details?.strategySections ?? [])
    .map((section, index) => {
      const items = clean(section.items);
      return {
        title: section.title?.trim() || `Step ${index + 1}`,
        desc: section.subtitle?.trim() || items.slice(0, 2).join(' · ') || 'Follow this step in your mock practice cycle.',
      };
    })
    .filter((item) => item.title || item.desc)
    .slice(0, 4);
  const analyticsCards = (batch.details?.aboutFeatures ?? [])
    .map((item) => ({ title: item.title?.trim(), desc: item.subtitle?.trim() }))
    .filter((item) => item.title || item.desc)
    .slice(0, 6);
  const plans = (batch.details?.plans ?? [])
    .filter((plan) => plan.name?.trim() || plan.price?.trim() || clean(plan.features).length > 0)
    .slice(0, 3);
  const visibleFlow = flowSteps.length > 0 ? flowSteps : defaultFlow;
  const visibleAnalytics = analyticsCards.length > 0 ? analyticsCards : defaultAnalytics;
  const pageFaqs = (batch.details?.faqs?.filter((item) => item.question?.trim() && item.answer?.trim()) ?? faqs.map(([question, answer]) => ({ question, answer }))).slice(0, 5);
  const testsMatch = batch.name.match(/\d+/)?.[0] || batch.chips.find((item) => /\d+/.test(item))?.match(/\d+/)?.[0] || 'Full';
  const rankLabel = batch.batchType === 'Ultimate Pack' ? 'All India Rank' : batch.batchType === 'Pro Pack' ? 'Analytics' : 'Score Report';

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0" style={{ background: '#F8FAFC' }}>
        <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: palette.accent }} />
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/55">
              <a href="/" className="hover:text-white">Home</a>
              <span>›</span>
              <a href="/courses?cat=mock" className="hover:text-white">Mock Tests</a>
              <span>›</span>
              <span className="text-white/85">{batch.name}</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full px-3 py-1.5 text-xs font-black" style={{ background: 'rgba(255,255,255,0.14)', color: 'white' }}>{batch.batchType}</span>
                  <span className="rounded-full px-3 py-1.5 text-xs font-black" style={{ background: palette.soft, color: palette.from }}>{batch.exam}</span>
                </div>
                <h1 className="max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{batch.name}</h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">{batch.description || course.tagline}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Mocks', value: `${testsMatch} Tests` },
                    { label: 'Access', value: batch.duration },
                    { label: 'Report', value: rankLabel },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                      <p className="text-xs text-white/50">{item.label}</p>
                      <p className="mt-1 font-black text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="tel:8507700177" className="rounded-xl px-6 py-3 text-sm font-black text-white" style={{ background: palette.accent }}>Start Practice — {batch.fee}</a>
                  <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Ask for Demo</a>
                </div>
              </div>

              <aside className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-widest text-white/50">What You Get</p>
                <div className="mt-4 space-y-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white" style={{ background: palette.accent }}>✓</span>
                      <span className="text-sm font-semibold leading-snug text-white/85">{item}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Smart Practice System</span>
              <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Attempt. Analyse. Improve.</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {visibleFlow.map(({ title, desc }, index) => (
                  <div key={title} className="rounded-xl p-4" style={{ background: index % 2 ? '#F8FAFC' : palette.soft }}>
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black text-white" style={{ background: palette.accent }}>{index + 1}</div>
                    <h3 className="font-black" style={{ color: '#0D1837' }}>{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Included</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {chips.map((item) => (
                  <span key={item} className="rounded-full px-3 py-2 text-xs font-black" style={{ background: palette.soft, color: palette.from }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-8 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Test Coverage</span>
              <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Built Around the CLAT Pattern</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {syllabus.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm font-bold text-gray-700">✓ {item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Analytics</span>
              <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Know Exactly What to Fix</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {visibleAnalytics.map((item) => (
                  <div key={item.title || item.desc} className="rounded-xl p-4" style={{ background: '#F8FAFC' }}>
                    <h3 className="text-sm font-black" style={{ color: '#0D1837' }}>✓ {item.title || 'Analytics'}</h3>
                    {item.desc && <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {(moreDetails.length > 0 || plans.length > 0) && (
          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className={`grid gap-5 ${plans.length > 0 ? 'lg:grid-cols-[1fr_0.9fr]' : ''}`}>
              {moreDetails.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Why This Pack Works</span>
                  <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Practice With a Clear Improvement Loop</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {moreDetails.map((item, index) => (
                      <div key={item} className="rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-black" style={{ color: palette.accent }}>{String(index + 1).padStart(2, '0')}</p>
                        <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {plans.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Plans</span>
                  <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Choose Your Practice Pack</h2>
                  <div className="mt-5 space-y-3">
                    {plans.map((plan, index) => (
                      <div key={plan.name || plan.price || `plan-${index}`} className="rounded-xl border border-gray-100 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-black" style={{ color: '#0D1837' }}>{plan.name || batch.name}</h3>
                          {plan.price && <span className="font-black" style={{ color: palette.accent }}>{plan.price}</span>}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {clean(plan.features).slice(0, 5).map((feature) => (
                            <span key={feature} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: palette.soft, color: palette.from }}>{feature}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {otherBatches.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>Compare Packs</span>
                <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Need More Practice?</h2>
              </div>
              <a href="/courses?cat=mock" className="text-sm font-black" style={{ color: palette.accent }}>View all mock packs →</a>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {otherBatches.map((item) => (
                <a key={item.slug} href={`/courses/${course.slug}/${item.slug}`} className="rounded-2xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black" style={{ color: '#0D1837' }}>{item.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">{item.duration} · {item.mode}</p>
                    </div>
                    <span className="font-black" style={{ color: palette.accent }}>{item.fee}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="bg-white py-8 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[1fr_360px]">
            <div>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: palette.accent }}>FAQs</span>
              <h2 className="mt-2 text-2xl font-black" style={{ color: '#0D1837' }}>Quick Questions</h2>
              <div className="mt-5 space-y-3">
                {pageFaqs.map((item, index) => (
                  <details key={item.question} className="rounded-2xl border border-gray-100 p-5" open={index === 0}>
                    <summary className="cursor-pointer font-black" style={{ color: '#0D1837' }}>{item.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="self-start rounded-2xl p-6 text-white lg:sticky lg:top-24" style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
              <p className="text-sm text-white/55">Practice Pack</p>
              <h3 className="mt-1 text-2xl font-black">{batch.fee}</h3>
              {batch.originalFee && <p className="mt-1 text-sm text-white/45 line-through">{batch.originalFee}</p>}
              {batch.offer && <p className="mt-3 rounded-full bg-white/10 px-3 py-2 text-xs font-black">🎉 {batch.offer}</p>}
              <a href="tel:8507700177" className="mt-5 block rounded-xl px-5 py-3 text-center text-sm font-black text-white" style={{ background: palette.accent }}>Start Now</a>
              <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer" className="mt-2 block rounded-xl border border-white/20 px-5 py-3 text-center text-sm font-bold text-white">WhatsApp Counsellor</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
