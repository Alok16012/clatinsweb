'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminFetch';
import type { HomeContent, SitePageBanner, SiteSocial } from '@/data/homeContent';
import { FieldGroup, FormActions, SectionCard, TextareaInput, TextInput, Toast } from '@/components/admin/AdminFormHelpers';
import { CheckboxRow, ColorInput, LinkListEditor, RemoveButton } from '@/components/admin/ContentEditors';

type ToastState = { msg: string; type: 'success' | 'error' } | null;

export default function FooterContentForm({ initialContent }: { initialContent: HomeContent }) {
  const router = useRouter();
  const [data, setData] = useState<HomeContent>(initialContent);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function setSite<K extends keyof HomeContent['site']>(key: K, value: HomeContent['site'][K]) {
    setData((current) => ({ ...current, site: { ...current.site, [key]: value } }));
  }

  function updateSocial(index: number, social: SiteSocial) {
    setSite('socials', data.site.socials.map((item, i) => (i === index ? social : item)));
  }

  function updateBanner(index: number, banner: SitePageBanner) {
    setSite('pageBanners', data.site.pageBanners.map((item, i) => (i === index ? banner : item)));
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
        throw new Error(payload?.error || 'Failed to save global settings');
      }
      const saved = (await res.json()) as HomeContent;
      setData(saved);
      showToast('Footer and global settings saved!', 'success');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Error saving footer settings', 'error');
    }
    setLoading(false);
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Footer & Global Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Update logo, navbar, mobile menu, footer links, socials, phone and page banners with simple labelled fields.</p>
        </div>
        <a href="/" target="_blank" className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: '#0D1837' }}>
          View Website
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
        <SectionCard title="Brand & Contact">
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Logo URL">
              <TextInput value={data.site.logoSrc} onChange={(value) => setSite('logoSrc', value)} placeholder="/logo.png" />
            </FieldGroup>
            <FieldGroup label="Logo alt text">
              <TextInput value={data.site.logoAlt} onChange={(value) => setSite('logoAlt', value)} placeholder="CLATians" />
            </FieldGroup>
            <FieldGroup label="Phone">
              <TextInput value={data.site.phone} onChange={(value) => setSite('phone', value)} placeholder="8507700177" />
            </FieldGroup>
            <FieldGroup label="WhatsApp with country code">
              <TextInput value={data.site.whatsapp} onChange={(value) => setSite('whatsapp', value)} placeholder="918507700177" />
            </FieldGroup>
            <FieldGroup label="Mobile predictor label">
              <TextInput value={data.site.mobilePredictorLabel} onChange={(value) => setSite('mobilePredictorLabel', value)} />
            </FieldGroup>
            <FieldGroup label="Mobile predictor link">
              <TextInput value={data.site.mobilePredictorHref} onChange={(value) => setSite('mobilePredictorHref', value)} />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Navbar">
          <LinkListEditor title="Desktop Navbar Links" items={data.site.desktopNav} onChange={(items) => setSite('desktopNav', items)} allowChildren />
          <LinkListEditor title="Desktop CTA Buttons" items={data.site.desktopCtas} onChange={(items) => setSite('desktopCtas', items)} />
          <LinkListEditor title="Mobile Menu Links" items={data.site.mobileMenu} onChange={(items) => setSite('mobileMenu', items)} withIcon />
          <LinkListEditor title="Mobile Bottom Navigation" items={data.site.mobileBottomNav} onChange={(items) => setSite('mobileBottomNav', items)} withIcon withColor />
        </SectionCard>

        <SectionCard title="Footer Text">
          <FieldGroup label="Desktop footer description">
            <TextareaInput value={data.site.footerDescription} onChange={(value) => setSite('footerDescription', value)} rows={3} />
          </FieldGroup>
          <FieldGroup label="Mobile footer description">
            <TextareaInput value={data.site.footerMobileDescription} onChange={(value) => setSite('footerMobileDescription', value)} rows={3} />
          </FieldGroup>
          <div className="grid md:grid-cols-4 gap-4">
            <FieldGroup label="Copyright">
              <TextInput value={data.site.footerCopyright} onChange={(value) => setSite('footerCopyright', value)} />
            </FieldGroup>
            <FieldGroup label="Courses column title">
              <TextInput value={data.site.footerCoursesTitle} onChange={(value) => setSite('footerCoursesTitle', value)} />
            </FieldGroup>
            <FieldGroup label="Exams column title">
              <TextInput value={data.site.footerExamsTitle} onChange={(value) => setSite('footerExamsTitle', value)} />
            </FieldGroup>
            <FieldGroup label="Quick links column title">
              <TextInput value={data.site.footerQuickLinksTitle} onChange={(value) => setSite('footerQuickLinksTitle', value)} />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Footer Links">
          <LinkListEditor title="Course Links" items={data.site.footerCourses} onChange={(items) => setSite('footerCourses', items)} />
          <LinkListEditor title="Exam Links" items={data.site.footerExams} onChange={(items) => setSite('footerExams', items)} />
          <LinkListEditor title="Quick Links" items={data.site.footerQuickLinks} onChange={(items) => setSite('footerQuickLinks', items)} />
        </SectionCard>

        <SectionCard title="Social Links">
          <div className="space-y-3">
            {data.site.socials.map((social, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-gray-900">Social {index + 1}</h3>
                  <RemoveButton onClick={() => setSite('socials', data.site.socials.filter((_, i) => i !== index))} />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <FieldGroup label="Label">
                    <TextInput value={social.label} onChange={(value) => updateSocial(index, { ...social, label: value })} />
                  </FieldGroup>
                  <FieldGroup label="URL">
                    <TextInput value={social.href} onChange={(value) => updateSocial(index, { ...social, href: value })} />
                  </FieldGroup>
                  <FieldGroup label="Icon">
                    <TextInput value={social.icon} onChange={(value) => updateSocial(index, { ...social, icon: value })} />
                  </FieldGroup>
                  <FieldGroup label="Icon color">
                    <ColorInput value={social.color} onChange={(value) => updateSocial(index, { ...social, color: value })} />
                  </FieldGroup>
                  <FieldGroup label="Background CSS/color">
                    <TextInput value={social.bg} onChange={(value) => updateSocial(index, { ...social, bg: value })} />
                  </FieldGroup>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSite('socials', [...data.site.socials, { label: '', href: '#', icon: '', color: '#f77420', bg: 'rgba(247,116,32,0.12)' }])}
            className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed"
            style={{ borderColor: '#f77420', color: '#f77420' }}
          >
            + Add Social
          </button>
        </SectionCard>

        <SectionCard title="Page Banners">
          <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">
            Enable a custom banner on any managed page. Keep disabled if you do not want an extra banner.
          </div>
          <div className="space-y-3">
            {data.site.pageBanners.map((banner, index) => (
              <div key={banner.key} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-gray-900">{banner.key}</h3>
                  <CheckboxRow checked={banner.enabled} onChange={(checked) => updateBanner(index, { ...banner, enabled: checked })} label="Show banner" />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <FieldGroup label="Eyebrow">
                    <TextInput value={banner.eyebrow} onChange={(value) => updateBanner(index, { ...banner, eyebrow: value })} />
                  </FieldGroup>
                  <FieldGroup label="Title">
                    <TextInput value={banner.title} onChange={(value) => updateBanner(index, { ...banner, title: value })} />
                  </FieldGroup>
                  <FieldGroup label="CTA label">
                    <TextInput value={banner.ctaLabel} onChange={(value) => updateBanner(index, { ...banner, ctaLabel: value })} />
                  </FieldGroup>
                  <FieldGroup label="CTA URL">
                    <TextInput value={banner.ctaHref} onChange={(value) => updateBanner(index, { ...banner, ctaHref: value })} />
                  </FieldGroup>
                </div>
                <FieldGroup label="Subtitle">
                  <TextareaInput value={banner.subtitle} onChange={(value) => updateBanner(index, { ...banner, subtitle: value })} rows={2} />
                </FieldGroup>
              </div>
            ))}
          </div>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin')} saveLabel="Save Footer & Global Settings" />
      </form>
    </div>
  );
}
