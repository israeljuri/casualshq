import { NavItem } from '../types';

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    name: 'Dashboard',
    iconAlt: '/admin-sidebar/SquaresFour-alt.svg',
    icon: '/admin-sidebar/SquaresFour.svg',
    href: '/',
  },
  {
    name: 'Staff',
    iconAlt: '/admin-sidebar/Users-alt.svg',
    icon: '/admin-sidebar/Users.svg',
    href: '/staff',
  },
  {
    name: 'Teams',
    iconAlt: '/admin-sidebar/FolderOpen-alt.svg',
    icon: '/admin-sidebar/FolderOpen.svg',
    href: '/teams',
  },
  {
    name: 'Time',
    iconAlt: '/admin-sidebar/Alarm-alt.svg',
    icon: '/admin-sidebar/Alarm.svg',
    href: '/time',
  },
  {
    name: 'Payments',
    iconAlt: '/admin-sidebar/CurrencyCircleDollar-alt.svg',
    icon: '/admin-sidebar/CurrencyCircleDollar.svg',
    href: '/payments',
  },
  {
    name: 'Settings',
    iconAlt: '/admin-sidebar/Gear-alt.svg',
    icon: '/admin-sidebar/Gear.svg',
    href: '/settings',
  },
];
