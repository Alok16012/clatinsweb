export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getCourses } from '@/lib/getData';
import BatchForm from '../BatchForm';
import type { Batch } from '@/data/batches';

const emptyBatch: Batch = {
  slug: '',
  courseSlug: '',
  category: 'offline',
  name: '',
  exam: 'CLAT',
  batchCode: '',
  startDate: '',
  endDate: '',
  duration: '',
  schedule: '',
  mode: 'Offline (Patna Center)',
  seats: 30,
  filled: 0,
  fee: '',
  emi: '',
  color: '#08BD80',
  bg: '#E6FAF4',
  status: 'upcoming',
  language: 'Hinglish',
  batchType: 'Target Batch',
  chips: [''],
  faculty: ['A.K. Singh'],
  highlights: [''],
  syllabus: [''],
  description: '',
  details: {
    plans: [],
    aboutDuration: '',
    aboutStrategy: '',
    aboutFeaturesLabel: '',
    aboutFeatures: [],
    strategyHeading: '',
    strategySections: [],
    moreDetails: [],
    faqs: [],
  },
};

export default async function NewBatchPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const courses = await getCourses();
  const courseOptions = courses.map((c) => ({ slug: c.slug, title: c.title, category: c.category }));
  // Pre-select the first course so a new batch links to a real course by default.
  const initial: Batch = { ...emptyBatch, courseSlug: courseOptions[0]?.slug ?? '' };
  return <BatchForm batch={initial} isNew={true} courses={courseOptions} />;
}
