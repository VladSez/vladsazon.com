import { SOCIAL_LINKS } from "@/lib/config";

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
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
  {
    label: "GitHub",
    href: SOCIAL_LINKS.GITHUB,
    isExternal: true,
  },
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.LINKEDIN,
    isExternal: true,
  },
] as const satisfies NavItem[];
