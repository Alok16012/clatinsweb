const faculty = [
  {
    name: 'Adv. Ravi Kumar',
    designation: 'CLAT Expert',
    subject: 'Legal Reasoning',
    rating: 4.9,
    students: '2,400+',
    experience: '12 yrs',
    avatar: 'RK',
  },
  {
    name: 'Adv. Priya Singh',
    designation: 'AILET Expert',
    subject: 'English',
    rating: 4.8,
    students: '1,800+',
    experience: '9 yrs',
    avatar: 'PS',
  },
  {
    name: 'Adv. Arjun Sharma',
    designation: 'CUET Expert',
    subject: 'Maths & Logical Reasoning',
    rating: 4.9,
    students: '1,200+',
    experience: '7 yrs',
    avatar: 'AS',
  },
  {
    name: 'Dr. Neha Verma',
    designation: 'GK Specialist',
    subject: 'GK & Current Affairs',
    rating: 5.0,
    students: '3,100+',
    experience: '10 yrs',
    avatar: 'NV',
  },
  {
    name: 'Adv. Sahil Gupta',
    designation: 'AILET Expert',
    subject: 'Legal Aptitude',
    rating: 4.8,
    students: '900+',
    experience: '6 yrs',
    avatar: 'SG',
  },
  {
    name: 'Ms. Kavya Nair',
    designation: 'MH-CET Expert',
    subject: 'Comprehension',
    rating: 4.7,
    students: '750+',
    experience: '5 yrs',
    avatar: 'KN',
  },
  {
    name: 'Adv. Rohit Mishra',
    designation: 'CLAT Expert',
    subject: 'Logical Reasoning',
    rating: 4.9,
    students: '1,500+',
    experience: '8 yrs',
    avatar: 'RM',
  },
  {
    name: 'Dr. Ankita Roy',
    designation: 'Constitution Specialist',
    subject: 'Polity & Constitution',
    rating: 5.0,
    students: '2,200+',
    experience: '11 yrs',
    avatar: 'AR',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm" style={{ color: '#08BD80' }}>
        {'★'.repeat(Math.floor(rating))}
        {rating % 1 !== 0 ? '½' : ''}
      </span>
      <span className="text-xs font-bold" style={{ color: '#3C4852' }}>
        {rating}
      </span>
    </div>
  );
}

export default function FacultySection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2
              className="text-3xl mb-2"
              style={{ color: '#3C4852', fontWeight: 800 }}
            >
              Learn from the best
            </h2>
            <p className="text-base" style={{ color: '#7A8B94' }}>
              Advocates, NLU alumni &amp; toppers — handpicked for your selection.
            </p>
          </div>
          <a href="/faculty" className="see-all flex items-center gap-1 flex-shrink-0 mb-1">
            SEE ALL →
          </a>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {faculty.map((f) => (
            <div
              key={f.name}
              className="bg-white rounded-xl p-6 card-hover flex flex-col gap-4"
              style={{ border: '1px solid #E9EEF2', borderRadius: '12px' }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0"
                style={{ background: '#E9EEF2', color: '#08BD80' }}
              >
                {f.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-sm" style={{ color: '#3C4852' }}>
                  {f.name}
                </h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#08BD80' }}>
                  {f.designation}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                  {f.subject}
                </p>
                <div className="mt-2">
                  <StarRating rating={f.rating} />
                </div>
              </div>

              {/* Stats */}
              <div
                className="flex items-center gap-3 text-xs border-t pt-3"
                style={{ color: '#9CA3AF', borderColor: '#E9EEF2' }}
              >
                <span>👥 {f.students}</span>
                <span>·</span>
                <span>{f.experience}</span>
              </div>

              {/* View Profile link */}
              <a
                href="#"
                className="text-xs font-semibold"
                style={{ color: '#08BD80' }}
              >
                View Profile →
              </a>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none">
            {faculty.map((f) => (
              <div
                key={f.name}
                className="flex-shrink-0 w-48 bg-white rounded-xl p-4 shadow-sm"
                style={{ border: '1px solid #E9EEF2' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mb-3"
                  style={{ background: '#E9EEF2', color: '#08BD80' }}
                >
                  {f.avatar}
                </div>
                <div className="font-bold text-xs mb-0.5" style={{ color: '#3C4852' }}>
                  {f.name}
                </div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: '#08BD80' }}>
                  {f.designation}
                </div>
                <div className="text-[10px] mb-2" style={{ color: '#9CA3AF' }}>
                  {f.subject}
                </div>
                <StarRating rating={f.rating} />
                <div className="text-[10px] mt-2" style={{ color: '#9CA3AF' }}>
                  👥 {f.students} · {f.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
