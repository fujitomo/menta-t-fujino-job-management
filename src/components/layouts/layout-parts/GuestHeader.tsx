import { BasicContainer } from '@/components/ui-parts';
import { HeaderLogo } from './HeaderLogo';

export const GuestHeader = () => {
  return (
    <header className="h-18 border-pj-gray-600 bg-pj-white fixed top-0 z-50 w-full border-b py-3">
      <BasicContainer>
        <HeaderLogo />
      </BasicContainer>
    </header>
  );
};
