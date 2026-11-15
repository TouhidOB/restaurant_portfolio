/**
 * Django REST Framework API Client
 */
import { restaurantConfig } from '../data/restaurant';

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
        custom_pages: data.custom_pages || [],
        blog_posts: data.blog_posts || restaurantConfig.blog_posts,
        blog_categories: data.blog_categories || restaurantConfig.blog_categories,
      };
    } catch (err) {
      console.warn('Backend unavailable, using local fallback:', err);
      return {
        exists: false,
        restaurant_name: restaurantConfig.name,
        content: restaurantConfig,
        custom_pages: [],
        blog_posts: restaurantConfig.blog_posts,
        blog_categories: restaurantConfig.blog_categories,
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
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.error || (err.non_field_errors && err.non_field_errors.join(' ')) || Object.entries(err).map(([k, v]) => `${k}: ${v}`).join(' ');
      throw new Error(msg || 'Failed to submit reservation.');
    }
    return await res.json();
  },

  // Admin Authentication
  async loginAdmin(username, password) {
    const res = await fetch(`${API_BASE}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed.');
    }
    return data;
  },

  async logoutAdmin(token) {
    try {
      await fetch(`${API_BASE}/auth/logout/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (e) {}
  },

  async getMe(token) {
    const res = await fetch(`${API_BASE}/auth/me/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) throw new Error('Session expired');
    return await res.json();
  },

  // Admin-Only: Save full CMS content
  async saveContent(contentJson, token) {
    const res = await fetch(`${API_BASE}/content/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(contentJson),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to save to Django backend.');
    }
    return data;
  },

  // Admin-Only: Fetch customer reservations
  async getReservations(token) {
    const res = await fetch(`${API_BASE}/reservations/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch reservations.');
    return await res.json();
  },

  // Admin-Only: Update reservation status
  async updateReservationStatus(id, status, token) {
    const res = await fetch(`${API_BASE}/reservations/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status.');
    return await res.json();
  },
};

// Named Exports for dedicated pages
export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`[API] Failed to fetch custom page '${slug}':`, err);
    return null;
  }
}

export async function lookupReservation(query) {
  try {
    const isEmail = query.includes('@');
    const param = isEmail ? `email=${encodeURIComponent(query)}` : `code=${encodeURIComponent(query)}`;
    const res = await fetch(`${API_BASE}/reservations/lookup/?${param}`);
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
    let posts = restaurantConfig.blog_posts || [];
    if (params.category && params.category !== 'ALL') {
      posts = posts.filter(p => p.category_slug === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    if (params.featured) {
      posts = posts.filter(p => p.is_featured);
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
    const post = (restaurantConfig.blog_posts || []).find(p => p.slug === slug);
    if (!post) return null;
    const related = (restaurantConfig.blog_posts || [])
      .filter(p => p.slug !== slug && (!post.category_slug || p.category_slug === post.category_slug))
      .slice(0, 3);
    return {
      ...post,
      related_posts: related,
    };
  }
}
