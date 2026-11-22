'use client';

import { useRouter } from 'next/navigation';
import { BasicButton, BasicContainer } from '@/components/ui-parts';
import { Links } from '@/constants';
import { HeaderLogo } from './HeaderLogo';

export const MemberHeader = () => {
  const router = useRouter();

  const handleLogoutClick = () => {
    // TODO: ログアウトAPI連携後に置き換え
    router.push(Links.GUEST_LOGIN);
  };

  return (
    <header className="h-18 border-pj-gray-600 bg-pj-white fixed top-0 z-50 w-full border-b py-3">
      <BasicContainer>
        <div className="flex items-center justify-between">
          <HeaderLogo />
          <BasicButton
            variant="grayOutline"
            paddingY={3}
            fontSize="base"
            onClick={handleLogoutClick}
          >
            ログアウト
          </BasicButton>
        </div>
      </BasicContainer>
    </header>
  );
};
