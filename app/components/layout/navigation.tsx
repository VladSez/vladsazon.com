export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS = [
  {
    label: "About",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  // TODO: add later
  // {
  //   label: "Blog",
  //   href: "/blog/easyinvoicepdf",
  // },
  {
    label: "Photography",
    href: "/photos",
  },
  {
    label: "CV",
    href: "/cv",
  },
] as const satisfies NavItem[];
