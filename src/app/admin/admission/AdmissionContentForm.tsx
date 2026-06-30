'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminFetch';
import type {
  AdmissionContent,
  AdmissionEnrollment,
  AdmissionFaq,
  AdmissionOption,
  AdmissionRecentStudent,
  AdmissionResource,
  AdmissionScholarshipSlab,
  AdmissionStep,
  AdmissionTestimonial,
  AdmissionTopper,
  AdmissionTrustPoint,
  HomeContent,
} from '@/data/homeContent';
import { FieldGroup, FormActions, SectionCard, StringArrayEditor, TextareaInput, TextInput, Toast } from '@/components/admin/AdminFormHelpers';
import { CheckboxRow, ColorInput, RemoveButton } from '@/components/admin/ContentEditors';

type ToastState = { msg: string; type: 'success' | 'error' } | null;

export default function AdmissionContentForm({ initialContent }: { initialContent: HomeContent }) {
  const router = useRouter();
  const [data, setData] = useState<HomeContent>(initialContent);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const admission = data.admission;

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function setAdmission(next: AdmissionContent) {
    setData((current) => ({ ...current, admission: next }));
  }

  function setSection<K extends keyof AdmissionContent>(key: K, value: AdmissionContent[K]) {
    setAdmission({ ...admission, [key]: value });
  }

  function updateList<T>(items: T[], index: number, nextItem: T): T[] {
    return items.map((item, i) => (i === index ? nextItem : item));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null) as { error?: string } | null;
        throw new Error(payload?.error || 'Failed to save admission page');
      }
      const saved = (await res.json()) as HomeContent;
      setData(saved);
      showToast('Admission page saved!', 'success');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Error saving admission page', 'error');
    }
    setLoading(false);
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admission Page</h1>
          <p className="text-sm text-gray-500 mt-1">Update the admission page with simple labelled fields.</p>
        </div>
        <a href="/admission" target="_blank" className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: '#0D1837' }}>
          View Admission
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
        <SectionCard title="Hero Section">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Eyebrow"><TextInput value={admission.hero.eyebrow} onChange={(value) => setSection('hero', { ...admission.hero, eyebrow: value })} /></FieldGroup>
            <FieldGroup label="Title"><TextInput value={admission.hero.title} onChange={(value) => setSection('hero', { ...admission.hero, title: value })} /></FieldGroup>
            <FieldGroup label="Highlight"><TextInput value={admission.hero.highlight} onChange={(value) => setSection('hero', { ...admission.hero, highlight: value })} /></FieldGroup>
            <FieldGroup label="Description highlight"><TextInput value={admission.hero.descriptionPrefix} onChange={(value) => setSection('hero', { ...admission.hero, descriptionPrefix: value })} /></FieldGroup>
            <FieldGroup label="Primary CTA label"><TextInput value={admission.hero.primaryCta} onChange={(value) => setSection('hero', { ...admission.hero, primaryCta: value })} /></FieldGroup>
            <FieldGroup label="Primary CTA URL"><TextInput value={admission.hero.primaryHref} onChange={(value) => setSection('hero', { ...admission.hero, primaryHref: value })} /></FieldGroup>
            <FieldGroup label="Secondary CTA label"><TextInput value={admission.hero.secondaryCta} onChange={(value) => setSection('hero', { ...admission.hero, secondaryCta: value })} /></FieldGroup>
            <FieldGroup label="Secondary CTA URL"><TextInput value={admission.hero.secondaryHref} onChange={(value) => setSection('hero', { ...admission.hero, secondaryHref: value })} /></FieldGroup>
            <FieldGroup label="Recent card title"><TextInput value={admission.hero.cardTitle} onChange={(value) => setSection('hero', { ...admission.hero, cardTitle: value })} /></FieldGroup>
            <FieldGroup label="Recent card badge"><TextInput value={admission.hero.cardBadge} onChange={(value) => setSection('hero', { ...admission.hero, cardBadge: value })} /></FieldGroup>
            <FieldGroup label="Recent card button"><TextInput value={admission.hero.cardButton} onChange={(value) => setSection('hero', { ...admission.hero, cardButton: value })} /></FieldGroup>
            <FieldGroup label="Recent card button URL"><TextInput value={admission.hero.cardButtonHref} onChange={(value) => setSection('hero', { ...admission.hero, cardButtonHref: value })} /></FieldGroup>
          </div>
          <FieldGroup label="Description text">
            <TextareaInput value={admission.hero.descriptionSuffix} onChange={(value) => setSection('hero', { ...admission.hero, descriptionSuffix: value })} rows={2} />
          </FieldGroup>
          <StringArrayEditor label="Hero badges" items={admission.hero.badges} onChange={(items) => setSection('hero', { ...admission.hero, badges: items })} />
        </SectionCard>

        <SectionCard title="Urgency & Batch Section">
          <FieldGroup label="Urgency strip text">
            <TextareaInput value={admission.urgencyText} onChange={(value) => setSection('urgencyText', value)} rows={2} />
          </FieldGroup>
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Batch eyebrow"><TextInput value={admission.batchSection.eyebrow} onChange={(value) => setSection('batchSection', { ...admission.batchSection, eyebrow: value })} /></FieldGroup>
            <FieldGroup label="Batch title"><TextInput value={admission.batchSection.title} onChange={(value) => setSection('batchSection', { ...admission.batchSection, title: value })} /></FieldGroup>
            <FieldGroup label="Batch subtitle"><TextInput value={admission.batchSection.subtitle} onChange={(value) => setSection('batchSection', { ...admission.batchSection, subtitle: value })} /></FieldGroup>
          </div>
        </SectionCard>

        <EnrollmentEditor
          title="Live Enrollment Popups"
          items={admission.enrollments}
          onChange={(items) => setSection('enrollments', items)}
        />
        <RecentStudentEditor
          title="Recent Enrollment Card"
          items={admission.recentStudents}
          onChange={(items) => setSection('recentStudents', items)}
        />

        <SectionCard title="Admission Process">
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Eyebrow"><TextInput value={admission.processSection.eyebrow} onChange={(value) => setSection('processSection', { ...admission.processSection, eyebrow: value })} /></FieldGroup>
            <FieldGroup label="Title"><TextInput value={admission.processSection.title} onChange={(value) => setSection('processSection', { ...admission.processSection, title: value })} /></FieldGroup>
            <FieldGroup label="Subtitle"><TextInput value={admission.processSection.subtitle} onChange={(value) => setSection('processSection', { ...admission.processSection, subtitle: value })} /></FieldGroup>
          </div>
          <div className="space-y-3">
            {admission.processSection.steps.map((step, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-gray-900">Step {index + 1}</h3>
                  <RemoveButton onClick={() => setSection('processSection', { ...admission.processSection, steps: admission.processSection.steps.filter((_, i) => i !== index) })} />
                </div>
                <div className="grid md:grid-cols-4 gap-3">
                  {(['num', 'icon', 'title'] as (keyof AdmissionStep)[]).map((key) => (
                    <FieldGroup key={key} label={key}>
                      <TextInput value={String(step[key])} onChange={(value) => setSection('processSection', { ...admission.processSection, steps: updateList(admission.processSection.steps, index, { ...step, [key]: value }) })} />
                    </FieldGroup>
                  ))}
                </div>
                <FieldGroup label="Description">
                  <TextareaInput value={step.desc} onChange={(value) => setSection('processSection', { ...admission.processSection, steps: updateList(admission.processSection.steps, index, { ...step, desc: value }) })} rows={2} />
                </FieldGroup>
              </div>
            ))}
          </div>
          <AddButton label="Add Step" onClick={() => setSection('processSection', { ...admission.processSection, steps: [...admission.processSection.steps, { num: String(admission.processSection.steps.length + 1), title: '', desc: '', icon: '✅' }] })} />
        </SectionCard>

        <SectionCard title="Counselling Form">
          <div className="grid md:grid-cols-3 gap-4">
            {(['eyebrow', 'title', 'subtitle', 'successTitle', 'successText', 'submitLabel', 'submittingLabel', 'directCallText', 'responseText'] as (keyof AdmissionContent['formSection'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(admission.formSection[key])} onChange={(value) => setSection('formSection', { ...admission.formSection, [key]: value })} />
              </FieldGroup>
            ))}
          </div>
          <OptionEditor title="Program Dropdown Options" items={admission.formSection.programOptions} onChange={(items) => setSection('formSection', { ...admission.formSection, programOptions: items })} />
          <OptionEditor title="Class Dropdown Options" items={admission.formSection.classOptions} onChange={(items) => setSection('formSection', { ...admission.formSection, classOptions: items })} />
        </SectionCard>

        <SectionCard title="Trust Section">
          <div className="grid md:grid-cols-3 gap-4">
            {(['title', 'subtitle', 'toppersTitle', 'ratingStars', 'ratingScore', 'ratingText', 'callLabel', 'callHref', 'note'] as (keyof AdmissionContent['trustSection'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(admission.trustSection[key])} onChange={(value) => setSection('trustSection', { ...admission.trustSection, [key]: value })} />
              </FieldGroup>
            ))}
          </div>
          <TrustPointEditor items={admission.trustSection.points} onChange={(items) => setSection('trustSection', { ...admission.trustSection, points: items })} />
          <TopperEditor title="Trust Toppers" items={admission.trustSection.toppers} onChange={(items) => setSection('trustSection', { ...admission.trustSection, toppers: items })} />
        </SectionCard>

        <SectionCard title="Scholarship Section">
          <CheckboxRow checked={admission.scholarship.enabled} onChange={(checked) => setSection('scholarship', { ...admission.scholarship, enabled: checked })} label="Show scholarship section" />
          <div className="grid md:grid-cols-3 gap-4">
            {(['date', 'eyebrow', 'title', 'highlight', 'subtitle', 'note', 'slabsTitle', 'cardIcon', 'cardTitle', 'primaryLabel', 'primaryHref', 'secondaryLabel', 'secondaryHref', 'footnote'] as (keyof AdmissionContent['scholarship'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(admission.scholarship[key])} onChange={(value) => setSection('scholarship', { ...admission.scholarship, [key]: value })} />
              </FieldGroup>
            ))}
          </div>
          <FieldGroup label="Card text">
            <TextareaInput value={admission.scholarship.cardText} onChange={(value) => setSection('scholarship', { ...admission.scholarship, cardText: value })} rows={3} />
          </FieldGroup>
          <StringArrayEditor label="Card bullet points" items={admission.scholarship.cardPoints} onChange={(items) => setSection('scholarship', { ...admission.scholarship, cardPoints: items })} />
          <ScholarshipSlabEditor items={admission.scholarship.slabs} onChange={(items) => setSection('scholarship', { ...admission.scholarship, slabs: items })} />
        </SectionCard>

        <SectionCard title="Free Resources">
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Eyebrow"><TextInput value={admission.freeResources.eyebrow} onChange={(value) => setSection('freeResources', { ...admission.freeResources, eyebrow: value })} /></FieldGroup>
            <FieldGroup label="Title"><TextInput value={admission.freeResources.title} onChange={(value) => setSection('freeResources', { ...admission.freeResources, title: value })} /></FieldGroup>
            <FieldGroup label="Subtitle"><TextInput value={admission.freeResources.subtitle} onChange={(value) => setSection('freeResources', { ...admission.freeResources, subtitle: value })} /></FieldGroup>
          </div>
          <ResourceEditor items={admission.freeResources.items} onChange={(items) => setSection('freeResources', { ...admission.freeResources, items })} />
        </SectionCard>

        <SectionCard title="Admission FAQs">
          <div className="grid md:grid-cols-3 gap-4">
            {(['eyebrow', 'title', 'subtitle', 'bottomText', 'primaryLabel', 'primaryHref', 'secondaryLabel', 'secondaryHref'] as (keyof AdmissionContent['faq'])[]).map((key) => (
              <FieldGroup key={key} label={key}>
                <TextInput value={String(admission.faq[key])} onChange={(value) => setSection('faq', { ...admission.faq, [key]: value })} />
              </FieldGroup>
            ))}
          </div>
          <FaqEditor items={admission.faq.items} onChange={(items) => setSection('faq', { ...admission.faq, items })} />
        </SectionCard>

        <SectionCard title="Testimonials">
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Eyebrow"><TextInput value={admission.testimonialsSection.eyebrow} onChange={(value) => setSection('testimonialsSection', { ...admission.testimonialsSection, eyebrow: value })} /></FieldGroup>
            <FieldGroup label="Title"><TextInput value={admission.testimonialsSection.title} onChange={(value) => setSection('testimonialsSection', { ...admission.testimonialsSection, title: value })} /></FieldGroup>
            <FieldGroup label="Subtitle"><TextInput value={admission.testimonialsSection.subtitle} onChange={(value) => setSection('testimonialsSection', { ...admission.testimonialsSection, subtitle: value })} /></FieldGroup>
          </div>
          <TestimonialEditor items={admission.testimonialsSection.testimonials} onChange={(items) => setSection('testimonialsSection', { ...admission.testimonialsSection, testimonials: items })} />
        </SectionCard>

        <SectionCard title="Final CTA & Mobile Sticky Buttons">
          <div className="grid md:grid-cols-3 gap-4">
            {(['eyebrow', 'title', 'subtitle', 'primaryLabel', 'primaryHref', 'secondaryLabel', 'secondaryHref', 'note'] as (keyof AdmissionContent['finalCta'])[]).map((key) => (
              <FieldGroup key={key} label={`Final CTA ${key}`}>
                <TextInput value={String(admission.finalCta[key])} onChange={(value) => setSection('finalCta', { ...admission.finalCta, [key]: value })} />
              </FieldGroup>
            ))}
            {(['callLabel', 'callHref', 'whatsappLabel', 'whatsappHref'] as (keyof AdmissionContent['stickyBar'])[]).map((key) => (
              <FieldGroup key={key} label={`Sticky ${key}`}>
                <TextInput value={String(admission.stickyBar[key])} onChange={(value) => setSection('stickyBar', { ...admission.stickyBar, [key]: value })} />
              </FieldGroup>
            ))}
          </div>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin')} saveLabel="Save Admission Page" />
      </form>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
      + {label}
    </button>
  );
}

