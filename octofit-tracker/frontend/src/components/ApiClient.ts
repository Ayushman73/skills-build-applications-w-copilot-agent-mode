const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export async function fetchApi<T>(path: string): Promise<ApiResponse<T>> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  try {
    const response = await fetch(`${apiHost}${normalizedPath}`);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { data: null as unknown as T, error: body?.error || response.statusText };
    }

    const payload = await response.json();
    const data = Array.isArray(payload)
      ? payload
      : payload?.data ?? payload;

    return { data };
  } catch (error) {
    return {
      data: null as unknown as T,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
