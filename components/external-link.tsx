import { cn } from "@/lib/utils";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!href) {
    throw new Error("href is required for ExternalLink component");
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-primary/60 font-medium",
        className
      )}
    >
      {children}
    </a>
  );
}