function EnrollmentEditor({ title, items, onChange }: { title: string; items: AdmissionEnrollment[]; onChange: (items: AdmissionEnrollment[]) => void }) {
  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="flex justify-between gap-3"><h3 className="font-black text-gray-900">Enrollment {index + 1}</h3><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
            <div className="grid md:grid-cols-4 gap-3">
              {(['name', 'city', 'time', 'program'] as (keyof AdmissionEnrollment)[]).map((key) => (
                <FieldGroup key={key} label={key}><TextInput value={item[key]} onChange={(value) => onChange(updatePlainList(items, index, { ...item, [key]: value }))} /></FieldGroup>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddButton label="Add Enrollment" onClick={() => onChange([...items, { name: '', city: '', time: '', program: '' }])} />
    </SectionCard>
  );
}

function RecentStudentEditor({ title, items, onChange }: { title: string; items: AdmissionRecentStudent[]; onChange: (items: AdmissionRecentStudent[]) => void }) {
  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="flex justify-between gap-3"><h3 className="font-black text-gray-900">Student {index + 1}</h3><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
            <div className="grid md:grid-cols-3 gap-3">
              {(['name', 'city', 'time', 'program', 'avatar'] as (keyof AdmissionRecentStudent)[]).map((key) => (
                <FieldGroup key={key} label={key}><TextInput value={item[key]} onChange={(value) => onChange(updatePlainList(items, index, { ...item, [key]: value }))} /></FieldGroup>
              ))}
              <FieldGroup label="color"><ColorInput value={item.color} onChange={(value) => onChange(updatePlainList(items, index, { ...item, color: value }))} /></FieldGroup>
            </div>
          </div>
        ))}
      </div>
      <AddButton label="Add Student" onClick={() => onChange([...items, { name: '', city: '', time: '', program: '', avatar: '', color: '#f77420' }])} />
    </SectionCard>
  );
}

