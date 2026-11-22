'use client';

import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

/** errorMessage がある場合に、入力要素へそのまま渡す aria 属性 */
export interface FormSectionAriaProps {
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

export interface FormSectionProps {
  label: string;
  htmlFor?: string;
  errorMessage?: string;
  className?: string;
  /**
   * aria 属性を受け取り、入力要素を返す render prop。
   * errorMessage 発生時の aria-describedby / aria-invalid を呼び出し側で設定する。
   * @see https://zenn.dev/hrtr/articles/35520543e24531
   */
  render: (ariaProps: FormSectionAriaProps) => ReactNode;
}

/**
 * 項目名 + フォーム要素のセクション。
 * render prop で入力要素を受け取り、aria 属性を呼び出し側の要素に直接渡す。
 */
export const FormSection = ({
  label,
  htmlFor,
  errorMessage,
  className,
  render,
}: FormSectionProps) => {
  // スクリーンリーダーの読み上げ用
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  const ariaProps: FormSectionAriaProps =
    errorMessage && errorId
      ? { 'aria-describedby': errorId, 'aria-invalid': true }
      : {};

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      {render(ariaProps)}
      {errorMessage && (
        <p id={errorId} className="text-pj-red text-base" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
