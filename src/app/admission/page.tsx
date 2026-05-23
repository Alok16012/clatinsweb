import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdmissionPage from '@/components/AdmissionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission 2026 – Enroll in CLATians CLAT Coaching',
  description: 'Apply for CLATians 2026 batch. Offline, Online, Mentorship programs. Limited seats. Call 8507700177.',
};

export default function Admission() {
  return (
    <>
      <Navbar />
      <AdmissionPage />
      <Footer />
    </>
  );
}
