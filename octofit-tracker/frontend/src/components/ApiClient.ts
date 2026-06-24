const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const host = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";

export const apiBase = `${host}/api`;

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export async function fetchApi<T>(path: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${apiBase}${path}`);
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
