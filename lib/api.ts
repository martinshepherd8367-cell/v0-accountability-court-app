const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://master-agent-brain-564112873380.us-central1.run.app';

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // Also check localStorage if we are in the browser
  if (!token && typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      authHeaders.Authorization = `Bearer ${storedToken}`;
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(headers as Record<string, string>),
    } as HeadersInit,
    ...rest,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