function OptionEditor({ title, items, onChange }: { title: string; items: AdmissionOption[]; onChange: (items: AdmissionOption[]) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-black text-gray-900">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="grid md:grid-cols-[1fr_2fr_auto] gap-3 items-end">
          <FieldGroup label="Value"><TextInput value={item.value} onChange={(value) => onChange(updatePlainList(items, index, { ...item, value }))} /></FieldGroup>
          <FieldGroup label="Label"><TextInput value={item.label} onChange={(value) => onChange(updatePlainList(items, index, { ...item, label: value }))} /></FieldGroup>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
        </div>
      ))}
      <AddButton label="Add Option" onClick={() => onChange([...items, { value: '', label: '' }])} />
    </div>
  );
}

function TrustPointEditor({ items, onChange }: { items: AdmissionTrustPoint[]; onChange: (items: AdmissionTrustPoint[]) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-black text-gray-900">Trust Points</h3>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between"><h4 className="font-bold text-gray-700">Point {index + 1}</h4><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
          <div className="grid md:grid-cols-3 gap-3">
            <FieldGroup label="Icon"><TextInput value={item.icon} onChange={(value) => onChange(updatePlainList(items, index, { ...item, icon: value }))} /></FieldGroup>
            <FieldGroup label="Title"><TextInput value={item.title} onChange={(value) => onChange(updatePlainList(items, index, { ...item, title: value }))} /></FieldGroup>
            <FieldGroup label="Description"><TextInput value={item.desc} onChange={(value) => onChange(updatePlainList(items, index, { ...item, desc: value }))} /></FieldGroup>
          </div>
        </div>
      ))}
      <AddButton label="Add Trust Point" onClick={() => onChange([...items, { icon: '✅', title: '', desc: '' }])} />
    </div>
  );
}

