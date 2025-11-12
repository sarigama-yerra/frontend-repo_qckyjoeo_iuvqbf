export const API_BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

async function handle(res) {
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchProjects(category) {
  const q = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${API_BASE}/api/projects${q}`);
  return handle(res);
}

export async function fetchProject(slug) {
  const res = await fetch(`${API_BASE}/api/projects/${encodeURIComponent(slug)}`);
  return handle(res);
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handle(res);
}
