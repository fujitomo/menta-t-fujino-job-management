import camelcaseKeys from 'camelcase-keys';
import { FetchError } from './error';

interface PostOptions extends RequestInit {
  disableRedirect?: boolean;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const normalizeErrorMessages = (status: number, body: unknown): string[] => {
  if (body && typeof body === 'object') {
    const errors = (body as { errors?: unknown }).errors;

    if (Array.isArray(errors)) {
      const validErrors = errors.filter(
        (error): error is string => typeof error === 'string',
      );

      if (validErrors.length > 0) {
        return validErrors;
      }
    }

    const message = (body as { message?: unknown }).message;

    if (typeof message === 'string' && message.length > 0) {
      return [message];
    }
  }

  return [`HTTP error! status: ${status}`];
};

const throwFetchError = async (response: Response): Promise<never> => {
  let body: unknown;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  throw new FetchError(
    response.status,
    normalizeErrorMessages(response.status, body),
  );
};

const resolveInternalUrl = (url: string) => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  if (typeof window === 'undefined') {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

    return `${baseUrl}${url}`;
  }

  return url;
};

const generateAuthHeaders = (token: string) => {
  return {
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  };
};

const get = async <T>(
  url: string,
  options?: RequestInit & { disableCamelcaseKeys?: boolean },
): Promise<T> => {
  const resolvedUrl = resolveInternalUrl(url);
  const response = await fetch(resolvedUrl, {
    cache: options?.cache ?? 'no-store',
    next: {
      revalidate: 0,
      ...options?.next,
    },
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    return throwFetchError(response);
  }

  const data = await response.json();

  return options?.disableCamelcaseKeys
    ? data
    : camelcaseKeys(data, { deep: true });
};

const post = async <T, U>(
  url: string,
  params?: U,
  options?: PostOptions,
): Promise<T> => {
  const resolvedUrl = resolveInternalUrl(url);
  const { ...fetchOptions } = options || {};

  const response = await fetch(resolvedUrl, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
    credentials: 'include',
    body: params ? JSON.stringify(params) : undefined,
    ...fetchOptions,
  });

  if (!response.ok) {
    return throwFetchError(response);
  }

  const data = await response.json();

  return camelcaseKeys(data, { deep: true });
};

const put = async <T, U>(
  url: string,
  params?: U,
  options?: RequestInit,
): Promise<T> => {
  const resolvedUrl = resolveInternalUrl(url);
  const response = await fetch(resolvedUrl, {
    method: 'PUT',
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
    credentials: 'include',
    body: params ? JSON.stringify(params) : undefined,
    ...options,
  });

  if (!response.ok) {
    return throwFetchError(response);
  }

  const data = await response.json();

  return camelcaseKeys(data, { deep: true });
};

const destroy = async <T>(
  url: string,
  params?: Record<string, unknown>,
  options?: RequestInit,
): Promise<T> => {
  const resolvedUrl = resolveInternalUrl(url);
  const response = await fetch(resolvedUrl, {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
    body: params ? JSON.stringify(params) : undefined,
    ...options,
  });

  if (!response.ok) {
    return throwFetchError(response);
  }

  const data = await response.json();

  return camelcaseKeys(data, { deep: true });
};

export const ApiClientUtils = {
  get,
  post,
  put,
  destroy,
  generateAuthHeaders,
};
