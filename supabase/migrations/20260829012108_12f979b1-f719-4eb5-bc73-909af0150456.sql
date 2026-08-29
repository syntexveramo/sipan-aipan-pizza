CREATE TYPE public.membership_status AS ENUM ('associado', 'nao_associado', 'nao_sei');
CREATE TYPE public.registration_status AS ENUM ('received', 'confirmed', 'waitlisted', 'cancelled');

CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL DEFAULT 'pizza-napoletana-09-09',
  full_name TEXT NOT NULL,
  whatsapp_normalized TEXT NOT NULL,
  email_normalized TEXT NOT NULL,
  company_name TEXT NOT NULL,
  membership_status public.membership_status NOT NULL,
  role_title TEXT,
  registration_status public.registration_status NOT NULL DEFAULT 'received',
  consent_event_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  consent_marketing_at TIMESTAMP WITH TIME ZONE,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX event_registrations_email_key ON public.event_registrations (event_id, email_normalized);
CREATE UNIQUE INDEX event_registrations_whatsapp_key ON public.event_registrations (event_id, whatsapp_normalized);

GRANT ALL ON public.event_registrations TO service_role;

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER event_registrations_set_updated_at
BEFORE UPDATE ON public.event_registrations
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();