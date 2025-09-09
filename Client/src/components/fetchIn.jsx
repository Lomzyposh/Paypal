const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: "include",
    });
    return res;
}