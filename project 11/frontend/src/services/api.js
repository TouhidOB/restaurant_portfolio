import { FALLBACK_CONTENT } from '../data/fallbackContent';

const API_BASE = '/api';

export async function fetchPublicContent() {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) {
      console.warn(`[CMS API] Backend returned status ${res.status}. Using fallback botanical content.`);
      return FALLBACK_CONTENT;
    }
    const data = await res.json();
    const content = data.content_json || data;
    return {
      ...FALLBACK_CONTENT,
      ...content,
      custom_pages: data.custom_pages || FALLBACK_CONTENT.custom_pages || [],
      blog_posts: data.blog_posts || FALLBACK_CONTENT.blog_posts || [],
      blog_categories: data.blog_categories || FALLBACK_CONTENT.blog_categories || [],
    };
  } catch (err) {
    console.warn('[CMS API] Could not reach Django backend. Using fallback content.', err);
    return FALLBACK_CONTENT;
  }
}

export async function fetchMenuCategories() {
  try {
    const res = await fetch(`${API_BASE}/menu/categories/`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (err) {
    console.warn('[CMS API] Categories fetch failed, using fallback.', err);
    return [];
  }
}

export async function fetchMenuItems() {
  try {
    const res = await fetch(`${API_BASE}/menu/items/`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || data || [];
  } catch (err) {
    console.warn('[CMS API] Menu items fetch failed.', err);
    return [];
  }
}

export async function fetchCustomPages() {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) return FALLBACK_CONTENT.custom_pages || [];
    const data = await res.json();
    return data.custom_pages || FALLBACK_CONTENT.custom_pages || [];
  } catch (err) {
    return FALLBACK_CONTENT.custom_pages || [];
  }
}

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) {
      const fallback = (FALLBACK_CONTENT.custom_pages || []).find((p) => p.slug === slug);
      return fallback ? { page: fallback, data: fallback } : null;
    }
    const data = await res.json();
    return { data: data.page || data, page: data.page || data };
  } catch (err) {
    const fallback = (FALLBACK_CONTENT.custom_pages || []).find((p) => p.slug === slug);
    return fallback ? { page: fallback, data: fallback } : null;
  }
}
export const getCustomPage = fetchCustomPage;


export async function fetchBlogPosts(categorySlug = null) {
  try {
    const url = categorySlug ? `${API_BASE}/blog/?category=${categorySlug}` : `${API_BASE}/blog/`;
    const res = await fetch(url);
    if (!res.ok) return FALLBACK_CONTENT.blog_posts || [];
    const data = await res.json();
    return data.posts || data.results || data || [];
  } catch (err) {
    return FALLBACK_CONTENT.blog_posts || [];
  }
}

export async function fetchBlogPostDetail(slug) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`);
    if (!res.ok) {
      const fallback = (FALLBACK_CONTENT.blog_posts || []).find((p) => p.slug === slug);
      return fallback ? { post: fallback } : null;
    }
    return await res.json();
  } catch (err) {
    const fallback = (FALLBACK_CONTENT.blog_posts || []).find((p) => p.slug === slug);
    return fallback ? { post: fallback } : null;
  }
}

export async function checkReservationAvailability(date, shift = 'lunch') {
  try {
    const res = await fetch(`${API_BASE}/reservations/availability/?date=${encodeURIComponent(date)}&shift=${encodeURIComponent(shift)}`);
    if (!res.ok) return { is_available: true, remaining_covers: 40 };
    return await res.json();
  } catch (err) {
    return { is_available: true, remaining_covers: 40 };
  }
}

export async function lookupReservation(code) {
  try {
    const res = await fetch(`${API_BASE}/reservations/lookup/?code=${encodeURIComponent(code)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'No matching reservation found.');
    }
    return await res.json();
  } catch (err) {
    throw err;
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
      throw new Error(errData.detail || errData.error || 'Failed to submit reservation inquiry');
    }

    return await res.json();
  } catch (err) {
    console.error('[CMS API] Reservation error:', err);
    throw err;
  }
}
