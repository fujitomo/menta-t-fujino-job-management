'use client';

import { type MouseEvent, type PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

type PaddingX = 5 | 6 | 7 | 8 | 9;
type PaddingY = 5 | 6 | 7 | 8 | 9;
type BackgroundColor = 'primary' | 'white';
type Border = 'solid' | 'dashed' | 'none';
type BorderColor = 'primary' | 'primary-600' | 'pj-gray-600' | 'inherit';
type Rounded = 'lg' | 'xl';

const basicCardStyles = tv({
  base: '',
  variants: {
    paddingX: {
      5: 'px-5',
      6: 'px-6',
      7: 'px-7',
      8: 'px-8',
      9: 'px-9',
    },
    paddingY: {
      5: 'py-5',
      6: 'py-6',
      7: 'py-7',
      8: 'py-8',
      9: 'py-9',
    },
    backgroundColor: {
      white: 'bg-white',
      primary: 'bg-primary',
      ['primary-600']: 'bg-primary-600',
      ['primary-400']: 'bg-primary-400',
      ['primary-100']: 'bg-primary-100',
      transparent: 'bg-transparent',
    },
    border: {
      solid: 'border',
      dashed: 'border border-dashed',
      none: 'border-none',
    },
    borderColor: {
      primary: 'border-primary',
      ['primary-600']: 'border-primary-600',
      ['pj-gray-600']: 'border-pj-gray-600',
      inherit: 'border-inherit',
    },
    rounded: {
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  defaultVariants: {
    paddingX: 8,
    paddingY: 7,
    backgroundColor: 'white',
    border: 'none',
    borderColor: 'inherit',
    rounded: 'xl',
  },
});

export interface BasicCardProps {
  paddingX?: PaddingX;
  paddingY?: PaddingY;
  backgroundColor?: BackgroundColor;
  border?: Border;
  borderColor?: BorderColor;
  rounded?: Rounded;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement> | any) => any;
}

export const BasicCard = ({
  paddingX,
  paddingY,
  backgroundColor,
  border,
  borderColor,
  rounded,
  className = '',
  children,
  onClick = undefined,
}: PropsWithChildren<BasicCardProps>) => {
  const tvParams = {
    paddingX,
    paddingY,
    backgroundColor,
    border,
    borderColor,
    rounded,
  };

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={`${basicCardStyles(tvParams)} ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
