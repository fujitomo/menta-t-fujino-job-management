import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { type IconProps, type IconSrc } from './types/iconType';

const basicIconStyles = tv({
  base: 'icon-mask',
  variants: {
    size: {
      sm: 'h-3 w-3',
      base: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface BasicIconProps extends IconProps {
  src: IconSrc;
}

/** public/svg を mask に使い、親の文字色（currentColor）で表示する。 */
export const BasicIcon = ({ src, size, className }: BasicIconProps) => (
  <span
    className={twMerge(basicIconStyles({ size }), className)}
    style={{
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
    }}
    aria-hidden="true" // 隣のテキストで意味が伝わる装飾アイコンのため読み上げ対象外
  />
);
