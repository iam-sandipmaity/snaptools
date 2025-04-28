import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
};

const SiteNav = () => {
  return (
    <nav className="flex items-center space-x-6">
      <NavLink href="/tools">Tools</NavLink>
      <NavLink href="/documentation">Documentation</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/donate">Donate</NavLink>
    </nav>
  );
};

export default SiteNav;