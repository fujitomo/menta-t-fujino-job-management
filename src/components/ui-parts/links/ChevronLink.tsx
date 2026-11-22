import Link from 'next/link';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';
import { ChevronRightIcon } from '../icons';

// inline-flexは親要素内の要素と横並びにするためのもの　※親要素にflex指定が必要
const chevronLinkStyles = tv({
  base: 'text-primary inline-flex items-center',
  variants: {
    fontSize: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    fontSize: 'base',
  },
});

export interface ChevronLinkProps
  extends VariantProps<typeof chevronLinkStyles> {
  href: string;
  className?: string;
  iconClassName?: string;
  children: ReactNode;
}

export const ChevronLink = ({
  href,
  fontSize,
  className,
  iconClassName,
  children,
}: ChevronLinkProps) => (
  <Link
    href={href}
    className={twMerge(chevronLinkStyles({ fontSize }), className)}
  >
    {children}
    <ChevronRightIcon className={twMerge(iconClassName)} />
  </Link>
);
