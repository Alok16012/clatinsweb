'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'What is the exam pattern for CLAT 2026?',
    a: 'CLAT 2026 is a 2-hour Computer Based Test (CBT) with 120 questions across five sections: English Language (22–26 Qs), Current Affairs & GK (28–32 Qs), Legal Reasoning (28–32 Qs), Logical Reasoning (22–26 Qs), and Quantitative Techniques (10–14 Qs). Each correct answer awards 1 mark; -0.25 for every wrong answer.',
  },
  {
    q: 'When is the CLAT 2026 exam scheduled?',
    a: 'CLAT 2026 is expected in December 2025. The official notification is typically released around August–September. CLATians keeps you updated with the latest dates and notifications.',
  },
  {
    q: 'What are the eligibility criteria for CLAT UG?',
    a: 'Candidates must have passed Class 12 or equivalent. General/OBC/NRI candidates need minimum 45% marks; SC/ST candidates need 40%. There is no upper age limit for the CLAT UG programme.',
  },
  {
    q: 'How many NLUs participate in CLAT?',
    a: 'Currently 23 National Law Universities participate in CLAT. This includes NLSIU Bangalore, NALSAR Hyderabad, NLIU Bhopal, WBNUJS Kolkata, NLU Jodhpur and many more — offering 2700+ UG seats combined.',
  },
  {
    q: 'Does CLATians provide mock tests for CLAT 2026?',
    a: 'Yes! CLATians offers 10, 20 and 40 full-length CLAT mock test bundles. Each test simulates the real exam with detailed solutions, section-wise analytics, all-India rank, and performance tracking.',
  },
  {
    q: 'Can I join CLATians if I am in Class 11?',
    a: 'Absolutely! CLATians\' Foundation batch (CLAT 2027) is designed for Class 11 students. Starting early gives you more time to build concepts, attempt more mocks, and secure a top NLU rank.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-8 md:py-14" style={{ background: '#F7F9FB' }}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-700 uppercase tracking-widest mb-2" style={{ color: '#08BD80' }}>FAQ</p>
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#3C4852' }}>
            {"Frequently Asked Questions"}
          </h2>
          <p className="mt-3 text-base" style={{ color: '#7A8B94' }}>
            Everything you need to know about CLAT preparation at CLATians.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              className="rounded-xl overflow-hidden border transition-all"
              style={{
                borderColor: open === i ? '#08BD80' : '#E9EEF2',
                background: 'white',
              }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                style={{ background: open === i ? '#F0FDF9' : 'white' }}>
                <span className="font-semibold text-sm md:text-base pr-4" style={{ color: '#3C4852' }}>
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all"
                  style={{ background: open === i ? '#08BD80' : '#E9EEF2', color: open === i ? 'white' : '#7A8B94' }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-2 text-sm md:text-base leading-relaxed border-t animate-fade-in"
                  style={{ borderColor: '#E6FAF4', color: '#5a6a75', background: '#F0FDF9' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-2xl p-6 md:p-8 text-center" style={{ background: '#3C4852' }}>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-black text-xl text-white">Still have questions?</h3>
          <p className="mt-2 text-sm" style={{ color: '#9CA3AF' }}>
            Talk to our counsellors — free guidance for CLAT 2026 preparation.
          </p>
          <a href="tel:8507700177"
            className="mt-5 inline-block px-8 py-3 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ background: '#08BD80' }}>
            📞 Call: 8507700177
          </a>
        </div>
      </div>
    </section>
  );
}
