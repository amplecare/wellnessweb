import type { UserRole } from '@/lib/admin/types';

/**
 * The admin area is protected by a single signed-in account today. Role is not a
 * public UI toggle and must never be controlled by a URL string, because that would
 * make the application behave like a demo rather than a real product. Once a real
 * per-user model exists, this should read the session instead of returning a hard-coded
 * role.
 */
export function readRole(_value?: string | undefined): UserRole {
  return 'admin';
}

export function readCompany(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.trim() || undefined;
}
