const stats = [
  { icon: '🏆', value: '5000+', label: 'NLU Selections', desc: 'Students in top NLUs' },
  { icon: '🎓', value: '15+', label: 'Years Excellence', desc: 'Since 2010' },
  { icon: '👨‍🏫', value: '25+', label: 'Expert Faculty', desc: 'NLU Alumni & Advocates' },
  { icon: '⭐', value: '4.9/5', label: 'Student Rating', desc: 'Consistently rated' },
];

const mobileStats = [
  { icon: '🏆', value: '5000+', label: 'NLU SELECTIONS' },
  { icon: '🎓', value: '15+', label: 'YEARS EXCELLENCE' },
  { icon: '👨‍🏫', value: '25+', label: 'EXPERT FACULTY' },
  { icon: '⭐', value: '4.9/5', label: 'STUDENT RATING' },
];

export default function StatsSection() {
  return (
    <section className="py-6 md:py-10" style={{ background: '#FCF8E7' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Eyebrow text */}
        <p
          className="text-center text-xs font-semibold tracking-wide mb-4 hidden md:block"
          style={{ color: '#08BD80' }}
        >
          Trusted by students across India
        </p>

        {/* Desktop: 4 stats in a single row with dividers */}
        <div className="hidden md:flex items-center justify-center">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center text-center px-8 py-2">
                {/* Icon circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg"
                  style={{ background: '#08BD80' }}
                >
                  {stat.icon}
                </div>
                {/* Value */}
                <div
                  className="text-3xl font-black leading-none"
                  style={{ color: '#08BD80' }}
                >
                  {stat.value}
                </div>
                {/* Label */}
                <div
                  className="font-bold text-sm mt-1"
                  style={{ color: '#3C4852' }}
                >
                  {stat.label}
                </div>
                {/* Description */}
                <div className="text-xs text-gray-500 mt-0.5">{stat.desc}</div>
              </div>
              {/* Vertical divider — skip after last item */}
              {i < stats.length - 1 && (
                <span className="text-gray-300 text-2xl select-none">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 4-col grid */}
        <div className="md:hidden grid grid-cols-4 gap-2">
          {mobileStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl flex flex-col items-center justify-center text-center py-3 px-1"
              style={{ background: 'rgba(255,255,255,0.7)' }}
            >
              <div className="text-base mb-0.5">{stat.icon}</div>
              <div
                className="text-sm font-black leading-none"
                style={{ color: '#08BD80' }}
              >
                {stat.value}
              </div>
              <div
                className="text-[8px] font-bold mt-1 tracking-wide leading-tight"
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
