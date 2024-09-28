'use client';
import { useMenuList } from '@hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FooterMenu({ memberPicUrl }) {
  const pathname = usePathname();
  const MENU_ICONS = useMenuList();

  return (
    <div className="bg-floraOlive h-24 w-full fixed bottom-0 md:hidden flex justify-center">
      <ul className="flex flex-row w-full items-center justify-around">
        {MENU_ICONS.map(({ component: IconComponent, path }) => (
          <li key={path}>
            <Link aria-label={path} href={path}>
              <IconComponent
                className={`w-9 h-9 text-floraGreen hover:text-floraYellow ${pathname === path ? 'text-floraWhite' : 'text-floraGreen'}`}
              />
            </Link>
          </li>
        ))}
        <li className="w-11 h-11 rounded-full bg-floraWhite text-center flex items-center justify-center">
          <img src={memberPicUrl} className="w-full h-full object-cover" />
        </li>
      </ul>
    </div>
  );
}
