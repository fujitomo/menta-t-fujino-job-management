import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BasicDescriptionListProps {
  className?: string;
}

/** 項目名（dt）と内容（dd）の組を縦に並べる定義リスト。 */
export const BasicDescriptionList = ({
  className,
  children,
}: PropsWithChildren<BasicDescriptionListProps>) => (
  <dl className={twMerge('grid grid-cols-5 gap-y-6', className)}>{children}</dl>
);
