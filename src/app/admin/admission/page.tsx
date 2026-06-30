export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getHomeContent } from '@/lib/getData';
import AdmissionContentForm from './AdmissionContentForm';

export default async function AdminAdmissionPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const content = await getHomeContent();
  return <AdmissionContentForm initialContent={content} />;
}
