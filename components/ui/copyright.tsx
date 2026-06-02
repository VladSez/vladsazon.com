"use client";

/**
 * Copyright component displays the current year and the name "Vlad Sazonau".
 * Used as a site footer or copyright notice element.
 */
export function Copyright() {
  return <div>© {new Date().getFullYear()} Vlad Sazonau</div>;
}
