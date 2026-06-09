'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/data/courses';
import { adminFetch } from '@/lib/adminFetch';
import {
  FieldGroup, TextInput, TextareaInput,
  SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';

export default function CourseEditForm({ course, isNew }: { course: Course; isNew: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<Course>({ ...course });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  function set<K extends keyof Course>(key: K, val: Course[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/courses' : `/api/admin/courses/${course.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await adminFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save');
      showToast(isNew ? 'Course created!' : 'Course saved!', 'success');
      setTimeout(() => router.push('/admin/courses'), 1000);
    } catch {
      showToast('Error saving course', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this course? This cannot be undone.')) return;
    setLoading(true);
    await adminFetch(`/api/admin/courses/${course.slug}`, { method: 'DELETE' });
    router.push('/admin/courses');
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 transition-colors">
          ← Back
        </button>
        <h1 className="text-2xl font-black text-gray-900">{isNew ? 'New Course' : `Edit: ${course.title}`}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="ml-auto text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
            🗑 Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Info */}
        <SectionCard title="Basic Information">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Course Title">
              <TextInput value={data.title} onChange={(v) => set('title', v)} placeholder="e.g. Offline CLAT Course" required />
            </FieldGroup>
            <FieldGroup label="Slug (URL key)">
              <TextInput value={data.slug} onChange={(v) => set('slug', v)} placeholder="e.g. clat-offline" required />
            </FieldGroup>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Category">
              <select
                value={data.category}
                onChange={(e) => set('category', e.target.value as Course['category'])}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
              >
                <option value="offline">🏫 Offline</option>
                <option value="online">💻 Online</option>
                <option value="mentorship">🎯 Mentorship</option>
                <option value="mock">📝 Mock Tests</option>
              </select>
            </FieldGroup>
            <FieldGroup label="Mode">
              <TextInput value={data.mode} onChange={(v) => set('mode', v)} placeholder="e.g. In-person at Patna Center" />
            </FieldGroup>
          </div>
          <FieldGroup label="Tagline">
            <TextInput value={data.tagline} onChange={(v) => set('tagline', v)} placeholder="Short one-line description" />
          </FieldGroup>
          <FieldGroup label="Overview">
            <TextareaInput value={data.overview} onChange={(v) => set('overview', v)} placeholder="Full description..." rows={5} />
          </FieldGroup>
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Icon (emoji)">
              <TextInput value={data.icon} onChange={(v) => set('icon', v)} placeholder="📚" />
            </FieldGroup>
            <FieldGroup label="Accent Color">
              <div className="flex gap-2 items-center">
                <input type="color" value={data.color} onChange={(e) => set('color', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
                <TextInput value={data.color} onChange={(v) => set('color', v)} placeholder="#08BD80" />
              </div>
            </FieldGroup>
            <FieldGroup label="Card Background Color">
              <div className="flex gap-2 items-center">
                <input type="color" value={data.bg} onChange={(e) => set('bg', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
                <TextInput value={data.bg} onChange={(v) => set('bg', v)} placeholder="#E6FAF4" />
              </div>
            </FieldGroup>
          </div>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/courses')} saveLabel={isNew ? 'Create Course' : 'Save Changes'} />
      </form>
    </div>
  );
}
