export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getHomeContent } from '@/lib/getData';
import HomeContentForm from './HomeContentForm';

export default async function AdminHomePage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const content = await getHomeContent();
  return <HomeContentForm initialContent={content} />;
}
