import Image from 'next/image';

export const HeaderLogo = () => {
  return (
    <Image
      src="/svg/header-logo.svg"
      alt="Next TS Job Management お仕事管理アプリ"
      width={248}
      height={48}
      priority
    />
  );
};
