/**
 * API Service for POP! FOOD STUDIO
 * Connects to Django REST Framework backend with graceful fallback handling
 */

const API_BASE = '/api';

export async function fetchPublicContent() {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch content`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API fetchPublicContent fallback invoked:', err.message);
    return null;
  }
}

export const fetchContent = fetchPublicContent;

export async function fetchCustomPage(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API fetchCustomPage(${slug}) failed:`, err.message);
    return null;
  }
}

export const getCustomPage = fetchCustomPage;

export async function fetchBlogPosts(category = '') {
  try {
    const url = category && category !== 'all' ? `${API_BASE}/blog/?category=${category}` : `${API_BASE}/blog/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API fetchBlogPosts failed:', err.message);
    return null;
  }
}

export async function fetchBlogPostDetail(slug) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API fetchBlogPostDetail(${slug}) failed:`, err.message);
    return null;
  }
}

export async function fetchMenuItems() {
  try {
    const res = await fetch(`${API_BASE}/menu/items/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API fetchMenuItems fallback invoked:', err.message);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/menu/categories/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API fetchCategories fallback invoked:', err.message);
    return null;
  }
}

export async function submitReservation(data) {
  try {
    const res = await fetch(`${API_BASE}/reservations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || errData.message || `Server error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error('API submitReservation error:', err.message);
    throw err;
  }
}

export async function lookupReservation(code) {
  try {
    const res = await fetch(`${API_BASE}/reservations/lookup/?code=${encodeURIComponent(code)}`);
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Booking reference not found' };
    }
    return { success: true, data: data.reservation || data };
  } catch (err) {
    console.warn('API lookupReservation error:', err.message);
    return { success: false, error: 'Network error communicating with reservations desk.' };
  }
}

export async function checkAvailability(shift = 'dinner', date = '') {
  try {
    const res = await fetch(`${API_BASE}/reservations/availability/?shift=${shift}&date=${date}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API checkAvailability error:', err.message);
    return {
      status: 'available',
      shift,
      available_slots: shift === 'lunch' ? ["11:30 AM", "12:30 PM", "1:30 PM"] : ["6:00 PM", "7:30 PM", "8:45 PM"]
    };
  }
}
