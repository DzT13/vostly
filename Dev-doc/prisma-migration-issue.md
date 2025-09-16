# Prisma Migration Issue Notes

## Summary
Attempting to run `npx prisma migrate deploy` reports error `P3019` indicating mismatch between datasource provider `sqlite` in schema and value recorded in `prisma/migrations/migration_lock.toml`. The lock file was rewritten to `provider = "sqlite"`, but Prisma still reads `<PROVIDER NOT FOUND>`.

## Steps Performed
1. Generated schema with full models and created manual migration SQL via `prisma migrate diff`.
2. Populated `prisma/migrations/0001_init/migration.sql` and executed using `npx prisma db execute`.
3. Regenerated Prisma client and verified schema validity (`npx prisma validate`).
4. Set `.env` to absolute SQLite path (`file:C:/Users/Admin/Documents/vostly/prisma/dev.db`).
5. Attempted `npx prisma migrate deploy` multiple times; error persists even after:
   - Rewriting lock file content to `provider = "sqlite"`.
   - Upgrading Prisma CLI/client to v6.16.1.
   - Verifying schema and database connectivity.

## Observations
- Manual execution of migration succeeded and database populated.
- `prisma db pull` aligns schema with database without complaint.
- Error surfaced only when running migration commands that read lock metadata.
- Lock file was initially created via manual write (no `migrate dev` due to schema engine issues earlier).

## Next Actions (Post MCP Tool Installation)
- Consider removing `prisma/migrations` and re-running `npx prisma migrate dev` now that schema engine issues might be resolved.
- Alternatively, regenerate lock file using `prisma migrate diff --from-empty --to-schema-datamodel --create-only` once migration engine works.
- Ensure environment path uses forward slashes and double-check Prisma CLI cache.
- If problem persists, investigate Prisma CLI known issues on Windows with manually crafted migrations.
