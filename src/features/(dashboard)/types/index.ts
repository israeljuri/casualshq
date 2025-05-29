export type NavItem = {
  name: string;
  iconAlt: string;
  icon: string;
  href: string;
  isAdmin?: boolean;
};

// Dashboard - Filters Type
export interface Filters {
  teams: Record<string, boolean>;
  roles: Record<string, boolean>;
}
