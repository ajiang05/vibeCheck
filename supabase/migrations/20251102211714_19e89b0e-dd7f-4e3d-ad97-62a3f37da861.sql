-- Drop and recreate the view without SECURITY DEFINER
DROP VIEW IF EXISTS public.event_stats;

CREATE VIEW public.event_stats 
WITH (security_invoker = true) AS
SELECT 
  e.id,
  e.name,
  COUNT(DISTINCT r.id) FILTER (WHERE r.status = 'going') as going_count,
  COUNT(DISTINCT r.id) FILTER (WHERE r.status = 'interested') as interested_count,
  COUNT(DISTINCT rev.id) as review_count,
  COALESCE(AVG(rev.rating), 0) as avg_rating
FROM public.events e
LEFT JOIN public.rsvps r ON e.id = r.event_id
LEFT JOIN public.reviews rev ON e.id = rev.event_id
GROUP BY e.id, e.name;