/**
 * Applies every SQL file in supabase/migrations, in filename order.
 *
 *   npm run migrate
 *
 * Each file runs inside a transaction and is recorded in `schema_migration`, so
 * re-running is safe — already-applied files are skipped. Migrations are therefore
 * append-only: to change the schema, add a new numbered file rather than editing an
 * old one, or environments will silently diverge.
 *
 * Reads DATABASE_URL from .env.local. That is the pooler connection string — the
 * direct db.<ref>.supabase.co host does not resolve for this project.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import pg from 'pg';

function loadEnv() {
  const raw = readFileSync('.env.local', 'utf8');
  return Object.fromEntries(
    raw
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const i = line.indexOf('=');
        return [line.slice(0, i), line.slice(i + 1)];
      })
  );
}

const env = loadEnv();
if (!env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const dir = 'supabase/migrations';
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.sql'))
  .sort();

if (!files.length) {
  console.log('No migrations to apply.');
  process.exit(0);
}

const client = new pg.Client({
  connectionString: env.DATABASE_URL,
  // Supabase's pooler presents a certificate for the pooler host rather than the
  // project host, so strict verification fails. The connection is still TLS.
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});

await client.connect();

await client.query(`
  create table if not exists schema_migration (
    name text primary key,
    applied_at timestamptz not null default now()
  )
`);

const { rows } = await client.query('select name from schema_migration');
const applied = new Set(rows.map((r) => r.name));

let ran = 0;
for (const file of files) {
  if (applied.has(file)) {
    console.log(`  skip   ${file} (already applied)`);
    continue;
  }

  const sql = readFileSync(path.join(dir, file), 'utf8');
  try {
    await client.query('begin');
    await client.query(sql);
    await client.query('insert into schema_migration(name) values ($1)', [file]);
    await client.query('commit');
    console.log(`  applied ${file}`);
    ran += 1;
  } catch (error) {
    await client.query('rollback');
    console.error(`\n  FAILED ${file}\n  ${error.message}\n`);
    await client.end();
    process.exit(1);
  }
}

await client.end();
console.log(`\n${ran} migration(s) applied, ${files.length - ran} already up to date.\n`);
