export const API_BASE = 'http://127.0.0.1:8001/api';

export const api = {
  // Public Content for visitors
  async getPublicContent() {
    try {
      const res = await fetch(`${API_BASE}/content/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using fallback data:', err);
      return null;
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
      throw new Error(result.error || result.message || 'Failed to submit reservation inquiry.');
    }
    return result;
  },
};
