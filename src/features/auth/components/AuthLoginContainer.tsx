'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useId } from 'react';
import {
  BasicButton,
  BasicTextField,
  BasicTitle,
  FormSection,
} from '@/components/ui-parts';
import { Links } from '@/constants';

export const AuthLoginContainer = () => {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    // preventDefault() がないと、router.push が効かない
    event.preventDefault();
    router.push(Links.MEMBER_JOB_LIST);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-pj-white py-30 w-150 h-168 px-30 mx-auto flex flex-col">
        <BasicTitle className="text-primary" fontSize="2xl">
          ログイン
        </BasicTitle>
        <form className="flex flex-col" onSubmit={handleLoginSubmit}>
          <div className="mt-10 space-y-8">
            {/* TODO: バリデーションチェック実装時にerrors.email?.message を errorMessage に渡す */}
            <FormSection
              label="メールアドレス"
              htmlFor={emailId}
              render={(ariaProps) => (
                <BasicTextField
                  id={emailId}
                  type="email"
                  placeholder="メールアドレスを入力してください。"
                  // アクセシビリティ属性(音声読み上げ用)を渡す
                  {...ariaProps}
                />
              )}
            />

            {/* TODO: バリデーションチェック実装時にerrors.password?.message を errorMessage に渡す */}
            <FormSection
              label="パスワード"
              htmlFor={passwordId}
              render={(ariaProps) => (
                <BasicTextField
                  id={passwordId}
                  type="password"
                  placeholder="パスワードを入力してください。"
                  // アクセシビリティ属性(音声読み上げ用)を渡す
                  {...ariaProps}
                />
              )}
            />
          </div>

          <BasicButton type="submit" paddingX={9} className="mt-12">
            ログイン
          </BasicButton>
        </form>
      </div>
    </div>
  );
};
