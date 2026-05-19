const courses = [
  { label: 'Offline Course', href: '#' },
  { label: 'Online Course', href: '#' },
  { label: 'OLET Program', href: '#' },
  { label: 'Mock Tests', href: '#' },
];

const exams = [
  { label: 'CLAT', href: '#' },
  { label: 'AILET', href: '#' },
  { label: 'MH-CET Law', href: '#' },
  { label: 'CUET', href: '#' },
  { label: 'AIL-LET', href: '#' },
  { label: 'LSAT', href: '#' },
];

const quickLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Faculty', href: '#' },
  { label: 'Admission', href: '#' },
  { label: 'Blogs', href: '#' },
  { label: 'College Predictor', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#2A2B2D' }} className="text-white">
      {/* ── Main footer ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo — white on dark */}
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="CLATians"
                className="h-8 w-auto brightness-0 invert"
              />
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: '#9CA3AF' }}>
              Your trusted institute for CLAT, AILET, and all major law entrance exams.
              Expert guidance by NLU alumni and advocates.
            </p>

            {/* Phone */}
            <a
              href="tel:8507700177"
              className="flex items-center gap-2 text-sm mb-5 transition-colors hover:text-white"
              style={{ color: '#9CA3AF' }}
            >
              <span>📞</span> 8507700177
            </a>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { label: 'Facebook', icon: 'f' },
                { label: 'YouTube', icon: '▶' },
                { label: 'Instagram', icon: '📷' },
                { label: 'LinkedIn', icon: 'in' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#9CA3AF' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Courses */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Courses</h4>
            <ul className="space-y-3">
              {courses.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#9CA3AF' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Exams */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Exams</h4>
            <ul className="space-y-3">
              {exams.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#9CA3AF' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#9CA3AF' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div style={{ background: '#1a1b1c' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            © 2026 CLATians – All rights reserved.
          </p>

          {/* Social icons (right side of bottom bar) */}
          <div className="flex items-center gap-5">
            {[
              { label: 'Facebook', icon: 'f' },
              { label: 'YouTube', icon: '▶' },
              { label: 'Instagram', icon: '📷' },
              { label: 'LinkedIn', icon: 'in' },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                title={s.label}
                className="text-xs font-bold transition-colors hover:text-white"
                style={{ color: '#6B7280' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile bottom spacer */}
      <div className="h-16 md:hidden" style={{ background: '#1a1b1c' }} />
    </footer>
  );
}