function TopperEditor({ title, items, onChange }: { title: string; items: AdmissionTopper[]; onChange: (items: AdmissionTopper[]) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-black text-gray-900">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between"><h4 className="font-bold text-gray-700">Topper {index + 1}</h4><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
          <div className="grid md:grid-cols-3 gap-3">
            {(['name', 'air', 'college', 'avatar'] as (keyof AdmissionTopper)[]).map((key) => (
              <FieldGroup key={key} label={key}><TextInput value={item[key]} onChange={(value) => onChange(updatePlainList(items, index, { ...item, [key]: value }))} /></FieldGroup>
            ))}
            <FieldGroup label="color"><ColorInput value={item.color} onChange={(value) => onChange(updatePlainList(items, index, { ...item, color: value }))} /></FieldGroup>
          </div>
        </div>
      ))}
      <AddButton label="Add Topper" onClick={() => onChange([...items, { name: '', air: '', college: '', avatar: '', color: '#f77420' }])} />
    </div>
  );
}

function TestimonialEditor({ items, onChange }: { items: AdmissionTestimonial[]; onChange: (items: AdmissionTestimonial[]) => void }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between"><h4 className="font-bold text-gray-700">Testimonial {index + 1}</h4><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
          <div className="grid md:grid-cols-3 gap-3">
            {(['name', 'air', 'college', 'year', 'avatar'] as (keyof AdmissionTestimonial)[]).map((key) => (
              <FieldGroup key={key} label={key}><TextInput value={String(item[key])} onChange={(value) => onChange(updatePlainList(items, index, { ...item, [key]: value }))} /></FieldGroup>
            ))}
            <FieldGroup label="stars"><TextInput value={String(item.stars)} onChange={(value) => onChange(updatePlainList(items, index, { ...item, stars: Number(value) || 5 }))} /></FieldGroup>
            <FieldGroup label="color"><ColorInput value={item.color} onChange={(value) => onChange(updatePlainList(items, index, { ...item, color: value }))} /></FieldGroup>
          </div>
          <FieldGroup label="Quote"><TextareaInput value={item.quote} onChange={(value) => onChange(updatePlainList(items, index, { ...item, quote: value }))} rows={3} /></FieldGroup>
        </div>
      ))}
      <AddButton label="Add Testimonial" onClick={() => onChange([...items, { name: '', air: '', college: '', year: '', avatar: '', color: '#f77420', quote: '', stars: 5 }])} />
    </div>
  );
}

