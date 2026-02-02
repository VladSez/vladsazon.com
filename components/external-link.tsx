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
        "text-blue-700 hover:text-blue-500 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-blue-500 font-medium",
        className
      )}
    >
      {children}
    </a>
  );
}
