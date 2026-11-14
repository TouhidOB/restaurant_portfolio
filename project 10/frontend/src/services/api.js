import { FALLBACK_CONTENT } from '../data/fallbackContent';

const API_BASE = '/api';

export async function fetchPublicContent() {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) {
      console.warn(`[CMS API] Backend returned status ${res.status}. Using Bengali fallback content.`);
      return FALLBACK_CONTENT;
    }
    const data = await res.json();
    if (data && data.content_json && Object.keys(data.content_json).length > 0) {
      return data.content_json;
    }
    return FALLBACK_CONTENT;
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

    return await res.json();
  } catch (err) {
    console.error('[CMS API] Error submitting reservation:', err);
    throw err;
  }
}
