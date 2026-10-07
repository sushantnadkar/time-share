create type public.booking_status as enum ('pending', 'confirmed', 'cancelled');
create type public.payment_status as enum ('pending_verification', 'verified', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table public.consoles (
  id text primary key,
  console_number integer not null unique,
  name text not null,
  zone text not null default 'Main Console Zone',
  specs text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_id text not null unique,
  player_name text not null,
  mobile text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  players integer not null check (players between 1 and 4),
  visit_date date not null,
  arrival_time time not null,
  duration_minutes integer not null check (
    duration_minutes in (30, 60, 90, 120)
  ),
  console_id text not null references public.consoles(id),
  amount integer not null check (amount > 0),
  hourly_rate_per_player integer not null default 60,
  payment_status public.payment_status not null default 'pending_verification',
  booking_status public.booking_status not null default 'pending',
  utr text,
  starts_at timestamptz generated always as (
    (visit_date::timestamp + arrival_time)::timestamptz
  ) stored,
  created_at timestamptz not null default now()
);

create table public.booking_audit_logs (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  action text not null,
  actor uuid references auth.users(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index bookings_console_time_no_overlap
on public.bookings (
  console_id,
  visit_date,
  arrival_time,
  duration_minutes
)
where booking_status <> 'cancelled';

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.consoles enable row level security;
alter table public.settings enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_audit_logs enable row level security;

grant select on public.consoles to anon, authenticated;
grant insert on public.bookings to anon, authenticated;
grant select, update on public.bookings to authenticated;
grant select, update on public.settings to authenticated;

create policy "Users can read own profile and admins can read all"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "Admins manage profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can read active consoles"
  on public.consoles for select
  using (active = true);

create policy "Admins manage consoles"
  on public.consoles for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins read settings"
  on public.settings for select
  using (public.is_admin());

create policy "Admins update settings"
  on public.settings for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can create pending bookings"
  on public.bookings for insert
  with check (
    booking_status = 'pending'
    and payment_status = 'pending_verification'
  );

create policy "Admins read bookings"
  on public.bookings for select
  using (public.is_admin());

create policy "Admins update bookings"
  on public.bookings for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins read audit logs"
  on public.booking_audit_logs for select
  using (public.is_admin());

alter publication supabase_realtime add table public.bookings;

insert into public.consoles (id, console_number, name, zone, specs, active) values
  ('ps-01', 1, 'PS5 Console A', 'Main Console Zone', 'PS5, 55in OLED, two DualSense controllers', true),
  ('ps-02', 2, 'PS5 Console B', 'Main Console Zone', 'PS5, 55in OLED, couch seating', true)
on conflict (id) do update set
  console_number = excluded.console_number,
  name = excluded.name,
  zone = excluded.zone,
  specs = excluded.specs,
  active = excluded.active;

insert into public.settings (key, value) values
  ('upi_id', '"placeofvirtuality@upi"'::jsonb),
  ('upi_name', '"POV Gaming"'::jsonb),
  ('telegram_enabled', 'false'::jsonb),
  ('resend_enabled', 'false'::jsonb),
  ('fast2sms_enabled', 'false'::jsonb),
  ('active_consoles', '2'::jsonb)
on conflict (key) do nothing;
