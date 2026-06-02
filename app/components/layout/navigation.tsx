import { SOCIAL_LINKS } from "@/lib/config";

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
    label: "CV",
    href: "/cv",
  },
  {
    label: "GitHub",
    href: SOCIAL_LINKS.GITHUB,
  },
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.LINKEDIN,
  },
] as const satisfies NavItem[];
