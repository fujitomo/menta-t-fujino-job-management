import { type PropsWithChildren } from 'react';
import { BasicTitle, type BasicTitleProps } from './BasicTitle';
export interface TitleWithCountProps extends BasicTitleProps {
  count: number;
}

/** タイトルと件数を横並びで表示する。 */
export const TitleWithCount = ({
  count,
  ...basicTitleProps
}: PropsWithChildren<TitleWithCountProps>) => {
  return (
    <div className="flex items-baseline gap-x-6">
      <BasicTitle {...basicTitleProps} />
      <span className="inline-flex items-end gap-x-2">
        <span className="text-primary text-5xl font-bold leading-none">
          {count}
        </span>
        <span>件</span>
      </span>
    </div>
  );
};
