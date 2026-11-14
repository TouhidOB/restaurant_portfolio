import { FALLBACK_DATA } from '../data/fallbackData';

const API_BASE = '/api';

export async function fetchPublicContent() {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) {
      console.warn(`[CMS API] Backend returned status ${res.status}. Using Parisian fallback data.`);
      return FALLBACK_DATA;
    }
    const data = await res.json();
    if (data && data.content_json && Object.keys(data.content_json).length > 0) {
      return data.content_json;
    }
    return FALLBACK_DATA;
  } catch (err) {
    console.warn('[CMS API] Could not connect to Django backend. Using fallback data.', err);
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

    return await res.json();
  } catch (err) {
    console.error('[CMS API] Error submitting reservation:', err);
    throw err;
  }
}
