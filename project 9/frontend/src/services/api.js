import { FALLBACK_DATA } from '../data/fallbackData';

const API_BASE = '/api';

export async function fetchPublicContent() {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) {
      console.warn(`[CMS API] Backend returned status ${res.status}. Using skyline fallback data.`);
      return FALLBACK_DATA;
    }
    const data = await res.json();
    if (data && data.content_json && Object.keys(data.content_json).length > 0) {
      return {
        ...FALLBACK_DATA,
        ...data.content_json,
        custom_pages: data.custom_pages || FALLBACK_DATA.custom_pages || [],
        blog_posts: data.blog_posts || FALLBACK_DATA.blog_posts || [],
        blog_categories: data.blog_categories || FALLBACK_DATA.blog_categories || [],
      };
    }
    return FALLBACK_DATA;
  } catch (err) {
    console.warn('[CMS API] Could not reach Django backend. Using fallback data.', err);
    return FALLBACK_DATA;
  }
}

export async function submitReservation(reservationData) {
  try {
    const res = await fetch(`${API_BASE}/reservations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Failed to submit reservation inquiry');
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error('[CMS API] Error submitting reservation:', err);
    throw err;
  }
}

export const createReservation = submitReservation;

export async function lookupReservation(code) {
  try {
    const cleanCode = encodeURIComponent((code || '').trim());
    const res = await fetch(`${API_BASE}/reservations/lookup/?code=${cleanCode}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, message: errData.error || `No reservation found for code ${code}` };
    }
    const data = await res.json();
    return { success: true, reservation: data.reservation || data };
  } catch (err) {
    console.error('[CMS API] Error looking up reservation:', err);
    return { success: false, message: 'Could not connect to reservation server.' };
  }
}

export async function fetchReservationAvailability(date, shift = 'dinner') {
  try {
    const res = await fetch(`${API_BASE}/reservations/availability/?date=${date}&shift=${shift}`);
    if (!res.ok) {
      return { available: true, capacity: 180, remaining: 45 };
    }
    return await res.json();
  } catch (err) {
    return { available: true, capacity: 180, remaining: 45 };
  }
}

export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${API_BASE}/blog/`);
    if (!res.ok) {
      return FALLBACK_DATA.blog_posts || [];
    }
    const data = await res.json();
    return data.posts || data.results || (Array.isArray(data) ? data : FALLBACK_DATA.blog_posts || []);
  } catch (err) {
    console.warn('[CMS API] Error fetching blog posts, using fallback.', err);
    return FALLBACK_DATA.blog_posts || [];
  }
}

export async function fetchBlogPostDetail(slug) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`);
    if (!res.ok) {
      return (FALLBACK_DATA.blog_posts || []).find((p) => p.slug === slug) || null;
    }
    const data = await res.json();
    return data.post || data;
  } catch (err) {
    console.warn(`[CMS API] Error fetching post ${slug}, using fallback.`, err);
    return (FALLBACK_DATA.blog_posts || []).find((p) => p.slug === slug) || null;
  }
}

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) {
      return (FALLBACK_DATA.custom_pages || []).find((p) => p.slug === slug) || null;
    }
    const data = await res.json();
    return data.page || data;
  } catch (err) {
    console.warn(`[CMS API] Error fetching custom page ${slug}, using fallback.`, err);
    return (FALLBACK_DATA.custom_pages || []).find((p) => p.slug === slug) || null;
  }
}
