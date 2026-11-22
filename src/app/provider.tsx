'use client';

import { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ApiUtils } from '@/utils/api';

export default function Provider({ children }: PropsWithChildren) {
  const queryClient = ApiUtils.getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
