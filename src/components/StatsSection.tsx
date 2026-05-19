const stats = [
  {
    value: '5000+',
    label: 'Success Stories',
    desc: 'Students placed in top NLUs',
    feature: 'Proven track record',
  },
  {
    value: 'Top NLU',
    label: 'Selections',
    desc: 'NLSIU, NLU Delhi, NALSAR & more',
    feature: 'Prestigious placements',
  },
  {
    value: '20+',
    label: 'Expert Faculty',
    desc: 'NLU Alumni & Advocates',
    feature: 'Experienced mentors',
  },
  {
    value: '4.9★',
    label: 'Student Trust',
    desc: 'Average rating by our students',
    feature: 'Consistently rated',
  },
];

const mobileStats = [
  { value: '15000+', label: 'SUCCESS STORIES' },
  { value: 'Top', label: 'NLU SELECTIONS' },
  { value: '23+', label: 'EXPERT FACULTY' },
  { value: '4.9/5 ★', label: 'STUDENT TRUST' },
];

export default function StatsSection() {
  return (
    <section className="py-10 md:py-16" style={{ background: '#FCF8E7' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop: horizontal row */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center px-6 py-8"
              style={{ background: 'transparent' }}
            >
              <div
                className="text-4xl font-black leading-none"
                style={{ color: '#08BD80' }}
              >
                {stat.value}
              </div>
              <div
                className="font-bold text-base mt-2"
                style={{ color: '#3C4852' }}
              >
                ✓ {stat.label}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.desc}</div>
              <div
                className="text-xs font-semibold mt-2"
                style={{ color: '#08BD80' }}
              >
                {stat.feature}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single row equal boxes */}
        <div className="md:hidden grid grid-cols-4 gap-2">
          {mobileStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl flex flex-col items-center justify-center text-center py-4 px-1"
              style={{ background: 'rgba(255,255,255,0.7)' }}
            >
              <div
                className="text-lg font-black leading-none"
                style={{ color: '#08BD80' }}
              >
                {stat.value}
              </div>
              <div
                className="text-[9px] font-bold mt-1.5 tracking-wide leading-tight"
                style={{ color: '#3C4852' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
