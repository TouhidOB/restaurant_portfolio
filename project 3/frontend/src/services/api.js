import { fallbackData } from '../data/fallbackData';

export async function fetchFullContent() {
  try {
    const res = await fetch('/api/v1/content/', {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    return {
      settings: data.settings?.brand_name ? data.settings : fallbackData.settings,
      sections: Object.keys(data.sections || {}).length > 0 ? data.sections : fallbackData.sections,
      menu_categories: (data.menu_categories && data.menu_categories.length > 0) ? data.menu_categories : fallbackData.menu_categories,
      tour_viewpoints: (data.tour_viewpoints && data.tour_viewpoints.length > 0) ? data.tour_viewpoints : fallbackData.tour_viewpoints,
      dining_spaces: (data.dining_spaces && data.dining_spaces.length > 0) ? data.dining_spaces : fallbackData.dining_spaces,
      culinary_pillars: (data.culinary_pillars && data.culinary_pillars.length > 0) ? data.culinary_pillars : fallbackData.culinary_pillars,
      team_members: (data.team_members && data.team_members.length > 0) ? data.team_members : fallbackData.team_members,
      private_events: (data.private_events && data.private_events.length > 0) ? data.private_events : fallbackData.private_events,
      gallery_items: (data.gallery_items && data.gallery_items.length > 0) ? data.gallery_items : fallbackData.gallery_items,
      testimonials: (data.testimonials && data.testimonials.length > 0) ? data.testimonials : fallbackData.testimonials,
      opening_hours: (data.opening_hours && data.opening_hours.length > 0) ? data.opening_hours : fallbackData.opening_hours,
      custom_pages: (data.custom_pages && data.custom_pages.length > 0) ? data.custom_pages : fallbackData.custom_pages,
      blog_categories: (data.blog_categories && data.blog_categories.length > 0) ? data.blog_categories : fallbackData.blog_categories,
      blog_posts: (data.blog_posts && data.blog_posts.length > 0) ? data.blog_posts : fallbackData.blog_posts,
    };
  } catch (err) {
    console.warn("Using offline fallback data for Aura Marina:", err);
    return fallbackData;
  }
}

export async function submitReservation(inquiryData) {
  try {
    const res = await fetch('/api/v1/reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, errors: data.errors || data.message || "Failed to submit reservation inquiry" };
    }
    return {
      success: true,
      reference_code: data.reference_code,
      message: data.message,
    };
  } catch (err) {
    const mockRef = `AUM-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      success: true,
      reference_code: mockRef,
      message: "Reservation confirmed in offline preview mode.",
    };
  }
}

export async function lookupReservation(query) {
  try {
    const params = new URLSearchParams();
    if (query.code) params.set('code', query.code);
    if (query.phone) params.set('phone', query.phone);
    if (query.email) params.set('email', query.email);

    const res = await fetch(`/api/v1/reservations/lookup/?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "No reservation found" };
    }
    return { success: true, count: data.count, reservations: data.reservations };
  } catch (err) {
    return { success: false, message: "Network error looking up reservation." };
  }
}

export async function fetchReservationAvailability(date) {
  try {
    const res = await fetch(`/api/v1/reservations/availability/?date=${date}`);
    if (!res.ok) throw new Error("Availability query failed");
    return await res.json();
  } catch (err) {
    return {
      status: "success",
      date,
      max_tables: 12,
      shifts: {
        lunch: { time_range: "12:00 - 15:30", available_tables: 6, is_full: false },
        dinner: { time_range: "19:00 - 23:30", available_tables: 4, is_full: false }
      }
    };
  }
}

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`/api/v1/pages/${slug}/`);
    if (!res.ok) throw new Error("Page not found");
    const data = await res.json();
    return data.page;
  } catch (err) {
    const found = fallbackData.custom_pages?.find(p => p.slug === slug);
    if (found) return found;
    throw err;
  }
}

export async function fetchBlogPosts(categorySlug = '', search = '') {
  try {
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    if (search) params.set('search', search);

    const res = await fetch(`/api/v1/blog/?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to load blog posts");
    return await res.json();
  } catch (err) {
    let posts = fallbackData.blog_posts || [];
    if (categorySlug) {
      posts = posts.filter(p => p.category_slug === categorySlug);
    }
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return {
      status: "success",
      count: posts.length,
      posts,
      categories: fallbackData.blog_categories || []
    };
  }
}

export async function fetchBlogPostDetail(slug) {
  try {
    const res = await fetch(`/api/v1/blog/${slug}/`);
    if (!res.ok) throw new Error("Article not found");
    const data = await res.json();
    return data.post;
  } catch (err) {
    const found = fallbackData.blog_posts?.find(p => p.slug === slug);
    if (found) {
      return {
        ...found,
        related_posts: (fallbackData.blog_posts || []).filter(p => p.slug !== slug).slice(0, 3)
      };
    }
    throw err;
  }
}
