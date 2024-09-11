import CalendarIcon from '@components/icons/CalendarIcon';
import DashBoardIcon from '@components/icons/DashBoardIcon';
import FloraIcon from '@components/icons/FloraIcon';
import TimerIcon from '@components/icons/TimerIcon';
import { ROUTE_LISTS } from '@constants';

export default function useMenuList() {
  const MENU_ICONS = [
    { component: DashBoardIcon, path: ROUTE_LISTS.dashBoard },
    { component: CalendarIcon, path: ROUTE_LISTS.calendar },
    { component: TimerIcon, path: ROUTE_LISTS.timer },
    { component: FloraIcon, path: ROUTE_LISTS.flora },
  ];
  return MENU_ICONS;
}
