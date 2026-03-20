'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { useAuth } from './auth-context';

const APIContext = createContext<AxiosInstance | null>(null);

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://app-cherami-prod.azurewebsites.net',
  timeout: 30000,
  transformResponse: [
    ...(axios.defaults.transformResponse as []),
    (data: unknown) => {
      function reviveDates(obj: unknown): unknown {
        if (obj === null || obj === undefined) return obj;

        if (typeof obj === 'string') {
          const dateRegex =
            /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/;

          if (dateRegex.test(obj)) {
            const d = new Date(obj);
            if (!isNaN(d.getTime())) return d;
          }
        }

        if (Array.isArray(obj)) return obj.map(reviveDates);

        if (typeof obj === 'object') {
          const record = obj as Record<string, unknown>;
          for (const key in record) {
            if (Object.prototype.hasOwnProperty.call(record, key)) {
              record[key] = reviveDates(record[key]);
            }
          }
        }

        return obj;
      }

      return reviveDates(data);
    },
  ],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

export default function APIProvider({ children }: { children: ReactNode }) {
  const { getToken, deleteToken } = useAuth();
  const router = useRouter();
  const interceptorsRef = useRef<number[]>([]);

  useEffect(() => {
    // Clean up old interceptors
    interceptorsRef.current.forEach((id, i) => {
      if (i === 0) api.interceptors.request.eject(id);
      else api.interceptors.response.eject(id);
    });

    const attachToken = api.interceptors.request.use(
      (config) => {
        const openURLs = ['/auth/email', '/auth/email/verify', '/auth/google/token', '/auth/apple/token'];
        if (config.url && !openURLs.includes(config.url)) {
          const token = getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const staleToken = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 ||
          error.response?.status === 500
        ) {
          deleteToken();
          router.push('/app/login');
        }
        return Promise.reject(error);
      },
    );

    const logError = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          console.error('ProblemDetails: ', error.response.data);
        }
        return Promise.reject(error);
      },
    );

    interceptorsRef.current = [attachToken, staleToken, logError];

    return () => {
      api.interceptors.request.eject(attachToken);
      api.interceptors.response.eject(staleToken);
      api.interceptors.response.eject(logError);
    };
  }, [deleteToken, getToken, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <APIContext.Provider value={api}>{children}</APIContext.Provider>
    </QueryClientProvider>
  );
}
