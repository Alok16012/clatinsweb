'use client';
import { useState, useEffect, useRef } from 'react';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

const services = [
  {
    icon: '📚',
    color: '#0f3460',
    accent: '#08BD80',
    title: 'Live & Recorded Classes',
    desc: 'Daily expert faculty sessions + 600+ hours of recorded lectures accessible 24/7 on the app.',
    stat: 600, statSuffix: '+ hrs', statLabel: 'Recorded Content',
    tags: ['Live Daily', 'HD Video', 'Downloadable'],
    link: '/courses/online',
  },
  {
    icon: '📝',
    color: '#6d28d9',
    accent: '#8b5cf6',
    title: 'Full-Length Mock Tests',
    desc: 'Attempt up to 40 CLAT mock tests simulating real exam conditions with AI-powered analytics.',
    stat: 40, statSuffix: '', statLabel: 'Mock Tests',
    tags: ['AI Analysis', 'Rank Predictor', 'Peer Compare'],
    link: '/courses/mock-tests',
  },
  {
    icon: '💬',
    color: '#065f46',
    accent: '#34d399',
    title: 'Doubt Clearing Sessions',
    desc: 'Daily offline doubt sessions at Patna center + weekly live doubt clearing for online students.',
    stat: 7, statSuffix: 'x/week', statLabel: 'Sessions',
    tags: ['Offline + Online', 'WhatsApp Support', 'NLU Mentors'],
    link: '/courses/offline',
  },
];

const appFeatures = [
  'Interactive live classes with real faculty',
  'Mock tests and practice questions',
  'High-quality notes & PDF material',
  'Daily doubt solving on WhatsApp',
];

function ServiceCard({ s, idx, active }: { s: typeof services[number]; idx: number; active: boolean }) {
  const [hov, setHov] = useState(false);
  const count = useCounter(s.stat, 1200, active);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `linear-gradient(135deg, ${s.color}f0, ${s.color}cc)` : 'white',
        border: `1.5px solid ${hov ? s.accent + '55' : '#E9EEF2'}`,
        borderRadius: '20px',
        padding: '24px',
        transition: 'all .3s ease',
        boxShadow: hov ? `0 16px 40px ${s.color}33` : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-6px)' : `translateY(0)`,
        animationDelay: `${idx * 0.12}s`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg glow */}
      {hov && (
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: s.accent, opacity: 0.08, filter: 'blur(40px)', pointerEvents: 'none' }} />
      )}

      {/* Top row: icon + stat */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: hov ? 'rgba(255,255,255,0.15)' : `${s.accent}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', transition: 'all .3s',
          ...(hov ? { animation: 'iconFloat 2s ease-in-out infinite' } : {}),
        }}>
          {s.icon}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: hov ? 'white' : s.accent, lineHeight: 1, transition: 'color .3s' }}>
            {count}{s.statSuffix}
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: hov ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>
            {s.statLabel}
          </div>
        </div>
      </div>

      {/* Title */}
      <div style={{ fontSize: '17px', fontWeight: 800, color: hov ? 'white' : '#0D1837', lineHeight: 1.3, marginBottom: '8px', transition: 'color .3s' }}>
        {s.title}
      </div>

      {/* Desc */}
      <div style={{ fontSize: '13px', color: hov ? 'rgba(255,255,255,0.7)' : '#6B7280', lineHeight: 1.65, marginBottom: '16px', transition: 'color .3s' }}>
        {s.desc}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {s.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
            background: hov ? 'rgba(255,255,255,0.15)' : `${s.accent}15`,
            color: hov ? 'rgba(255,255,255,0.9)' : s.accent,
            border: `1px solid ${hov ? 'rgba(255,255,255,0.2)' : s.accent + '30'}`,
            transition: 'all .3s',
          }}>{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href={s.link} style={{
          fontSize: '13px', fontWeight: 700, color: hov ? 'white' : s.accent,
          textDecoration: 'none', transition: 'color .3s',
        }}>
          Learn more
        </a>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: hov ? 'rgba(255,255,255,0.2)' : `${s.accent}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', color: hov ? 'white' : s.accent,
          transition: 'all .3s',
          transform: hov ? 'translateX(3px)' : 'none',
        }}>→</div>
      </div>
    </div>
  );
}

