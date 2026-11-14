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
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: result.detail || result.error || 'Reservation could not be submitted. Please check the details.'
      };
    }
    
    return {
      success: true,
      data: result
    };
  } catch (err) {
    console.error('Reservation submission error:', err);
    return {
      success: false,
      error: 'Network error or server unreachable. Please try again or call us directly.'
    };
  }
}
