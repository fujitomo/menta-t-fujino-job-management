'use client';

import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BasicContainerProps {
  className?: string;
}

export const BasicContainer = ({
  children,
  className = '',
}: PropsWithChildren<BasicContainerProps>) => {
  const customClassName = twMerge('max-w-pj w-full mx-auto px-9', className);

  return <div className={customClassName}>{children}</div>;
};
