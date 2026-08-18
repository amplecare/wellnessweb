import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/content/site';
import { createConsultationRequest, listConsultations, loadWorkspace } from '@/lib/admin/store';
import type { Company, ConcernType, ContactMethod, PackageInterest } from '@/lib/admin/types';

/**
 * Rendered per request, never prerendered.
 *
 * This page is behind authentication and reads live data, so a build-time snapshot
 * would be both wrong and impossible — the build has no signed-in user. Next 16
 * tries to prerender it by default, which fails on the database connection. Locally
 * that was hidden because .env.local supplied DATABASE_URL and the build happily
 * baked a page nobody should ever be served.
 */
export const dynamic = 'force-dynamic';

type ConsultationSubmission = {
  name?: string;
  organisation?: string;
  organisationType?: Company['type'];
  role?: string;
  staffCount?: string | number;
  email?: string;
  phone?: string;
  message?: string;
  tier?: string;
  website?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 5;
const attempts = new Map<string, { count: number; firstAt: number }>();

function ipFromRequest(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'local'
  );
}

function allowSubmission(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now - record.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return true;
  }

  record.count += 1;
  return record.count <= MAX_SUBMISSIONS;
}

function normaliseType(value: unknown): Company['type'] | undefined {
  if (
    value === 'care_home' ||
    value === 'domiciliary' ||
    value === 'supported_living' ||
    value === 'nursing_home'
  ) {
    return value;
  }
  return undefined;
}

function normaliseTier(value: unknown): PackageInterest {
  if (value === 'assessment' || value === 'assessment_plan' || value === 'ongoing') return value;
  return 'undecided';
}

function challengesFromMessage(message: string): ConcernType[] {
  const text = message.toLowerCase();
  const matches: ConcernType[] = [];

  if (text.includes('burnout') || text.includes('fatigue') || text.includes('exhaust'))
    matches.push('burnout');
  if (text.includes('absence') || text.includes('sickness') || text.includes('leave'))
    matches.push('absence');
  if (text.includes('stress') || text.includes('pressure')) matches.push('stress');
  if (text.includes('engagement') || text.includes('communication') || text.includes('feedback'))
    matches.push('engagement');
  if (text.includes('conflict')) matches.push('conflict');
  if (text.includes('mental')) matches.push('mental_health');
  if (text.includes('workload') || text.includes('rota') || text.includes('shift'))
    matches.push('workload');

  return [...new Set(matches)];
}

function preferredContact(email?: string, phone?: string): ContactMethod {
  if (phone && !email) return 'phone';
  return 'email';
}

function normaliseContact(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function findDuplicateConsultation(input: {
  organisation: string;
  name: string;
  role: string;
  staffCount: number;
  email: string;
  phone: string;
}) {
  const organisation = normaliseContact(input.organisation);
  const name = normaliseContact(input.name);
  const role = normaliseContact(input.role);
  const email = normaliseContact(input.email);
  const phone = input.phone.replace(/\s+/g, '');

  return listConsultations().find((consultation) => {
    const sameOrganisation = normaliseContact(consultation.organisationName) === organisation;
    const sameName = normaliseContact(consultation.enquirerName) === name;
    const sameRole = normaliseContact(consultation.enquirerRole) === role;
    const sameStaffCount = consultation.staffCount === input.staffCount;
    const sameEmail = email && normaliseContact(consultation.email) === email;
    const samePhone = phone && consultation.phone.replace(/\s+/g, '') === phone;
    return sameOrganisation && sameName && sameRole && sameStaffCount && (sameEmail || samePhone);
  });
}

async function sendInboxEmail(subject: string, text: string): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || `${site.name} <no-reply@amplecare.co.uk>`;

  if (!host || !user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  await transporter.sendMail({
    to,
    from,
    subject,
    text,
  });
}

export async function POST(request: NextRequest) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const ip = ipFromRequest(request);
  if (!allowSubmission(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429 }
    );
  }

  let payload: ConsultationSubmission;
  try {
    payload = (await request.json()) as ConsultationSubmission;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (payload.website?.trim()) {
    return NextResponse.json({ ok: true }, { status: 204 });
  }

  const name = payload.name?.trim() || '';
  const organisation = payload.organisation?.trim() || '';
  const organisationType = normaliseType(payload.organisationType);
  const role = payload.role?.trim() || '';
  const staffCount = Number.parseInt(String(payload.staffCount ?? ''), 10);
  const email = payload.email?.trim() || '';
  const phone = payload.phone?.trim() || '';
  const message = payload.message?.trim() || '';
  const tier = normaliseTier(payload.tier);
  const availability = 'Flexible';

  if (!name || !organisation || !organisationType || !role) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
  }
  if (!Number.isFinite(staffCount) || staffCount < 1) {
    return NextResponse.json({ error: 'Please enter a valid staff count.' }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { error: 'Please provide either an email address or a phone number.' },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'Please check the email address.' }, { status: 400 });
  }

  const duplicate = findDuplicateConsultation({
    organisation,
    name,
    role,
    staffCount,
    email,
    phone,
  });
  if (duplicate) {
    return NextResponse.json(
      {
        error: 'We already received this consultation request.',
        duplicate: true,
        consultationId: duplicate.id,
        submittedAt: duplicate.submittedAt,
      },
      { status: 409 }
    );
  }

  const challenges = challengesFromMessage(message);
  const consultation = await createConsultationRequest(
    {
      organisationName: organisation,
      organisationType,
      staffCount,
      enquirerName: name,
      enquirerRole: role,
      email,
      phone,
      challenges: challenges.length ? challenges : ['engagement'],
      preferredContact: preferredContact(email, phone),
      availability,
      notes: message || 'Public consultation form submission.',
      packageInterest: tier,
    },
    'Website'
  );

  const subject = `New Ample Care consultation request: ${consultation.organisationName}`;
  const text = [
    `Organisation: ${consultation.organisationName}`,
    `Type: ${consultation.organisationType}`,
    `Staff: ${consultation.staffCount}`,
    `Contact: ${consultation.enquirerName} (${consultation.enquirerRole})`,
    `Email: ${consultation.email || 'not provided'}`,
    `Phone: ${consultation.phone || 'not provided'}`,
    `Preferred contact: ${consultation.preferredContact}`,
    `Package interest: ${consultation.packageInterest}`,
    `Challenges: ${consultation.challenges.join(', ') || 'not specified'}`,
    `Notes: ${consultation.notes}`,
    `Submitted at: ${consultation.submittedAt}`,
  ].join('\n');

  try {
    await sendInboxEmail(subject, text);
  } catch {
    // The request is still accepted and stored; email delivery is best-effort.
  }

  return NextResponse.json(
    {
      ok: true,
      consultationId: consultation.id,
      message: 'Your consultation request has been received.',
    },
    { status: 201 }
  );
}
