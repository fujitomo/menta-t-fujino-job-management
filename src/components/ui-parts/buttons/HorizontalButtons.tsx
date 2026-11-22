import { type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { BasicButton } from './BasicButton';

export interface HorizontalButtonsProps {
  leftLabel: string;
  leftHref?: string;
  rightLabel: string;
  rightHref?: string;
  onRightClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  rightType?: 'button' | 'submit';
  rightDisabled?: boolean;
  className?: string;
}

/** 2つのボタンを横並びで表示する。 */
export const HorizontalButtons = ({
  leftLabel,
  leftHref,
  rightLabel,
  rightHref,
  onRightClick,
  rightType = 'button',
  rightDisabled,
  className,
}: HorizontalButtonsProps) => (
  <div className={twMerge('mt-10 flex justify-center gap-x-6', className)}>
    <BasicButton href={leftHref} variant="secondary">
      {leftLabel}
    </BasicButton>

    {/* href あり → リンク、なし → button（submit など） */}
    <BasicButton
      href={rightHref}
      type={rightType}
      onClick={onRightClick}
      disabled={rightDisabled}
    >
      {rightLabel}
    </BasicButton>
  </div>
);
