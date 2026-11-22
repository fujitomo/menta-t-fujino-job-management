'use client';

import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type As = 'h1' | 'h2';
type FontSize = 'lg' | 'xl' | '1.5xl' | '2xl' | '3xl' | '4xl';

export interface BasicTitleProps {
  as?: As;
  fontSize?: FontSize;
  className?: string;
}

const basicTitleStyles = tv({
  base: 'font-bold',
  variants: {
    fontSize: {
      lg: 'text-lg',
      xl: 'text-xl',
      '1.5xl': 'text-1.5xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
  },
  defaultVariants: {
    fontSize: '4xl',
  },
});

export const BasicTitle = ({
  as: Tag = 'h1',
  fontSize,
  className = '',
  children,
  ...props
}: PropsWithChildren<BasicTitleProps>) => (
  <Tag
    className={twMerge(basicTitleStyles({ fontSize }), className)}
    {...props}
  >
    {children}
  </Tag>
);
