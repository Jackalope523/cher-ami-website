'use client';

import { useAPI } from './api-context';
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import {
  AddPostRequest,
  CreateCircleRequest,
  EmailAuthRequest,
  EmailVerifyRequest,
  IdRequest,
  JoinCircleRequest,
  RecipientRequest,
  TokenRequest,
  UpdateCircleRequest,
  UpdateRecipientRequest,
  UpdateUserRequest,
} from './types/requests';
import {
  CardDTO,
  CircleDTO,
  CodeResponse,
  ConfigResponse,
  FeedPageResponse,
  LoginResponse,
  PriceResponse,
  RecipientDTO,
  UserDTO,
  UserItem,
} from './types/responses';

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function usePostCountQuery() {
  const api = useAPI();
  return useQuery<number, AxiosError>({
    queryKey: ['PostCount'],
    queryFn: async () => {
      const response = await api.get('/issue/posts/count');
      return response.data;
    },
  });
}

export function useGetPriceQuery() {
  const api = useAPI();
  return useQuery<PriceResponse, AxiosError>({
    queryKey: ['Price'],
    queryFn: async () => {
      const response = await api.get<PriceResponse>('/v2/recipient/price');
      return response.data;
    },
  });
}

export function useBlockedUsersQuery() {
  const api = useAPI();
  return useQuery<UserItem[], AxiosError>({
    queryKey: ['BlockedUsers'],
    queryFn: async () => {
      const response = await api.get('/users/blocked');
      return response.data;
    },
  });
}

export function useGetCircleQuery() {
  const api = useAPI();
  return useQuery<CircleDTO | null, AxiosError>({
    queryKey: ['Circle'],
    queryFn: async () => {
      const response = await api.get('/circle');
      return response.status === 204 ? null : response.data;
    },
  });
}

export function useConfigQuery() {
  const api = useAPI();
  return useQuery<ConfigResponse, AxiosError>({
    queryKey: ['Config'],
    queryFn: async () => {
      const response = await api.get('/config');
      return response.data;
    },
  });
}

export function useGetSelfQuery() {
  const api = useAPI();
  return useQuery<UserDTO, AxiosError>({
    queryKey: ['User', 'Self'],
    queryFn: async () => {
      const response = await api.get<UserDTO>('/user');
      return response.data;
    },
  });
}

export function useGetPaymentMethodQuery() {
  const api = useAPI();
  return useQuery<CardDTO | null, AxiosError>({
    queryKey: ['PaymentMethod'],
    queryFn: async () => {
      const response = await api.get<CardDTO[]>('/payment-methods');
      return response.data[0] ?? null;
    },
  });
}

export function useGetUserQuery(id: number) {
  const api = useAPI();
  return useQuery<UserDTO, AxiosError>({
    queryKey: ['User', id],
    queryFn: async () => {
      const response = await api.get<UserDTO>(`/users/${id}`);
      return response.data;
    },
  });
}

export function useGetRecipientQuery(id: number) {
  const api = useAPI();
  return useQuery<RecipientDTO, AxiosError>({
    queryKey: ['Recipient', id],
    queryFn: async () => {
      const response = await api.get<RecipientDTO>(`/circle/recipients/${id}`);
      return response.data;
    },
  });
}

export function useFeedPostsInfiniteQuery(enabled: boolean = true) {
  const api = useAPI();
  return useInfiniteQuery<FeedPageResponse, AxiosError>({
    queryKey: ['FeedPages'],
    queryFn: async ({ pageParam = 0 }: QueryFunctionContext) => {
      const response = await api.get<FeedPageResponse>(
        `/circle/issues/${pageParam}`,
      );
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled,
  });
}

export function useAddPostMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, AddPostRequest>({
    mutationKey: ['AddPost'],
    mutationFn: async (request) => {
      const formData = new FormData();
      formData.append('Time', request.time);
      formData.append('Caption', request.caption);
      formData.append('Image', request.imageFile);
      formData.append('ImageWidth', request.imageWidth.toString());
      formData.append('ImageHeight', request.imageHeight.toString());

      await api.post('/issue/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['FeedPages'] }),
        queryClient.invalidateQueries({ queryKey: ['PostCount'] }),
      ]);
      onSuccess?.();
    },
    onError,
  });
}

export function useDeletePostMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, IdRequest>({
    mutationFn: async (request) => {
      await api.delete(`/posts/${request.Id}`);
    },
    onSuccess,
    onError,
  });
}

export function useRemovePaymentMethodMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await api.delete('/payment-method');
    },
    onSuccess,
    onError,
  });
}

export function useDeleteRecipientMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, IdRequest>({
    mutationFn: async (request) => {
      await api.delete(`/circle/recipients/${request.Id}`);
    },
    onSuccess,
    onError,
  });
}

export function useUpdateHeaderMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('Image', file);

      await api.post('/circle/header', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      onSuccess?.();
    },
    onError,
  });
}

export function useUpdateAvatarMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();
  const selfQuery = useGetSelfQuery();

  return useMutation<void, AxiosError, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('Image', file);

      await api.post('/user/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['User', 'Self'] }),
        queryClient.invalidateQueries({
          queryKey: ['User', Number(selfQuery.data?.id)],
        }),
        queryClient.invalidateQueries({ queryKey: ['Circle'] }),
      ]);
      onSuccess?.();
    },
    onError,
  });
}

export function useEmailAuthMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, EmailAuthRequest>({
    mutationFn: async (request) => {
      await api.post<void>('/auth/email', request);
    },
    onSuccess,
    onError,
  });
}

