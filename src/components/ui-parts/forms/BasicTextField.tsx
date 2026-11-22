'use client';

import { type InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const basicTextFieldStyles = tv({
  base: 'border-pj-gray-600 placeholder-pj-gray-600 bg-pj-white focus:border-pj-black h-12 rounded-xl border px-4 outline-none focus:border-2',
  variants: {
    width: {
      full: 'w-full',
    },
    fontSize: {
      base: 'text-base',
      lg: 'text-lg',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    width: 'full',
    height: 12,
    fontSize: 'base',
  },
});

export interface BasicTextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width' | 'height'>,
    VariantProps<typeof basicTextFieldStyles> {
  className?: string;
}

export const BasicTextField = forwardRef<HTMLInputElement, BasicTextFieldProps>(
  ({ className, type = 'text', width, fontSize, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={twMerge(basicTextFieldStyles({ width, fontSize }), className)}
      {...props}
    />
  ),
);

BasicTextField.displayName = 'BasicTextField';
