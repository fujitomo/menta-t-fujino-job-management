'use client';

import Link from 'next/link';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const basicButtonStyles = tv({
  base: 'self-center rounded-full font-bold !leading-none',
  variants: {
    variant: {
      primary: 'bg-primary text-pj-white',
      secondary: 'text-primary bg-pj-white border-primary border', // もどるボタン
      grayOutline: 'border-pj-gray-800 text-pj-black bg-pj-white border', // ログアウトボタン
      text: 'text-pj-gray-800 inline-flex items-center gap-x-2 font-normal',
    },
    paddingX: {
      0: 'px-0',
      9: 'px-9',
      15: 'px-15',
    },
    paddingY: {
      0: 'py-0',
      3: 'py-3',
      4: 'py-4',
      5.25: 'py-5.25',
      6: 'py-6',
    },
    fontSize: {
      base: 'text-base',
      lg: 'text-lg',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    paddingX: 9,
    paddingY: 5.25,
    fontSize: 'lg',
  },
});

export interface BasicButtonProps
  extends VariantProps<typeof basicButtonStyles>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string; // 指定するとボタンではなくリンクとして描画する
  children?: ReactNode;
}

export const BasicButton = ({
  variant,
  paddingX,
  paddingY,
  fontSize,
  className,
  href,
  type = 'button',
  children,
  ...props
}: BasicButtonProps) => {
  const styles = twMerge(
    basicButtonStyles({ variant, paddingX, paddingY, fontSize }),
    className,
  );

  return href ? (
    <Link href={href} className={styles}>
      {children}
    </Link>
  ) : (
    <button type={type} className={styles} {...props}>
      {children}
    </button>
  );
};
