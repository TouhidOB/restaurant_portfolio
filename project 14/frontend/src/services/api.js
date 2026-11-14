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

export const submitReservation = async (reservationData) => {
  const res = await fetch(`${API_BASE}/reservations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
};
