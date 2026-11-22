import Image from 'next/image';
import { Links } from '@/constants';
import { SideMenuItem } from './SideMenuItem';
import { SIDEMENU_ICONS } from './types/sideMenuIconType';
import { SIDE_MENU_LINK_IDS, type SideMenuLinkId } from './types/sideMenuType';

const SIDEMENU_ILLUSTRATION = '/svg/meeting.svg';

const SIDE_MENU_ITEMS = [
  {
    id: SIDE_MENU_LINK_IDS.jobList,
    name: 'お仕事一覧',
    href: Links.MEMBER_JOB_LIST,
    icon: SIDEMENU_ICONS.jobList,
  },
  {
    id: SIDE_MENU_LINK_IDS.jobCreate,
    name: 'お仕事登録',
    href: Links.MEMBER_JOB_CREATE,
    icon: SIDEMENU_ICONS.jobAdd,
  },
  {
    id: SIDE_MENU_LINK_IDS.jobCategoryList,
    name: 'カテゴリー一覧',
    href: Links.MEMBER_JOB_CATEGORY_LIST,
    icon: SIDEMENU_ICONS.categoryList,
  },
  {
    id: SIDE_MENU_LINK_IDS.jobCategoryCreate,
    name: 'カテゴリー登録',
    href: Links.MEMBER_JOB_CATEGORY_CREATE,
    icon: SIDEMENU_ICONS.categoryAdd,
  },
] as const;

interface SideMenuProps {
  activeLinkId?: SideMenuLinkId;
}

export const SideMenu = ({ activeLinkId }: SideMenuProps) => {
  return (
    <aside className="w-50 grid h-fit shrink-0 gap-y-4">
      <nav className="mt-2 flex flex-col gap-y-3">
        {SIDE_MENU_ITEMS.map((sideMenuItem) => (
          <SideMenuItem
            key={sideMenuItem.id}
            name={sideMenuItem.name}
            href={sideMenuItem.href}
            icon={sideMenuItem.icon}
            isActive={activeLinkId === sideMenuItem.id}
          />
        ))}
      </nav>

      <Image
        src={SIDEMENU_ILLUSTRATION}
        alt="仕事中のイラスト"
        width={144}
        height={136}
        loading="lazy"
        className="mx-auto mt-9"
      />
    </aside>
  );
};
