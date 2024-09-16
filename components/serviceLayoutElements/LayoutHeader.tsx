'use client';

import { ROUTE_LISTS } from '@constants';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LayoutHeader() {
  const pathname = usePathname();
  const [header, setHeader] = useState('');

  const getPageTitle = (path: string) => {
    switch (path) {
      case ROUTE_LISTS.dashBoard:
        return 'Dashboard';
      case ROUTE_LISTS.calendar:
        return 'Calendar';
      case ROUTE_LISTS.timer:
        return 'Timer';
      case ROUTE_LISTS.flora:
        return 'Flora';
      default:
        return 'Loading...';
    }
  };

  useEffect(() => {
    const newTitle = getPageTitle(pathname);
    setHeader(newTitle);
  }, [pathname]);

  return <>{header}</>;
}
