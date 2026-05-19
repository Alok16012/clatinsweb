const avatarColors = [
  '#FFF0F0',
  '#F0F8FF',
  '#F0FFF4',
  '#FFF8F0',
  '#F5F0FF',
  '#FFFFF0',
  '#F0F0FF',
  '#FFF4F4',
];

const faculty = [
  {
    name: 'A.K. Singh',
    designation: 'Director, CLATians',
    subject: 'Legal Reasoning & Legal Awareness',
    rating: 4.9,
    students: '15,000+',
    experience: '15 yrs',
    avatar: 'AK',
    tags: ['CLAT Expert', 'Constitutional Law', 'Director'],
    slug: 'ak-singh',
  },
  {
    name: 'Adv. Priya Singh',
    designation: 'Senior Faculty — English',
    subject: 'English Language & Comprehension',
    rating: 4.8,
    students: '5,000+',
    experience: '10 yrs',
    avatar: 'PS',
    tags: ['English', 'Comprehension', 'Vocabulary'],
    slug: 'priya-singh',
  },
  {
    name: 'Adv. Amit Sharma',
    designation: 'Faculty — Reasoning & Quant',
    subject: 'Logical Reasoning & Quantitative Techniques',
    rating: 4.8,
    students: '4,500+',
    experience: '8 yrs',
    avatar: 'AS',
    tags: ['Logical Reasoning', 'Quant', 'Data Interpretation'],
    slug: 'amit-sharma',
  },
  {
    name: 'Adv. Rahul Verma',
    designation: 'Faculty — Current Affairs',
    subject: 'Current Affairs & General Knowledge',
    rating: 4.7,
    students: '6,000+',
    experience: '9 yrs',
    avatar: 'RV',
    tags: ['Current Affairs', 'GK', 'Legal News'],
    slug: 'rahul-verma',
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm" style={{ color: '#FBBF24' }}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
      </span>
      <span className="text-xs font-bold" style={{ color: '#3C4852' }}>
        {rating}
      </span>
    </div>
  );
}

type FacultyMember = (typeof faculty)[number];

function DesktopCard({ f, idx }: { f: FacultyMember; idx: number }) {
  const avatarBg = avatarColors[idx % avatarColors.length];
  return (
    <a
      href={`/faculty/${f.slug}`}
      className="group flex items-stretch bg-white rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
      style={{ border: '1px solid #E9EEF2', borderRadius: '12px', textDecoration: 'none' }}
    >
      {/* Left: avatar column */}
      <div
        className="flex flex-col items-center justify-center gap-2 px-4 py-5 flex-shrink-0"
        style={{ width: '30%', background: avatarBg }}
      >
        {/* Avatar circle */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.75)', color: '#3C4852', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          {f.avatar}
        </div>
        {/* Rating */}
        <StarRating rating={f.rating} />
        {/* Student count */}
        <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: '#7A8B94' }}>
          👥 {f.students}
        </span>
      </div>

      {/* Right: details column */}
      <div className="flex flex-col justify-between flex-1 px-4 py-5">
        <div>
          <h3 className="font-bold text-sm leading-snug" style={{ color: '#3C4852' }}>
            {f.name}
          </h3>
          <p className="text-xs font-semibold mt-0.5" style={{ color: '#08BD80' }}>
            {f.designation}
          </p>
          <p className="text-[11px] mt-1 leading-snug" style={{ color: '#9CA3AF' }}>
            {f.subject}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {f.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#F0FDF9', color: '#08BD80', border: '1px solid #D1FAE5' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* View Profile link */}
        <div
          className="mt-3 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
          style={{ color: '#08BD80' }}
        >
          View Profile →
        </div>
      </div>
    </a>
  );
}

function MobileCard({ f, idx }: { f: FacultyMember; idx: number }) {
  const avatarBg = avatarColors[idx % avatarColors.length];
  return (
    <a
      href={`/faculty/${f.slug}`}
      className="flex-shrink-0 w-40 bg-white rounded-xl p-4 flex flex-col items-center text-center"
      style={{ border: '1px solid #E9EEF2', textDecoration: 'none' }}
    >
      {/* Avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center font-black text-base mb-2.5"
        style={{ background: avatarBg, color: '#3C4852', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
      >
        {f.avatar}
      </div>
      <div className="font-bold text-xs mb-0.5 leading-snug" style={{ color: '#3C4852' }}>
        {f.name}
      </div>
      <div className="text-[10px] font-semibold mb-0.5" style={{ color: '#08BD80' }}>
        {f.designation}
      </div>
      <div className="text-[9px] mb-2 leading-snug" style={{ color: '#9CA3AF' }}>
        {f.subject}
      </div>
      <StarRating rating={f.rating} />
    </a>
  );
}

export default function FacultySection() {
  return (
    <section className="py-8 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl"
              style={{ color: '#3C4852', fontWeight: 800 }}
            >
              Meet Our Expert Faculty
            </h2>
            <p className="text-sm mt-1" style={{ color: '#7A8B94' }}>
              Advocates, NLU alumni &amp; toppers — handpicked for your selection.
            </p>
          </div>
          <a href="/faculty" className="see-all flex items-center gap-1 flex-shrink-0 mb-1 text-sm font-bold" style={{ color: '#08BD80' }}>
            SEE ALL →
          </a>
        </div>

        {/* Desktop: 2-column grid of horizontal cards */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {faculty.map((f, idx) => (
            <DesktopCard key={f.slug} f={f} idx={idx} />
          ))}
        </div>

        {/* Mobile: horizontal scroll of compact vertical cards */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none">
            {faculty.map((f, idx) => (
              <MobileCard key={f.slug} f={f} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