function ScholarshipSlabEditor({ items, onChange }: { items: AdmissionScholarshipSlab[]; onChange: (items: AdmissionScholarshipSlab[]) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-black text-gray-900">Scholarship Slabs</h3>
      {items.map((item, index) => (
        <div key={index} className="grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-3 items-end">
          <FieldGroup label="Marks"><TextInput value={item.marks} onChange={(value) => onChange(updatePlainList(items, index, { ...item, marks: value }))} /></FieldGroup>
          <FieldGroup label="Discount"><TextInput value={item.discount} onChange={(value) => onChange(updatePlainList(items, index, { ...item, discount: value }))} /></FieldGroup>
          <FieldGroup label="Badge"><TextInput value={item.badge} onChange={(value) => onChange(updatePlainList(items, index, { ...item, badge: value }))} /></FieldGroup>
          <FieldGroup label="BG"><ColorInput value={item.bg} onChange={(value) => onChange(updatePlainList(items, index, { ...item, bg: value }))} /></FieldGroup>
          <FieldGroup label="Color"><ColorInput value={item.color} onChange={(value) => onChange(updatePlainList(items, index, { ...item, color: value }))} /></FieldGroup>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
        </div>
      ))}
      <AddButton label="Add Slab" onClick={() => onChange([...items, { marks: '', discount: '', bg: '#fff1e8', color: '#f77420', badge: '' }])} />
    </div>
  );
}

