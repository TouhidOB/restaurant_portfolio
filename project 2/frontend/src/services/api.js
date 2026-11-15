import { fallbackData } from '../data/fallbackData';

export const API_BASE = '/api';

export const api = {
  // Public Content for visitors
  async getPublicContent() {
    try {
      const res = await fetch(`${API_BASE}/content/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        ...data,
        custom_pages: data.custom_pages || fallbackData.custom_pages,
        blog_posts: data.blog_posts || fallbackData.blog_posts,
        blog_categories: data.blog_categories || fallbackData.blog_categories,
      };
    } catch (err) {
      console.warn('Backend unavailable, using fallback data:', err);
      return {
        exists: false,
        restaurant_name: fallbackData.name,
        content: fallbackData,
        custom_pages: fallbackData.custom_pages,
        blog_posts: fallbackData.blog_posts,
        blog_categories: fallbackData.blog_categories,
      };
    }
  },

  // Public Table Reservation submission for customers
  async submitReservation(data) {
    const res = await fetch(`${API_BASE}/reservations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = result.error || (result.non_field_errors && result.non_field_errors.join(' ')) || Object.entries(result).map(([k, v]) => `${k}: ${v}`).join(' ');
      throw new Error(msg || 'Failed to submit reservation inquiry.');
    }
    return result;
  },

  // Lookup reservation status by reference code or phone/email
  async lookupReservation(query) {
    return lookupReservation(query);
  },
};

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API] Custom page '${slug}' fetch failed, using fallback data.`, err);
    return (fallbackData.custom_pages || []).find((p) => p.slug === slug) || null;
  }
}

export async function lookupReservation(query) {
  try {
    const res = await fetch(`${API_BASE}/reservations/lookup/?q=${encodeURIComponent(query)}`);
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
    const res = await fetch(`${API_BASE}/reservations/availability/?date=${date || ''}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('[API] Failed to fetch availability:', err);
    return null;
  }
}

export async function fetchBlogPosts(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.set('category', params.category);
    if (params.search) searchParams.set('search', params.search);
    if (params.featured) searchParams.set('featured', 'true');

    const qs = searchParams.toString();
    const url = `${API_BASE}/blog/${qs ? `?${qs}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Blog posts fetch failed, filtering fallback data.', err);
    let posts = fallbackData.blog_posts || [];
    if (params.category && params.category !== 'ALL') {
      posts = posts.filter((p) => p.category_slug === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    if (params.featured) {
      posts = posts.filter((p) => p.is_featured);
    }
    return posts;
  }
}

export async function fetchBlogPostDetail(slug) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API] Blog post detail for '${slug}' fetch failed, finding in fallback data.`, err);
    const post = (fallbackData.blog_posts || []).find((p) => p.slug === slug);
    if (!post) return null;
    const related = (fallbackData.blog_posts || [])
      .filter((p) => p.slug !== slug && (!post.category_slug || p.category_slug === post.category_slug))
      .slice(0, 3);
    return {
      ...post,
      related_posts: related,
    };
  }
}
