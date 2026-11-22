import { twMerge } from 'tailwind-merge';
import { BasicTag, StarIcon } from '@/components/ui-parts';

export interface NewTagProps {
  className?: string;
}

/** 新着を示す「NEW」タグ。 */
export const NewTag = ({ className }: NewTagProps) => (
  <BasicTag
    variant="yellow"
    rounded="base"
    className={twMerge('gap-x-1 px-2 text-xs', className)}
  >
    <StarIcon size="sm" />
    NEW
  </BasicTag>
);
