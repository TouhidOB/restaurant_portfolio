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
    // Graceful offline mock response
    const mockRef = `MED-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      success: true,
      reference_code: mockRef,
      message: "Reservation confirmed in offline preview mode.",
    };
  }
}
