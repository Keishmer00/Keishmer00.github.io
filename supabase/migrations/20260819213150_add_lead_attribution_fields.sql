alter table public.leads_clients
  add column if not exists project_type text,
  add column if not exists budget_range text,
  add column if not exists timeline text,
  add column if not exists language text,
  add column if not exists source_path text,
  add column if not exists referrer text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text;

alter table public.leads_clients
  drop constraint if exists language_check;

alter table public.leads_clients
  add constraint language_check check (language is null or language in ('en', 'es'));

alter table public.leads_clients
  drop constraint if exists message_check;

alter table public.leads_clients
  add constraint message_check check (message is null or char_length(message) <= 3000);

alter table public.leads_clients
  drop constraint if exists phone_number_check;

alter table public.leads_clients
  add constraint phone_number_check check (phone_number is null or char_length(phone_number) <= 30);
