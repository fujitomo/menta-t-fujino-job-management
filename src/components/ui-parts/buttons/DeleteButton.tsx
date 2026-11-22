'use client';

import { type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { DeleteIcon } from '../icons';
import { BasicButton } from './BasicButton';

export interface DeleteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
}

/** ごみ箱アイコン付きの削除ボタン。 */
export const DeleteButton = ({
  className,
  label = '削除する',
  ...props
}: DeleteButtonProps) => (
  <BasicButton
    variant="text"
    paddingX={0}
    paddingY={0}
    fontSize="base"
    className={twMerge('shrink-0', className)}
    {...props}
  >
    <DeleteIcon size="md" />
    {label}
  </BasicButton>
);
