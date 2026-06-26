create table if not exists public.home_content (
  id text primary key default 'main',
  content jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.home_content enable row level security;

insert into public.home_content (id, content)
values ('main', '{}')
on conflict (id) do nothing;
