export const fetchPublicContent = async () => {
  try {
    const res = await fetch('/api/content/');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Public content fetch error (using fallback):", err);
    return null;
  }
};

export const fetchMenuCategories = async () => {
  try {
    const res = await fetch('/api/menu/categories/');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Categories fetch error:", err);
    return [];
  }
};

export const fetchMenuItems = async () => {
  try {
    const res = await fetch('/api/menu/items/');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Items fetch error:", err);
    return [];
  }
};

export const submitReservation = async (reservationData) => {
  try {
    const res = await fetch('/api/reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Reservation submission error:", err);
    return { ok: false, error: err.message };
  }
};
