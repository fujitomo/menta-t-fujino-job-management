import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const basicTagStyles = tv({
  base: 'inline-flex items-center border px-3 py-2 text-sm !leading-none',
  variants: {
    variant: {
      primary: 'border-primary text-primary bg-primary-100', // 都道府県（#EEF8FF）
      category: 'border-pj-gray-600 text-pj-black bg-pj-white', // カテゴリー
      yellow: 'bg-pj-yellow-100 text-pj-yellow border-transparent font-bold', // NEW
    },
    rounded: {
      base: 'rounded', // NEW。角は少しだけ丸い
      full: 'rounded-full', // 都道府県・カテゴリー
    },
  },
  defaultVariants: {
    variant: 'category',
    rounded: 'full',
  },
});

export interface BasicTagProps extends VariantProps<typeof basicTagStyles> {
  className?: string;
}

/** 都道府県、カテゴリー、NEW などの短いラベルを表示するタグ。 */
export const BasicTag = ({
  variant,
  rounded,
  className,
  children,
}: PropsWithChildren<BasicTagProps>) => (
  <span className={twMerge(basicTagStyles({ variant, rounded }), className)}>
    {children}
  </span>
);