export function useEmailVerifyMutation(
  onSuccess?: (response: LoginResponse) => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<LoginResponse, AxiosError, EmailVerifyRequest>({
    mutationFn: async (request) => {
      if (process.env.NODE_ENV === 'development') {
        return { token: 'dev-mock-token', onboarded: false };
      }
      const response = await api.post<LoginResponse>(
        '/auth/email/verify',
        request,
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
}

export function useRerollCodeMutation(
  onSuccess?: (data: CodeResponse) => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<CodeResponse, AxiosError>({
    mutationFn: async () => {
      const response = await api.post<CodeResponse>('/circle/code');
      return response.data;
    },
    onSuccess,
    onError,
  });
}

export function useUpdateUserMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();
  const selfQuery = useGetSelfQuery();

  return useMutation<void, AxiosError, UpdateUserRequest>({
    mutationKey: ['UpdateUser'],
    mutationFn: async (request) => {
      const formData = new FormData();
      formData.append('FirstName', request.firstName);
      formData.append('LastName', request.lastName);

      if (request.avatarFile) {
        formData.append('Avatar', request.avatarFile);
      }

      await api.put('/user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['User', 'Self'] }),
        queryClient.invalidateQueries({
          queryKey: ['User', Number(selfQuery.data?.id)],
        }),
        queryClient.invalidateQueries({ queryKey: ['Circle'] }),
      ]);
      onSuccess?.();
    },
    onError,
  });
}

export function useUpdateCircleMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, UpdateCircleRequest>({
    mutationKey: ['UpdateCircle'],
    mutationFn: async (request) => {
      const formData = new FormData();
      formData.append('Title', request.title);

      if (request.headerFile) {
        formData.append('Header', request.headerFile);
      }

      await api.put('/circle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      onSuccess?.();
    },
    onError,
  });
}

export function useDeleteUserMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await api.delete('/user');
    },
    onSuccess,
    onError,
  });
}

export function useUpdateRecipientMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, UpdateRecipientRequest>({
    mutationFn: async (request) => {
      const formData = new FormData();
      formData.append('Name', request.name);
      formData.append('AddressLine1', request.addressLine1);
      formData.append('City', request.city);
      formData.append('ProvinceOrState', request.provinceOrState);
      formData.append('PostalCode', request.postalCode);
      formData.append('Country', request.country);
      formData.append('IsVeteran', request.isVeteran.toString());

      if (request.addressLine2) {
        formData.append('AddressLine2', request.addressLine2);
      }
      if (request.avatarFile) {
        formData.append('Avatar', request.avatarFile);
      }

      await api.put(`/circle/recipients/${request.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      onSuccess?.();
    },
    onError,
  });
}

export function useCreateCircleMutation(
  onSuccess?: (data: CircleDTO) => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<CircleDTO, AxiosError, CreateCircleRequest>({
    mutationFn: async (request) => {
      const formData = new FormData();
      formData.append('Title', request.title);
      formData.append('Image', request.imageFile);

      const response = await api.post('/circle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess,
    onError,
  });
}

export function useJoinCircleMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, JoinCircleRequest>({
    mutationFn: async (request) => {
      await api.post('/circles/join', request);
    },
    onSuccess,
    onError,
  });
}

export function useLeaveCircleMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError>({
    mutationFn: async () => {
      await api.post('/circle/leave');
    },
    onSuccess,
    onError,
  });
}

export function useReportPostMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, IdRequest>({
    mutationFn: async (request) => {
      await api.post(`/posts/${request.Id}/report`);
    },
    onSuccess,
    onError,
  });
}

export function useBlockUserMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, IdRequest>({
    mutationFn: async (request) => {
      await api.post(`/users/${request.Id}/block`);
    },
    onSuccess,
    onError,
  });
}

export function useUnblockUserMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<void, AxiosError, IdRequest>({
    mutationFn: async (request) => {
      await api.delete(`/users/${request.Id}/block`);
    },
    onSuccess,
    onError,
  });
}

export function useExchangeGoogleTokenMutation(
  onSuccess?: (response: LoginResponse) => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<LoginResponse, AxiosError, TokenRequest>({
    mutationFn: async (request) => {
      const response = await api.post<LoginResponse>(
        '/auth/google/token',
        request,
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
}

export function useExchangeAppleTokenMutation(
  onSuccess?: (response: LoginResponse) => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation<LoginResponse, AxiosError, TokenRequest>({
    mutationFn: async (request) => {
      const response = await api.post<LoginResponse>(
        '/auth/apple/token',
        request,
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
}

export function useAddRecipientMutation(
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, RecipientRequest>({
    mutationKey: ['AddRecipient'],
    mutationFn: async (request) => {
      const formData = new FormData();

      if (request.avatarFile) {
        formData.append('Avatar', request.avatarFile);
      }

      formData.append('Name', request.name);

      if (request.addressLine2) {
        formData.append('AddressLine2', request.addressLine2);
      }

      formData.append('AddressLine1', request.addressLine1);
      formData.append('City', request.city);
      formData.append('ProvinceOrState', request.provinceOrState);
      formData.append('PostalCode', request.postalCode);
      formData.append('Country', request.country);
      formData.append('IsVeteran', request.isVeteran.toString());

      await api.post('/circle/recipients', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      onSuccess?.();
    },
    onError,
  });
}

export function useSetupIntentMutation(
  onSuccess?: (data: { clientSecret: string }) => void,
  onError?: (error: AxiosError) => void,
) {
  const api = useAPI();
  return useMutation({
    mutationFn: async (method: 'post' | 'patch') => {
      const response = await api[method]('/payment-method');
      return response.data;
    },
    onSuccess,
    onError,
  });
}
