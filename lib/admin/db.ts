import { Pool, type QueryResultRow } from 'pg';

/**
 * The Postgres connection.
 *
 * ## Why a pool on globalThis
 *
 * Next's dev server re-evaluates modules on hot reload. A plain module-level pool
 * would leak a new set of connections on every edit until Supabase refuses more.
 * Pinning it to globalThis keeps exactly one pool per process.
 *
 * ## Why the service role, and why this file is server-only
 *
 * Every table has RLS enabled with no permissive policy, so the anon key can read
 * nothing at all. All access happens here, server-side, over the pooler connection
 * which authenticates as the database owner and therefore bypasses RLS.
 *
 * The consequence is that **authorisation is this application's job**, not the
 * database's. Any future per-client login must add RLS policies in a migration
 * rather than relying on query filters alone.
 *
 * Never import this from a client component. It would fail to build, but the reason
 * matters: it holds credentials.
 */
const globalRef = globalThis as typeof globalThis & { __amplePool?: Pool };

function pool(): Pool {
  if (!globalRef.__amplePool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not set. The admin dashboard cannot start without a database. See .env.example.'
      );
    }

    globalRef.__amplePool = new Pool({
      connectionString,
      // Supabase's pooler presents a certificate for the pooler host rather than the
      // project host, so strict verification fails. The connection is still TLS.
      ssl: { rejectUnauthorized: false },
      // The transaction pooler multiplexes, so a large client-side pool is wasted and
      // counts against the project's connection limit.
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 15_000,
    });

    globalRef.__amplePool.on('error', (error) => {
      // An idle client erroring must not take the process down.
      console.error('[db] idle client error:', error.message);
    });
  }

  return globalRef.__amplePool;
}

/** Runs a parameterised query. Always use $1 placeholders — never string interpolation. */
export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const result = await pool().query<T>(text, params);
  return result.rows;
}

/** Returns the first row, or undefined. */
export async function queryOne<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T | undefined> {
  const rows = await query<T>(text, params);
  return rows[0];
}

/**
 * Runs several statements atomically.
 *
 * Used wherever a write must record its audit trail: a status change that succeeds
 * while its activity entry fails would leave the log quietly lying about what
 * happened, which is worse than the write failing outright.
 */
export async function transaction<T>(
  fn: (run: <R extends QueryResultRow>(text: string, params?: unknown[]) => Promise<R[]>) => Promise<T>
): Promise<T> {
  const client = await pool().connect();
  try {
    await client.query('begin');
    const run = async <R extends QueryResultRow>(text: string, params: unknown[] = []) =>
      (await client.query<R>(text, params)).rows;
    const result = await fn(run);
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
}

/** Short, readable ids that stay meaningful in a URL or on a phone call. */
export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
