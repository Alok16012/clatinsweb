export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getBatches, getCourses } from '@/lib/getData';
import BatchForm from '../BatchForm';

export default async function EditBatchPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const [batches, courses] = await Promise.all([getBatches(), getCourses()]);
  const batch = batches.find((b) => b.slug === slug);
  if (!batch) notFound();
  const courseOptions = courses.map((c) => ({ slug: c.slug, title: c.title, category: c.category }));
  return <BatchForm batch={batch} isNew={false} courses={courseOptions} />;
}
