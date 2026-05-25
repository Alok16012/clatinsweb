'use client';

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
    photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=AKSingh&backgroundColor=fce7f3',
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
    photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=PriyaSingh&backgroundColor=e0f2fe',
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
    photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=AmitSharma&backgroundColor=dcfce7',
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
    photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=RahulVerma&backgroundColor=fef3c7',
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
        {/* Avatar image */}
        <img
          src={f.photo}
          alt={f.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
        />
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
      style={{ flexShrink: 0, width: '150px', textDecoration: 'none', display: 'block' }}
    >
      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #F0F0F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {/* Avatar header */}
        <div style={{ background: avatarBg, padding: '18px 16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={f.photo}
            alt={f.name}
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', marginBottom: '8px' }}
          />
          <StarRating rating={f.rating} />
          <div style={{ color: '#7A8B94', fontSize: '10px', fontWeight: 600, marginTop: '3px' }}>👥 {f.students}</div>
        </div>
        {/* Info */}
        <div style={{ padding: '12px 12px 14px' }}>
          <div style={{ fontWeight: 800, fontSize: '12px', color: '#0D1837', marginBottom: '3px', lineHeight: 1.2 }}>{f.name}</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#08BD80', marginBottom: '5px' }}>{f.designation}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {f.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: '#F0FDF9', color: '#08BD80', border: '1px solid #D1FAE5' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function FacultySection() {
  // Duplicate for seamless infinite loop
  const items = [...faculty, ...faculty];

  return (
    <section className="py-8 md:py-14 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: '#F0FDF9', color: '#08BD80' }}>
              Our Faculty
            </span>
            <h2 className="mt-2 font-black text-xl md:text-3xl" style={{ color: '#0D1837' }}>
              Meet Our Expert Faculty
            </h2>
            <p className="text-sm mt-1" style={{ color: '#7A8B94' }}>
              Advocates, NLU alumni &amp; toppers — handpicked for your selection.
            </p>
          </div>
          <a href="/faculty" className="text-sm font-bold flex-shrink-0" style={{ color: '#08BD80' }}>
            See All →
          </a>
        </div>
      </div>

      {/* Auto-scrolling track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div
          className="flex gap-4 faculty-scroll-track"
          style={{ width: 'max-content', paddingLeft: '16px', paddingRight: '16px' }}
        >
          {items.map((f, idx) => (
            <div key={`${f.slug}-${idx}`} style={{ flexShrink: 0 }}>
              <MobileCard f={f} idx={idx % faculty.length} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faculty-scroll-track {
          animation: facultyScroll 28s linear infinite;
        }
        .faculty-scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes facultyScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
