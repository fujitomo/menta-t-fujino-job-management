import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { BasicIcon, ChevronRightIcon } from '@/components/ui-parts';
import { type SideMenuIconSrc } from './types/sideMenuIconType';

interface SideMenuItemProps {
  name: string;
  href: string;
  icon: SideMenuIconSrc;
  isActive?: boolean;
}

export const SideMenuItem = ({
  name,
  href,
  icon,
  isActive = false,
}: SideMenuItemProps) => (
  <Link
    href={href}
    className={twMerge(
      'flex items-center justify-between px-3 py-2 rounded-full',
      isActive && 'bg-primary-600 text-primary font-bold',
    )}
  >
    <span className="flex items-center gap-x-3">
      <BasicIcon src={icon} />
      <span>{name}</span>
    </span>
    <ChevronRightIcon />
  </Link>
);