export default function FeaturedServices() {
  const { ref: cardsRef, visible: cardsVisible } = useReveal(0.1);
  const { ref: appRef, visible: appVisible } = useReveal(0.1);

  return (
    <>
      <style>{`
        @keyframes iconFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.6);opacity:0}}
      `}</style>

      <section style={{ background: '#F8FAFC', padding: '52px 0 48px' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">

          {/* Header */}
          <div ref={cardsRef} style={{
            textAlign: 'center', marginBottom: '32px',
            opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px', padding: '5px 14px', borderRadius: '99px', background: 'rgba(8,189,128,0.1)', border: '1px solid rgba(8,189,128,0.2)' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#08BD80', display: 'inline-block' }} />
              <span style={{ color: '#08BD80', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>What We Offer</span>
            </div>
            <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.2, marginBottom: '6px' }}>
              Everything You Need to <span style={{ color: '#08BD80' }}>Crack CLAT</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: '14px', maxWidth: '460px', margin: '0 auto' }}>
              Comprehensive tools built for every stage of your CLAT preparation.
            </p>
          </div>

          {/* 3 cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px',
            opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity .7s ease .1s, transform .7s ease .1s',
          }}>
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} idx={i} active={cardsVisible} />
            ))}
          </div>

          {/* App Banner */}
          <div ref={appRef} style={{
            marginTop: '24px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #0D1837 0%, #0f3460 50%, #0D1837 100%)',
            overflow: 'hidden', position: 'relative',
            opacity: appVisible ? 1 : 0, transform: appVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}>
            {/* BG orbs */}
            <div style={{ position: 'absolute', top: '-60px', right: '200px', width: '200px', height: '200px', borderRadius: '50%', background: '#08BD80', opacity: 0.06, filter: 'blur(50px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '100px', width: '160px', height: '160px', borderRadius: '50%', background: '#3b82f6', opacity: 0.07, filter: 'blur(40px)', pointerEvents: 'none' }} />

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              {/* Left content */}
              <div style={{ flex: 1, minWidth: '260px', padding: '36px 40px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(8,189,128,0.15)', border: '1px solid rgba(8,189,128,0.3)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#08BD80', display: 'inline-block' }} />
                  <span style={{ color: '#08BD80', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Online Preparation</span>
                </div>
                <h3 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 30px)', lineHeight: 1.2, marginBottom: '16px' }}>
                  Study anytime,<br />
                  <span style={{ background: 'linear-gradient(90deg,#08BD80,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>anywhere</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {appFeatures.map((item, i) => (
                    <div key={item} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      opacity: appVisible ? 1 : 0, transform: appVisible ? 'none' : 'translateX(-12px)',
                      transition: `opacity .5s ease ${0.2 + i * 0.08}s, transform .5s ease ${0.2 + i * 0.08}s`,
                    }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#08BD80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: 'white', fontSize: '10px', fontWeight: 800 }}>✓</span>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="/courses/online" style={{
                    padding: '11px 22px', borderRadius: '12px', fontWeight: 700, fontSize: '13px',
                    background: '#08BD80', color: 'white', textDecoration: 'none', transition: 'opacity .2s',
                  }}>
                    Start Online Course →
                  </a>
                  <a href="tel:8507700177" style={{
                    padding: '11px 18px', borderRadius: '12px', fontWeight: 600, fontSize: '13px',
                    border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                  }}>
                    📞 Call Us
                  </a>
                </div>
              </div>

              {/* Right: App card */}
              <div style={{ width: '260px', flexShrink: 0, padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Phone mockup */}
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg,#08BD80,#065f46)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: '0 12px 32px rgba(8,189,128,0.4)' }}>
                    📱
                  </div>
                  {/* Pulse rings */}
                  <div style={{ position: 'absolute', inset: '-8px', borderRadius: '28px', border: '2px solid rgba(8,189,128,0.3)', animation: 'pulseRing 2s ease-out infinite' }} />
                  <div style={{ position: 'absolute', inset: '-8px', borderRadius: '28px', border: '2px solid rgba(8,189,128,0.2)', animation: 'pulseRing 2s ease-out .5s infinite' }} />
                </div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>CLATians App</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '18px' }}>Download for iOS & Android</div>

                {/* Rating badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '99px', background: 'rgba(8,189,128,0.15)', border: '1px solid rgba(8,189,128,0.3)', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px' }}>⭐</span>
                  <span style={{ color: '#08BD80', fontWeight: 800, fontSize: '13px' }}>4.9</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>/ 5 Rating</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  {[
                    { icon: '🍎', label: 'App Store', sub: 'iOS' },
                    { icon: '▶', label: 'Google Play', sub: 'Android' },
                  ].map(btn => (
                    <div key={btn.label} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                      cursor: 'pointer',
                    }}>
                      <span style={{ fontSize: '16px' }}>{btn.icon}</span>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{btn.sub}</div>
                        <div style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>{btn.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
