// src/app/layout.tsx

import type { Metadata } from "next";
// A great monospaced font for the cyberpunk aesthetic
import { Fira_Code } from "next/font/google";
import "./globals.css";

// Configure the font
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ho Kei Ching | Software Engineer Portfolio",
  description: "Portfolio of Ho Kei Ching, AI/ML enthusiast and Software Engineer with a focus on modern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add className="dark" to the <html> tag to enable dark mode by default
    <html lang="en" className="dark">
      <body className={firaCode.className}>{children}</body>
    </html>
  );
}