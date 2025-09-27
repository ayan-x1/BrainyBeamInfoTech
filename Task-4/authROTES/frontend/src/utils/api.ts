const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

interface ApiError extends Error {
  status?: number;
  data?: any;
}

export async function apiFetch(path: string, opts: RequestInit = {}): Promise<any> {
  const url = `${API_BASE}${path}`;
  
  const config: RequestInit = {
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    ...opts,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data?.message || `HTTP error! status: ${response.status}`) as ApiError;
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error: any) {
    // Network errors or other issues
    if (!error.status) {
      error.message = 'Network error. Please check your connection and try again.';
    }
    
    // Don't log expected auth errors (like missing refresh tokens) as errors
    if (error.status === 401 && error.message?.includes('Refresh token not provided')) {
      // This is expected when user hasn't logged in yet
    } else {
      console.error('API request failed:', error);
    }
    
    throw error;
  }
}

// Wrapper for authenticated requests
export async function authenticatedFetch(path: string, opts: RequestInit = {}): Promise<any> {
  try {
    return await apiFetch(path, opts);
  } catch (error: any) {
    // If we get a 401, try to refresh the token once
    if (error.status === 401) {
      try {
        await apiFetch('/auth/refresh', { method: 'POST' });
        // Retry the original request
        return await apiFetch(path, opts);
      } catch (refreshError) {
        // Refresh failed, user needs to login again
        console.error('Token refresh failed:', refreshError);
        throw refreshError;
      }
    }
    throw error;
  }
}