function ResourceEditor({ items, onChange }: { items: AdmissionResource[]; onChange: (items: AdmissionResource[]) => void }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between"><h4 className="font-bold text-gray-700">Resource {index + 1}</h4><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
          <div className="grid md:grid-cols-3 gap-3">
            {(['icon', 'title', 'cta', 'href'] as (keyof AdmissionResource)[]).map((key) => (
              <FieldGroup key={key} label={key}><TextInput value={String(item[key])} onChange={(value) => onChange(updatePlainList(items, index, { ...item, [key]: value }))} /></FieldGroup>
            ))}
            <FieldGroup label="color"><ColorInput value={item.color} onChange={(value) => onChange(updatePlainList(items, index, { ...item, color: value }))} /></FieldGroup>
            <FieldGroup label="background"><ColorInput value={item.bg} onChange={(value) => onChange(updatePlainList(items, index, { ...item, bg: value }))} /></FieldGroup>
          </div>
          <FieldGroup label="Description"><TextareaInput value={item.desc} onChange={(value) => onChange(updatePlainList(items, index, { ...item, desc: value }))} rows={2} /></FieldGroup>
        </div>
      ))}
      <AddButton label="Add Resource" onClick={() => onChange([...items, { icon: '📚', title: '', desc: '', cta: '', href: '', color: '#f77420', bg: '#fff1e8' }])} />
    </div>
  );
}

function FaqEditor({ items, onChange }: { items: AdmissionFaq[]; onChange: (items: AdmissionFaq[]) => void }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between"><h4 className="font-bold text-gray-700">FAQ {index + 1}</h4><RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} /></div>
          <FieldGroup label="Question"><TextInput value={item.q} onChange={(value) => onChange(updatePlainList(items, index, { ...item, q: value }))} /></FieldGroup>
          <FieldGroup label="Answer"><TextareaInput value={item.a} onChange={(value) => onChange(updatePlainList(items, index, { ...item, a: value }))} rows={3} /></FieldGroup>
        </div>
      ))}
      <AddButton label="Add FAQ" onClick={() => onChange([...items, { q: '', a: '' }])} />
    </div>
  );
}

function updatePlainList<T>(items: T[], index: number, nextItem: T): T[] {
  return items.map((item, i) => (i === index ? nextItem : item));
}
