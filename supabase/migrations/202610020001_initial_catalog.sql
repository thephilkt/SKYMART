-- SKYMART Phase 1 foundation: identity, shops, catalog, variants, inventory and public catalog view.
-- Money is stored in satang (THB 2,990.00 = 299000).

create extension if not exists pgcrypto;

create type public.app_role as enum ('USER', 'ADMIN');
create type public.account_status as enum ('ACTIVE', 'SUSPENDED', 'DEACTIVATED');
create type public.shop_status as enum ('DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'REJECTED', 'SUSPENDED');
create type public.product_status as enum ('DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'REJECTED', 'SUSPENDED', 'ARCHIVED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'USER',
  status public.account_status not null default 'ACTIVE',
  display_name text,
  first_name text,
  last_name text,
  phone text,
  avatar_path text,
  suspended_at timestamptz,
  suspension_reason text,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  slug text not null unique,
  name text not null,
  description text not null default '',
  logo_path text,
  cover_path text,
  status public.shop_status not null default 'DRAFT',
  rating_average numeric(3,2) not null default 0 check (rating_average between 0 and 5),
  rating_count integer not null default 0 check (rating_count >= 0),
  commission_rate_bps integer not null default 0 check (commission_rate_bps between 0 and 10000),
  approved_at timestamptz,
  approved_by uuid references public.profiles(id) on delete set null,
  rejection_reason text,
  suspended_at timestamptz,
  suspension_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  slug text not null unique,
  name text not null,
  description text,
  image_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  external_key text unique,
  shop_id uuid not null references public.shops(id) on delete restrict,
  category_id uuid not null references public.categories(id) on delete restrict,
  slug text not null unique,
  name text not null,
  short_name text not null,
  description text not null default '',
  status public.product_status not null default 'DRAFT',
  brand text,
  specifications jsonb not null default '[]'::jsonb,
  rating_average numeric(3,2) not null default 0 check (rating_average between 0 and 5),
  rating_count integer not null default 0 check (rating_count >= 0),
  sold_count integer not null default 0 check (sold_count >= 0),
  moderation_note text,
  published_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  name text not null,
  attributes jsonb not null default '{}'::jsonb,
  price_amount bigint not null check (price_amount >= 0),
  compare_at_amount bigint check (compare_at_amount is null or compare_at_amount >= price_amount),
  cost_amount bigint check (cost_amount is null or cost_amount >= 0),
  currency char(3) not null default 'THB',
  weight_grams integer check (weight_grams is null or weight_grams >= 0),
  is_active boolean not null default true,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete set null,
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.inventory_levels (
  variant_id uuid primary key references public.product_variants(id) on delete cascade,
  on_hand integer not null default 0 check (on_hand >= 0),
  reserved integer not null default 0 check (reserved >= 0 and reserved <= on_hand),
  sold integer not null default 0 check (sold >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  version integer not null default 1,
  updated_at timestamptz not null default now()
);

create index shops_owner_status_idx on public.shops(owner_id, status);
create index categories_parent_sort_idx on public.categories(parent_id, sort_order);
create index products_shop_status_idx on public.products(shop_id, status);
create index products_category_status_idx on public.products(category_id, status, published_at desc);
create index product_variants_product_active_idx on public.product_variants(product_id, is_active);
create index product_images_product_sort_idx on public.product_images(product_id, sort_order);
create unique index product_images_one_primary_idx
  on public.product_images(product_id)
  where is_primary = true and variant_id is null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger shops_set_updated_at before update on public.shops
for each row execute function public.set_updated_at();
create trigger categories_set_updated_at before update on public.categories
for each row execute function public.set_updated_at();
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();
create trigger product_variants_set_updated_at before update on public.product_variants
for each row execute function public.set_updated_at();
create trigger inventory_levels_set_updated_at before update on public.inventory_levels
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'ADMIN' and status = 'ACTIVE'
  );
$$;

create or replace function public.owns_shop(target_shop_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.shops
    where id = target_shop_id and owner_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.owns_shop(uuid) from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.owns_shop(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.shops enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.inventory_levels enable row level security;

revoke all on table public.profiles, public.shops, public.categories, public.products,
  public.product_variants, public.product_images, public.inventory_levels from anon, authenticated;

grant select on public.shops, public.categories, public.products, public.product_variants,
  public.product_images, public.inventory_levels to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant insert, update, delete on public.shops, public.products, public.product_variants,
  public.product_images, public.inventory_levels to authenticated;
grant insert, update, delete on public.categories to authenticated;

create policy profiles_select_own on public.profiles
for select to authenticated using ((select auth.uid()) = id or public.is_admin());
create policy profiles_update_own on public.profiles
for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id and role = 'USER');

create policy shops_public_read_active on public.shops
for select to anon, authenticated using (status = 'ACTIVE' or public.owns_shop(id) or public.is_admin());
create policy shops_insert_own on public.shops
for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy shops_update_own on public.shops
for update to authenticated using (public.owns_shop(id) or public.is_admin())
with check (public.owns_shop(id) or public.is_admin());
create policy shops_delete_draft_own on public.shops
for delete to authenticated using (public.owns_shop(id) and status = 'DRAFT');

create policy categories_public_read_active on public.categories
for select to anon, authenticated using (is_active or public.is_admin());
create policy categories_admin_insert on public.categories
for insert to authenticated with check (public.is_admin());
create policy categories_admin_update on public.categories
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy categories_admin_delete on public.categories
for delete to authenticated using (public.is_admin());

create policy products_public_read_active on public.products
for select to anon, authenticated
using ((status = 'ACTIVE' and deleted_at is null) or public.owns_shop(shop_id) or public.is_admin());
create policy products_owner_insert on public.products
for insert to authenticated with check (public.owns_shop(shop_id) or public.is_admin());
create policy products_owner_update on public.products
for update to authenticated using (public.owns_shop(shop_id) or public.is_admin())
with check (public.owns_shop(shop_id) or public.is_admin());
create policy products_owner_delete_draft on public.products
for delete to authenticated using ((public.owns_shop(shop_id) and status = 'DRAFT') or public.is_admin());

create policy variants_public_read on public.product_variants
for select to anon, authenticated using (
  exists (select 1 from public.products p where p.id = product_id and p.status = 'ACTIVE' and p.deleted_at is null)
  or exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);
create policy variants_owner_insert on public.product_variants
for insert to authenticated with check (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);
create policy variants_owner_update on public.product_variants
for update to authenticated using (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
) with check (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);
create policy variants_owner_delete on public.product_variants
for delete to authenticated using (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);

create policy images_public_read on public.product_images
for select to anon, authenticated using (
  exists (select 1 from public.products p where p.id = product_id and p.status = 'ACTIVE' and p.deleted_at is null)
  or exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);
create policy images_owner_insert on public.product_images
for insert to authenticated with check (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);
create policy images_owner_update on public.product_images
for update to authenticated using (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
) with check (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);
create policy images_owner_delete on public.product_images
for delete to authenticated using (
  exists (select 1 from public.products p where p.id = product_id and (public.owns_shop(p.shop_id) or public.is_admin()))
);

create policy inventory_public_read on public.inventory_levels
for select to anon, authenticated using (
  exists (
    select 1 from public.product_variants v
    join public.products p on p.id = v.product_id
    where v.id = variant_id and p.status = 'ACTIVE' and p.deleted_at is null
  ) or exists (
    select 1 from public.product_variants v
    join public.products p on p.id = v.product_id
    where v.id = variant_id and (public.owns_shop(p.shop_id) or public.is_admin())
  )
);
create policy inventory_owner_insert on public.inventory_levels
for insert to authenticated with check (
  exists (
    select 1 from public.product_variants v
    join public.products p on p.id = v.product_id
    where v.id = variant_id and (public.owns_shop(p.shop_id) or public.is_admin())
  )
);
create policy inventory_owner_update on public.inventory_levels
for update to authenticated using (
  exists (
    select 1 from public.product_variants v
    join public.products p on p.id = v.product_id
    where v.id = variant_id and (public.owns_shop(p.shop_id) or public.is_admin())
  )
) with check (
  exists (
    select 1 from public.product_variants v
    join public.products p on p.id = v.product_id
    where v.id = variant_id and (public.owns_shop(p.shop_id) or public.is_admin())
  )
);

create view public.public_product_catalog
with (security_invoker = true)
as
select
  p.id,
  p.external_key,
  p.slug,
  p.name,
  p.short_name,
  p.description,
  c.slug as category_slug,
  c.name as category_name,
  c.description as category_description,
  c.image_path as category_image_path,
  s.name as shop_name,
  s.rating_average as shop_rating,
  p.rating_average,
  p.rating_count,
  p.sold_count,
  p.specifications,
  primary_image.storage_path as primary_image_path,
  coalesce(images.gallery_paths, array[]::text[]) as gallery_paths,
  primary_variant.price_amount,
  primary_variant.compare_at_amount,
  coalesce(stock.stock_available, 0)::integer as stock_available,
  coalesce(colors.colors, '[]'::jsonb) as colors
from public.products p
join public.shops s on s.id = p.shop_id and s.status = 'ACTIVE'
join public.categories c on c.id = p.category_id and c.is_active = true
left join lateral (
  select i.storage_path
  from public.product_images i
  where i.product_id = p.id
  order by i.is_primary desc, i.sort_order asc
  limit 1
) primary_image on true
left join lateral (
  select array_agg(i.storage_path order by i.is_primary desc, i.sort_order asc) as gallery_paths
  from public.product_images i
  where i.product_id = p.id
) images on true
left join lateral (
  select v.id, v.price_amount, v.compare_at_amount
  from public.product_variants v
  where v.product_id = p.id and v.is_active = true
  order by v.price_amount asc, v.created_at asc
  limit 1
) primary_variant on true
left join lateral (
  select sum(greatest(il.on_hand - il.reserved, 0)) as stock_available
  from public.product_variants v
  join public.inventory_levels il on il.variant_id = v.id
  where v.product_id = p.id and v.is_active = true
) stock on true
left join lateral (
  select jsonb_agg(
    jsonb_build_object(
      'name', coalesce(v.attributes ->> 'color', v.name),
      'value', coalesce(v.attributes ->> 'color_value', '#777f8b')
    ) order by v.created_at
  ) as colors
  from public.product_variants v
  where v.product_id = p.id and v.is_active = true
) colors on true
where p.status = 'ACTIVE' and p.deleted_at is null;

revoke all on table public.public_product_catalog from anon, authenticated;
grant select on table public.public_product_catalog to anon, authenticated;

comment on view public.public_product_catalog is
  'Public storefront projection. Uses security_invoker so underlying RLS remains enforced.';
