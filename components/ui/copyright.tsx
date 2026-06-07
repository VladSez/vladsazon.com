"use client";

/**
 * Copyright component displays the current year and the name "Vlad Sazonau".
 * Used as a site footer or copyright notice element.
 */
export function Copyright() {
  return (
    <span className="text-xs text-muted-foreground">
      © {new Date().getFullYear()} Vlad Sazonau
    </span>
  );
}
