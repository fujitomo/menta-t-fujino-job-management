'use client';

import {
  type ChangeEvent,
  type FocusEvent,
  type SelectHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const basicSelectStyles = tv({
  // 矢印は select 標準のものを消し、同じ見た目の SVG を背景で出す。
  // pr-10 は、右の矢印と文字が重ならないようにする余白。
  // 一覧は黒。value が空の先頭選択肢だけグレー。
  // outline-none はブラウザ標準のフォーカス枠を消す。外枠色は className 側で付ける。
  // 文字色と外枠色は状態で付け替えるので、ここには置かない。
  base: "bg-pj-white [&>option]:text-pj-black [&>option[value='']]:text-pj-gray-600 h-12 w-full appearance-none rounded-xl border bg-[url('/svg/chevron_down.svg')] bg-[length:1.25rem] bg-[position:right_1rem_center] bg-no-repeat px-4 pr-10 outline-none",
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

// multiple は単一選択専用なので、渡せる props から外す。
export interface BasicSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple'>,
    VariantProps<typeof basicSelectStyles> {
  className?: string;
}

/**
 * value / defaultValue が未指定か空文字なら、未選択とみなす。
 * props や state を使わない判定なので、再レンダーのたびに作り直さないようコンポーネントの外に置く。
 */
const isEmptyValue = (
  current: SelectHTMLAttributes<HTMLSelectElement>['value'],
) => current === undefined || current === '';

/**
 * このプロジェクトの見た目をそろえた単一選択の <select>。
 * <option> を子要素として渡す。未指定は <option value=""> で書く（一覧から再選択可能）。
 * 未指定を一覧に出したくないときは、<option value="" hidden> にする。
 * 未指定のあいだだけ文字色をグレーにする。フォーカス中は外枠を primary-600 の 2px にする。
 * ref / defaultValue / onChange など、<select> の props はそのまま渡せる。
 */
export const BasicSelect = forwardRef<HTMLSelectElement, BasicSelectProps>(
  (
    {
      fontSize,
      className,
      children,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    // 未選択かどうか（文字色用）。初期は value / defaultValue が空なら true。
    const [isUnselected, setIsUnselected] = useState(() =>
      isEmptyValue(value ?? defaultValue),
    );
    // 外枠を色変更するのはフォーカス中だけ
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setIsUnselected(event.currentTarget.value === ''); // 未選択かどうかを更新する
      onChange?.(event); // 呼び出し側のonChangeも実行する
    };

    const handleFocus = (event: FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true); // 外枠を青にする
      onFocus?.(event); // 呼び出し側のonFocusも実行する
    };

    const handleBlur = (event: FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false); // 外枠をグレーにする
      onBlur?.(event); // 呼び出し側のonBlurも実行する
    };

    // 未選択(valueが空文字)かどうかを判定する
    const empty = value !== undefined ? isEmptyValue(value) : isUnselected;

    return (
      <select
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={twMerge(
          basicSelectStyles({ fontSize }),
          // 未選択(valueが空文字)だけグレー。色クラスは1つだけ付ける（両方残すと独自色が打ち消されない）。
          empty ? 'text-pj-gray-600' : 'text-pj-black',
          isFocused
            ? 'border-primary-600 border-2'
            : 'border-pj-gray-600 border',
          className,
        )}
        {...props}
        // props より後に置く。先だと呼び出し側の同名ハンドラで上書きされる。
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </select>
    );
  },
);

BasicSelect.displayName = 'BasicSelect';
