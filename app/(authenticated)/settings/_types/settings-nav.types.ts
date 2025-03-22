export interface NavItem {
  title: string;
  href: string;
  value: string;
}

export interface SettingsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  onSelect?: () => void;
}
