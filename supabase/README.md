# Supabase setup for SKYMART

The application works with mock data until both public environment variables are set. Once configured, the home page, search page, and product detail page read the public catalog from Supabase. If the catalog is empty or unavailable, they fall back to `lib/mock-data.ts`.

## 1. Create the environment file

Copy `.env.example` to `.env.local` and fill in values from Supabase Dashboard → Connect:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The publishable key may be used in the browser because access is constrained by grants and RLS. The service-role key is used only by the development-only Shop CRUD Route Handler. Never expose it with a `NEXT_PUBLIC_` prefix or use this bypass in production.

## 2. Apply the migration

Use either the Supabase SQL Editor or the CLI:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push --dry-run
npx supabase db push
```

The initial migration implements identity, shops, categories, products, variants, inventory, RLS policies, and the `public_product_catalog` view. The remaining transactional tables in `database.md` should be introduced in later migrations.

## 3. Add catalog data

Create an Auth user, its shop, categories, products, variants, inventory, and product images. Use `external_key` values such as `p-001` to keep the current local cart compatible during the transition.

Images may use an existing `/products/...` path during development or a path inside the public `product-images` bucket.

### Create the first admin account

Create the user in Supabase Dashboard â†’ Authentication â†’ Users, then promote that user in SQL Editor. Replace the example email before running the statement:

```sql
update public.profiles
set role = 'ADMIN', status = 'ACTIVE'
where id = (
  select id
  from auth.users
  where email = 'admin@example.com'
);
```

The current prototype opens `/admin` directly without a login screen. Supabase still protects product mutations with RLS, so create, update, and delete require an authenticated Admin session before production use. Do not put the service-role key in `.env.local` or browser code.

## 4. Generate database types later

`types/database.ts` contains the initial hand-maintained types needed before a project exists. After linking the real project, replace it with generated types:

```bash
npx supabase gen types typescript --linked > types/database.ts
```

Review the generated diff before committing it.

## Current integration boundary

- Connected: public catalog on home, search, and product detail routes.
- Connected: authenticated Product CRUD in the admin area. Product writes use Supabase and RLS.
- Prepared: browser/server clients and Next.js 16 auth-session proxy.
- Still local: cart persistence, checkout simulation, orders, account, and non-product admin resources.
- Never implemented client-side: service-role access, payment confirmation, stock mutation, or admin authorization.
