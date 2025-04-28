import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink extends NavItem {
  icon: LucideIcon;
}

export const quickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "#tools" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore Tools", href: "#tools" },
  { label: "Features", href: "#features" },
  { label: "Newsletter", href: "#newsletter" },
];