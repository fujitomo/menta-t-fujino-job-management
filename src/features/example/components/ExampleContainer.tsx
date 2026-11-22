'use client';

import { ExamplePrefectureCard } from './ExamplePrefectureCard';

/**
 * サンプルコンテナコンポーネント
 * 1ページにつき1コンテナコンポーネントを作成する。
 */
export const ExampleContainer = () => {
  /** 都道府県データ */
  const prefecture = {
    id: 1,
    name: '東京都',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-31',
  };

  /** 間違った都道府県データ */
  const _incorrectPrefecture = {
    id: 2,
    name: 100, // nameがnumber型になっている
    createdAt: '2026-02-01',
    // updatedAt: '2026-02-28', updatedAtが存在しない
  };

  return (
    <>
      <h1 className="text-4xl font-bold">サンプル</h1>

      <p className="mt-2">これはサンプルページです。</p>

      <ExamplePrefectureCard
        prefecture={prefecture} // Challenge: _incorrectPrefectureを流して型エラーを体験しよう！
        // Challenge: クラス名「mt-6」を流してみよう！
      />
    </>
  );
};

/************************/
/** TypeScriptのお勉強① **/
/************************/

/** String型 */
const text: string = 'テキスト';
console.log('**************************');
console.log('text:', text);
console.log('textの型:', typeof text);
console.log('**************************');

/** Number型 */
const price: number = 100;
console.log('**************************');
console.log('price:', price);
console.log('priceの型:', typeof price);
console.log('**************************');

/** Boolean型 */
const isLoggedIn: boolean = false;
console.log('**************************');
console.log('isLoggedIn:', isLoggedIn);
console.log('isLoggedInの型:', typeof isLoggedIn);
console.log('**************************');

/************************/
/** TypeScriptのお勉強② **/
/************************/

/** Object型: パターン1 */
const water = {
  name: '水',
  price: 100,
};
console.log('**************************');
console.log('water:', water);
console.log('waterの型:', typeof water);
console.log('**************************');

/** Object型: パターン2 */
const milk = {
  name: 'ミルク',
  price: 200,
};
console.log('**************************');
console.log('milk:', milk);
console.log('milkの型:', typeof milk);
console.log('**************************');

/** Array型 */
const drinks = [water, milk];
console.log('**************************');
console.log('drinks:', drinks);
console.log('drinksの型:', drinks.constructor.name);
console.log('**************************');
