export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getHomeContent } from '@/lib/getData';
import FooterContentForm from './FooterContentForm';

export default async function AdminFooterPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const content = await getHomeContent();
  return <FooterContentForm initialContent={content} />;
}
