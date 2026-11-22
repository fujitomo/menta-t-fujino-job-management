import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BasicDescriptionListItemProps {
  term: string;
  className?: string;
}

/** BasicDescriptionList 内に置く 1 行分の項目。 */
export const BasicDescriptionListItem = ({
  term,
  className,
  children,
}: PropsWithChildren<BasicDescriptionListItemProps>) => (
  <>
    <dt className="col-span-1 whitespace-pre-wrap">
      <p className="font-bold">{term}</p>
    </dt>
    <dd className={twMerge('col-span-4 whitespace-pre-wrap', className)}>
      {children}
    </dd>
  </>
);
