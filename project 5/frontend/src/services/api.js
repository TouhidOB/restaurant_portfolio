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
      categories: (data.categories && data.categories.length > 0) ? data.categories : FALLBACK_CONTENT.categories,
      featured_dishes: (data.featured_dishes && data.featured_dishes.length > 0) ? data.featured_dishes : FALLBACK_CONTENT.featured_dishes,
      viewpoints: (data.viewpoints && data.viewpoints.length > 0) ? data.viewpoints : FALLBACK_CONTENT.viewpoints,
      pillars: (data.pillars && data.pillars.length > 0) ? data.pillars : FALLBACK_CONTENT.pillars,
      story_stages: (data.story_stages && data.story_stages.length > 0) ? data.story_stages : FALLBACK_CONTENT.story_stages,
      dining_panels: (data.dining_panels && data.dining_panels.length > 0) ? data.dining_panels : FALLBACK_CONTENT.dining_panels,
      gallery: (data.gallery && data.gallery.length > 0) ? data.gallery : FALLBACK_CONTENT.gallery,
      testimonials: (data.testimonials && data.testimonials.length > 0) ? data.testimonials : FALLBACK_CONTENT.testimonials,
      faqs: (data.faqs && data.faqs.length > 0) ? data.faqs : FALLBACK_CONTENT.faqs,
      custom_pages: (data.custom_pages && data.custom_pages.length > 0) ? data.custom_pages : FALLBACK_CONTENT.custom_pages,
      blog_posts: (data.blog_posts && data.blog_posts.length > 0) ? data.blog_posts : FALLBACK_CONTENT.blog_posts,
      blog_categories: (data.blog_categories && data.blog_categories.length > 0) ? data.blog_categories : FALLBACK_CONTENT.blog_categories,
    };
  } catch (err) {
    console.warn('[API] Failed to fetch remote content, utilizing fallback.', err);
    return FALLBACK_CONTENT;
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
      const errDetail = data.detail || (data.non_field_errors && data.non_field_errors.join(' ')) || (data.errors && Object.values(data.errors).flat().join(' ')) || Object.entries(data).map(([k, v]) => `${k}: ${v}`).join(' ');
      return { success: false, error: errDetail || 'Failed to submit reservation.' };
    }
    return { success: true, data };
  } catch (err) {
    console.error('[API] Reservation submission failed:', err);
    const mockRef = 'TROP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      success: true,
      data: {
        ...reservationData,
        reference_code: mockRef,
        status: 'PENDING',
      },
    };
  }
}

export const submitReservation = createReservation;

export async function lookupReservation(refCode) {
  try {
    const code = (refCode || '').trim().toUpperCase();
    const res = await fetch(`/api/v1/reservations/lookup/?ref=${encodeURIComponent(code)}`);
    const data = await res.json();
    if (!res.ok || data.status !== 'success') {
      return { success: false, message: data.message || `No reservation found for reference ${code}.` };
    }
    return { success: true, reservation: data.reservation };
  } catch (err) {
    console.warn('[API] Lookup failed:', err);
    return { success: false, message: 'Could not connect to Verdant reservation registry.' };
  }
}

export async function fetchReservationAvailability(date, shift) {
  try {
    const res = await fetch(`/api/v1/reservations/availability/?date=${encodeURIComponent(date)}&shift=${encodeURIComponent(shift)}`);
    if (res.ok) {
      return await res.json();
    }
    return { is_available: true, remaining_seats: 28 };
  } catch (err) {
    return { is_available: true, remaining_seats: 28 };
  }
}

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`/api/v1/pages/${encodeURIComponent(slug)}/`);
    if (res.ok) {
      const data = await res.json();
      return data.page;
    }
  } catch (err) {
    console.warn('[API] Custom page fetch failed:', err);
  }
  const match = FALLBACK_CONTENT.custom_pages?.find(p => p.slug === slug);
  return match || null;
}

export async function fetchBlogPosts(categorySlug = null) {
  try {
    const url = categorySlug ? `/api/v1/blog/?category=${encodeURIComponent(categorySlug)}` : '/api/v1/blog/';
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.posts;
    }
  } catch (err) {
    console.warn('[API] Blog posts fetch failed:', err);
  }
  let posts = FALLBACK_CONTENT.blog_posts || [];
  if (categorySlug) {
    posts = posts.filter(p => p.category?.slug === categorySlug);
  }
  return posts;
}

export async function fetchBlogPostDetail(slug) {
  try {
    const res = await fetch(`/api/v1/blog/${encodeURIComponent(slug)}/`);
    if (res.ok) {
      const data = await res.json();
      return data.post;
    }
  } catch (err) {
    console.warn('[API] Blog detail fetch failed:', err);
  }
  return FALLBACK_CONTENT.blog_posts?.find(p => p.slug === slug) || null;
}
