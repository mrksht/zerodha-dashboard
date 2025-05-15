const BASE_URL = 'https://zerodha-backend-production.up.railway.app';
// const BASE_URL = 'http://localhost:4004';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('kite_session_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function fetchWithoutAuth(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const authService = {
  getLoginUrl: async (): Promise<string> => {
    const res = await fetch(`${BASE_URL}/`);
    console.log(res, 'res')
    const text = await res.text();
    const match = text.match(/href="([^"]+)"/);
    if (!match) throw new Error("Login URL not found");
    console.log(match, 'm')
    return match[1];
  },

  processCallback: async (request_token: string) => {
    return fetchWithoutAuth(`/callback?request_token=${request_token}`);
  },

  logoutSession: async (access_token: string) => {
    return fetchWithoutAuth(`/logout?access_token=${access_token}`);
  },
};

export const userService = {
  getPortfolio: async () => {
    return fetchWithAuth('/portfolio');
  },

  getProfile: async () => {
    return fetchWithAuth('/profile');
  },
};
