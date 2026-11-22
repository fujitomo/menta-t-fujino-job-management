'use client';

import { type CSSProperties } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export type ToastType = 'success' | 'error';

const customToastStyles: CSSProperties = {
  maxWidth: '360px',
  borderRadius: '12px',
};
const customToastContainerStyles: CSSProperties = {
  top: '88px',
  zIndex: '100',
  maxWidth: '1120px',
  margin: '0 auto',
};

export interface BasicToastProps {
  duration?: number;
  toastStyles?: CSSProperties;
  toastContainerStyles?: CSSProperties;
}

export const BasicToast = ({
  duration = 3500,
  toastStyles,
  toastContainerStyles,
}: BasicToastProps) => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration,
        style: {
          ...customToastStyles,
          ...toastStyles,
        },
      }}
      containerStyle={{
        ...customToastContainerStyles,
        ...toastContainerStyles,
      }}
    />
  );
};

export const triggerToast = (message: string, type: ToastType = 'success') => {
  switch (type) {
    case 'success':
      toast.success(message);

      break;

    case 'error':
      toast.error(message);

      break;
  }
};
