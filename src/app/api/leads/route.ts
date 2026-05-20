import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/dataStore';

interface Lead {
  id: number;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  exam: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, program, exam, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const leads = readJSON<Lead[]>('leads.json', []);

    const newLead: Lead = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name,
      phone,
      email: email || '',
      program: program || '',
      exam: exam || '',
      message: message || '',
    };

    leads.push(newLead);
    writeJSON('leads.json', leads);

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = readJSON<Lead[]>('leads.json', []);
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: 'Failed to read leads' }, { status: 500 });
  }
}
