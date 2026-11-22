import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AnimationUtils } from '@/utils/animation';

export const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    AnimationUtils.scrollToTop();
  }, [pathname]);
};
