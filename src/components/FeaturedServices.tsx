const features = [
  {
    icon: '📚',
    title: 'Live & Recorded Classes',
    desc: 'Daily live classes by expert faculty + 600+ hours of recorded lectures accessible 24/7 on the app.',
    link: '/courses/online',
  },
  {
    icon: '📝',
    title: 'Full-Length Mock Tests',
    desc: 'Attempt up to 40 CLAT mock tests simulating real exam conditions with AI-powered performance analytics.',
    link: '/courses/mock-tests',
  },
  {
    icon: '💬',
    title: 'Doubt Clearing Sessions',
    desc: 'Daily offline doubt sessions at our Patna center and weekly live doubt clearing for online students.',
    link: '/courses/offline',
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-12 md:py-16" style={{ background: '#FCF8E7' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Unacademy-style: 3 feature cards on cream bg */}
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title}
              className="bg-white rounded-xl p-6 border"
              style={{ borderColor: '#E9EEF2' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: '#E6FAF4' }}>
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#3C4852' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#7A8B94' }}>{f.desc}</p>
              <a href={f.link}
                className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: '#08BD80' }}>
                Learn more →
              </a>
            </div>
          ))}
        </div>

        {/* Mobile: stack vertically */}
        <div className="md:hidden space-y-4 mt-0">
          {/* shown above via grid on mobile too — hidden md:grid already handles */}
        </div>

        {/* App download banner — Unacademy style */}
        <div className="mt-10 rounded-2xl border overflow-hidden flex flex-col md:flex-row items-center"
          style={{ borderColor: '#E9EEF2', background: 'white' }}>
          <div className="flex-1 p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#08BD80' }}>
              Online Preparation
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: '#3C4852' }}>
              Study anytime, anywhere
            </h3>
            <ul className="space-y-2.5 mb-7">
              {[
                'Interactive live classes with real faculty',
                'Mock tests and practice questions',
                'High-quality notes & PDF material',
                'Daily doubt solving on WhatsApp',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#5a6a75' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                    style={{ background: '#08BD80' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <a href="/courses/online"
                className="px-6 py-3 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: '#08BD80' }}>
                Start Online Course →
              </a>
              <a href="tel:8507700177"
                className="px-6 py-3 rounded-lg font-bold text-sm border transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E9EEF2', color: '#3C4852' }}>
                📞 Call Us
              </a>
            </div>
          </div>
          <div className="w-full md:w-72 p-8 flex flex-col items-center justify-center"
            style={{ background: '#F7F9FB' }}>
            <div className="text-6xl mb-4">📱</div>
            <p className="font-bold text-center text-sm mb-1" style={{ color: '#3C4852' }}>CLATians App</p>
            <p className="text-xs text-center mb-4" style={{ color: '#7A8B94' }}>Download for iOS & Android</p>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg justify-center"
                style={{ background: '#3C4852' }}>
                <span className="text-white text-sm">🍎</span>
                <span className="text-white text-xs font-bold">App Store</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg justify-center"
                style={{ background: '#3C4852' }}>
                <span className="text-white text-sm">▶</span>
                <span className="text-white text-xs font-bold">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
