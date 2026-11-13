/**
 * Django REST Framework API Client
 */

export const API_BASE = 'http://127.0.0.1:8001/api';

export const api = {
  // Public Content for visitors
  async getPublicContent() {
    try {
      const res = await fetch(`${API_BASE}/content/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using local fallback:', err);
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
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit reservation.');
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
    return data; // { token, user, message }
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
