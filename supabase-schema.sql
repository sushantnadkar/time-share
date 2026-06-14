create type public.booking_status as enum ('tentative', 'confirmed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table public.stations (
  id text primary key,
  name text not null,
  zone text not null,
  specs text not null,
  active boolean not null default true
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  mobile text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  station_id text not null references public.stations(id),
  starts_at timestamptz not null,
  duration_minutes integer not null check (
    duration_minutes between 30 and 240
    and duration_minutes % 30 = 0
  ),
  player_count integer not null check (player_count between 1 and 4),
  hourly_rate_per_player integer not null default 60,
  total_amount integer generated always as (
    (duration_minutes / 60.0 * player_count * hourly_rate_per_player)::integer
  ) stored,
  status public.booking_status not null default 'tentative',
  created_at timestamptz not null default now()
);

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
alter table public.stations enable row level security;
alter table public.bookings enable row level security;

grant select on public.stations to anon, authenticated;
grant insert on public.bookings to anon, authenticated;
grant select, update on public.bookings to authenticated;

create policy "Users can read own profile and admins can read all"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "Admins manage profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can read active stations"
  on public.stations for select
  using (active = true);

create policy "Admins manage stations"
  on public.stations for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can create tentative bookings"
  on public.bookings for insert
  with check (status = 'tentative');

create policy "Admins read bookings"
  on public.bookings for select
  using (public.is_admin());

create policy "Admins update bookings"
  on public.bookings for update
  using (public.is_admin())
  with check (public.is_admin());

alter publication supabase_realtime add table public.bookings;

insert into public.stations (id, name, zone, specs, active) values
  ('ps-01', 'PS5 Lounge A', 'Main Console Zone', 'PS5, 55in OLED, two DualSense controllers', true),
  ('ps-02', 'PS5 Lounge B', 'Main Console Zone', 'PS5, 55in OLED, couch seating', true)
on conflict (id) do update set
  name = excluded.name,
  zone = excluded.zone,
  specs = excluded.specs,
  active = excluded.active;
