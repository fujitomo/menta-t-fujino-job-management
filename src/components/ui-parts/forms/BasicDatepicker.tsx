'use client';

import { type InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';
import { CalendarIcon, CloseIcon } from '../icons';

const basicDatepickerStyles = tv({
  slots: {
    // pr-11 は、右のアイコンと日付の文字が重ならないようにする余白。
    // ::-webkit-calendar-picker-indicator はブラウザ標準のカレンダーアイコン。
    // 透明にして入力欄いっぱいに広げ、どこを押しても日付選択が開くようにする。
    // 文字色は入力の有無で付け替えるので、ここには置かない。
    input:
      'border-pj-gray-600 bg-pj-white focus:border-pj-black relative h-12 w-full rounded-xl border pl-4 pr-11 outline-none focus:border-2 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:size-auto [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0',
    // <input type="date"> は標準の placeholder 属性が効かないため、未入力のあいだだけ上に重ねる。
    // クリックが下のカレンダーに届くよう、pointer-events-none にする。
    placeholder:
      'text-pj-gray-600 pointer-events-none absolute inset-y-0 left-4 right-11 flex items-center',
  },
  variants: {
    fontSize: {
      base: { input: 'text-base', placeholder: 'text-base' },
      lg: { input: 'text-lg', placeholder: 'text-lg' },
      sm: { input: 'text-sm', placeholder: 'text-sm' },
    },
  },
  defaultVariants: {
    fontSize: 'base',
  },
});

/** 右端のアイコンの位置と色。カレンダーと×で同じ場所に出す。 */
const ICON_AREA_CLASS =
  'text-pj-gray-800 absolute inset-y-0 right-0 flex items-center px-3';

// type は date 専用なので、渡せる props から外す。
// 入力の有無で見た目を切り替えるため、value は必ず受け取る（defaultValue は使わない）。
export interface BasicDatepickerProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'type' | 'value' | 'defaultValue'
    >,
    VariantProps<typeof basicDatepickerStyles> {
  /** 選択中の日付（YYYY-MM-DD）。未入力は空文字。 */
  value: string;
  /** ×ボタンを押したときの処理。呼び出し側で value を空文字に戻す。 */
  onClear: () => void;
  /** 幅などの指定。入力欄とアイコンを囲む外側の要素に付く。 */
  className?: string;
}

/**
 * このプロジェクトの見た目をそろえた日付の入力欄。
 * ブラウザ標準の日付選択（<input type="date">）を使う。値は YYYY-MM-DD 形式の文字列。
 * 未入力のあいだは placeholder とカレンダーアイコンを出し、入力後は日付と×ボタンに切り替える。
 * ref / min / max / onChange など、<input> の props はそのまま渡せる。
 */
export const BasicDatepicker = forwardRef<
  HTMLInputElement,
  BasicDatepickerProps
>(
  (
    { className, fontSize, value, onClear, placeholder, disabled, ...props },
    ref,
  ) => {
    const hasValue = value !== '';
    const showPlaceholder = !hasValue && Boolean(placeholder);
    const styles = basicDatepickerStyles({ fontSize });

    const { onChange, onBlur, ...inputProps } = props;

    return (
      <div className={twMerge('relative w-full', className)}>
        <input
          ref={ref}
          type="date"
          value={value}
          disabled={disabled}
          className={twMerge(
            styles.input(),
            // placeholder を出すあいだは標準の「年/月/日」を隠す
            hasValue
              ? 'text-pj-black'
              : showPlaceholder
                ? 'text-transparent [&::-webkit-datetime-edit]:invisible'
                : 'text-pj-gray-600',
          )}
          {...inputProps}
          onBlur={onBlur}
          onChange={onChange}
        />

        {showPlaceholder && (
          <span aria-hidden="true" className={styles.placeholder()}>
            {placeholder}
          </span>
        )}

        {hasValue && !disabled ? (
          <button
            type="button"
            aria-label="日付をクリア"
            onClick={onClear}
            className={ICON_AREA_CLASS}
          >
            <CloseIcon />
          </button>
        ) : (
          // 下にある透明な標準アイコンを押せるよう、クリックを素通りさせる
          <span className={twMerge(ICON_AREA_CLASS, 'pointer-events-none')}>
            <CalendarIcon />
          </span>
        )}
      </div>
    );
  },
);

BasicDatepicker.displayName = 'BasicDatepicker';
