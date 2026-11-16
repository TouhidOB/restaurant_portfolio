const API_BASE = '/api';

export const fetchContent = async () => {
  try {
    const res = await fetch(`${API_BASE}/content/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API not reachable, falling back to local dataset.", err);
    return null;
  }
};

export const fetchCustomPage = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.page || data.data || data;
  } catch (err) {
    console.warn(`Failed to fetch custom page ${slug}:`, err);
    return null;
  }
};

export const getCustomPage = fetchCustomPage;

export const fetchBlogPosts = async (category = 'all') => {
  try {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    const res = await fetch(`${API_BASE}/blog/${query}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.posts || data.results || data;
  } catch (err) {
    console.warn("Failed to fetch blog posts from API", err);
    return [];
  }
};

export const fetchBlogPostDetail = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch blog post ${slug}:`, err);
    return null;
  }
};

export const submitReservation = async (reservationData) => {
  const res = await fetch(`${API_BASE}/reservations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || errData.message || `HTTP error ${res.status}`);
  }
  return await res.json();
};

export const lookupReservation = async (code) => {
  try {
    const res = await fetch(`${API_BASE}/reservations/lookup/?code=${encodeURIComponent(code)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.error || 'Reservation not found' };
    }
    const data = await res.json();
    return { success: true, data: data.reservation || data.data || data };
  } catch (err) {
    console.warn("Lookup request failed:", err);
    return { success: false, error: "Network error checking reservation." };
  }
};

export const checkAvailability = async (shift = 'dinner', date = '') => {
  try {
    const params = new URLSearchParams();
    if (shift) params.append('shift', shift);
    if (date) params.append('date', date);
    const res = await fetch(`${API_BASE}/reservations/availability/?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Availability check error:", err);
    return null;
  }
};

export const fetchMenuItems = async (category = '', search = '') => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/menu/items/${query}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn("Failed to fetch menu items from API", err);
    return [];
  }
};
