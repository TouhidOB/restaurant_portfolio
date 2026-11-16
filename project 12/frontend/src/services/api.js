import { fallbackContent } from '../data/fallbackContent';

const API_BASE = '/api';

export const fetchPublicContent = async () => {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) {
      console.warn(`[CMS API] Backend returned status ${res.status}. Using fallback content.`);
      return fallbackContent;
    }
    const data = await res.json();
    return {
      ...fallbackContent,
      ...data,
      site_config: data.site_config && Object.keys(data.site_config).length > 0 ? data.site_config : fallbackContent.site_config,
      editorial_sections: data.editorial_sections && Object.keys(data.editorial_sections).length > 0 ? data.editorial_sections : fallbackContent.editorial_sections,
      menu_categories: data.menu_categories && data.menu_categories.length > 0 ? data.menu_categories : fallbackContent.menu_categories,
      signature_dishes: data.signature_dishes && data.signature_dishes.length > 0 ? data.signature_dishes : fallbackContent.signature_dishes,
      tour_viewpoints: data.tour_viewpoints && data.tour_viewpoints.length > 0 ? data.tour_viewpoints : fallbackContent.tour_viewpoints,
      dining_experiences: data.dining_experiences && data.dining_experiences.length > 0 ? data.dining_experiences : fallbackContent.dining_experiences,
      team_members: data.team_members && data.team_members.length > 0 ? data.team_members : fallbackContent.team_members,
      testimonials: data.testimonials && data.testimonials.length > 0 ? data.testimonials : fallbackContent.testimonials,
      gallery_images: data.gallery_images && data.gallery_images.length > 0 ? data.gallery_images : fallbackContent.gallery_images,
      custom_pages: data.custom_pages && data.custom_pages.length > 0 ? data.custom_pages : fallbackContent.custom_pages,
      blog_posts: data.blog_posts && data.blog_posts.length > 0 ? data.blog_posts : fallbackContent.blog_posts,
      blog_categories: data.blog_categories && data.blog_categories.length > 0 ? data.blog_categories : fallbackContent.blog_categories,
    };
  } catch (err) {
    console.warn("Public content fetch error (using fallback):", err);
    return fallbackContent;
  }
};

export const fetchMenuCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/menu/categories/`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return fallbackContent.menu_categories || [];
  }
};

export const fetchMenuItems = async () => {
  try {
    const res = await fetch(`${API_BASE}/menu/items/`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return [];
  }
};

export const fetchCustomPages = async () => {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) return fallbackContent.custom_pages || [];
    const data = await res.json();
    return data.custom_pages || fallbackContent.custom_pages || [];
  } catch (err) {
    return fallbackContent.custom_pages || [];
  }
};

export const fetchCustomPage = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) {
      const fallback = (fallbackContent.custom_pages || []).find((p) => p.slug === slug);
      return fallback ? { page: fallback, data: fallback } : null;
    }
    const data = await res.json();
    return { data: data.page || data, page: data.page || data };
  } catch (err) {
    const fallback = (fallbackContent.custom_pages || []).find((p) => p.slug === slug);
    return fallback ? { page: fallback, data: fallback } : null;
  }
};
export const getCustomPage = fetchCustomPage;

export const fetchBlogPosts = async (categorySlug = null) => {
  try {
    const url = categorySlug ? `${API_BASE}/blog/?category=${categorySlug}` : `${API_BASE}/blog/`;
    const res = await fetch(url);
    if (!res.ok) return fallbackContent.blog_posts || [];
    const data = await res.json();
    return data.posts || data.results || data || [];
  } catch (err) {
    return fallbackContent.blog_posts || [];
  }
};
export const getBlogPosts = fetchBlogPosts;

export const fetchBlogPostDetail = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`);
    if (!res.ok) {
      const fallback = (fallbackContent.blog_posts || []).find((p) => p.slug === slug);
      return fallback ? { post: fallback, data: fallback } : null;
    }
    const data = await res.json();
    return { data: data.post || data, post: data.post || data };
  } catch (err) {
    const fallback = (fallbackContent.blog_posts || []).find((p) => p.slug === slug);
    return fallback ? { post: fallback, data: fallback } : null;
  }
};
export const getBlogPost = fetchBlogPostDetail;

export const checkReservationAvailability = async (date, shift = 'lunch') => {
  try {
    const res = await fetch(`${API_BASE}/reservations/availability/?date=${encodeURIComponent(date)}&shift=${encodeURIComponent(shift)}`);
    if (!res.ok) return { is_available: true, remaining_covers: 40, shift };
    return await res.json();
  } catch (err) {
    return { is_available: true, remaining_covers: 40, shift };
  }
};

export const lookupReservation = async (code) => {
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
};

export const submitReservation = async (reservationData) => {
  try {
    const res = await fetch(`${API_BASE}/reservations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to submit reservation inquiry');
    }
    return { ok: true, data };
  } catch (err) {
    console.error("Reservation submission error:", err);
    return { ok: false, error: err.message };
  }
};
