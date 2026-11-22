'use client';

import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const basicTextAreaStyles = tv({
  // 高さは h-36 で固定する。入力が収まらないときは textarea の中でスクロールする。
  // resize-none は、右下のつまみで大きさを変えられないようにする。
  base: 'border-pj-gray-600 placeholder-pj-gray-600 bg-pj-white focus:border-pj-black h-36 w-full resize-none rounded-xl border p-4 outline-none focus:border-2',
  variants: {
    fontSize: {
      base: 'text-base',
      lg: 'text-lg',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    fontSize: 'base',
  },
});

export interface BasicTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof basicTextAreaStyles> {
  className?: string;
}

/**
 * このプロジェクトの見た目をそろえた複数行の入力欄。
 * ref / placeholder / onChange など、<textarea> の props はそのまま渡せる。
 */
export const BasicTextArea = forwardRef<
  HTMLTextAreaElement,
  BasicTextAreaProps
>(({ className, fontSize, ...props }, ref) => (
  <textarea
    ref={ref}
    className={twMerge(basicTextAreaStyles({ fontSize }), className)}
    {...props}
  />
));

BasicTextArea.displayName = 'BasicTextArea';
