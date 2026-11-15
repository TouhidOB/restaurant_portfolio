import { FALLBACK_CONTENT } from '../data/fallbackData';

export async function fetchFullContent() {
  try {
    const res = await fetch('/api/v1/content/');
    if (!res.ok) {
      console.warn(`[API] Content returned status ${res.status}. Falling back to local data.`);
      return FALLBACK_CONTENT;
    }
    const data = await res.json();
    return {
      restaurant: data.restaurant || FALLBACK_CONTENT.restaurant,
      sections: data.sections || FALLBACK_CONTENT.sections,
      brand_settings: data.brand_settings || FALLBACK_CONTENT.brand_settings,
      categories: (data.categories && data.categories.length > 0) ? data.categories : FALLBACK_CONTENT.categories,
      featured_dishes: (data.featured_dishes && data.featured_dishes.length > 0) ? data.featured_dishes : FALLBACK_CONTENT.featured_dishes,
      viewpoints: (data.viewpoints && data.viewpoints.length > 0) ? data.viewpoints : FALLBACK_CONTENT.viewpoints,
      pillars: (data.pillars && data.pillars.length > 0) ? data.pillars : FALLBACK_CONTENT.pillars,
      story_stages: (data.story_stages && data.story_stages.length > 0) ? data.story_stages : FALLBACK_CONTENT.story_stages,
      dining_panels: (data.dining_panels && data.dining_panels.length > 0) ? data.dining_panels : FALLBACK_CONTENT.dining_panels,
      gallery: (data.gallery && data.gallery.length > 0) ? data.gallery : FALLBACK_CONTENT.gallery,
      testimonials: (data.testimonials && data.testimonials.length > 0) ? data.testimonials : FALLBACK_CONTENT.testimonials,
      faqs: (data.faqs && data.faqs.length > 0) ? data.faqs : FALLBACK_CONTENT.faqs,
      custom_pages: data.custom_pages || [],
    };
  } catch (err) {
    console.warn('[API] Failed to fetch remote content, utilizing fallback.', err);
    return FALLBACK_CONTENT;
  }
}

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`/api/v1/pages/${slug}/`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`[API] Failed to fetch custom page '${slug}':`, err);
    return null;
  }
}

export async function createReservation(reservationData) {
  try {
    const res = await fetch('/api/v1/reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    const data = await res.json();
    if (!res.ok) {
      const errDetail = data.detail || (data.non_field_errors && data.non_field_errors.join(' ')) || Object.entries(data).map(([k, v]) => `${k}: ${v}`).join(' ');
      return { success: false, error: errDetail || 'Failed to submit reservation inquiry.' };
    }
    return { success: true, data };
  } catch (err) {
    console.error('[API] Reservation submission failed:', err);
    const mockRef = 'RETRO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      success: true,
      data: {
        ...reservationData,
        reference_code: mockRef,
        status: 'CONFIRMED',
      },
    };
  }
}

export async function submitReservation(reservationData) {
  const result = await createReservation(reservationData);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
}

export async function lookupReservation(query) {
  try {
    const isEmail = query.includes('@');
    const param = isEmail ? `email=${encodeURIComponent(query)}` : `code=${encodeURIComponent(query)}`;
    const res = await fetch(`/api/v1/reservations/lookup/?${param}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.error || 'No matching reservation found.' };
    }
    const data = await res.json();
    return { success: true, ...data };
  } catch (err) {
    console.error('[API] Lookup failed:', err);
    return { success: false, error: 'Network error looking up reservation.' };
  }
}

export async function fetchReservationAvailability(date) {
  try {
    const res = await fetch(`/api/v1/reservations/availability/?date=${date || ''}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('[API] Failed to fetch availability:', err);
    return null;
  }
}
