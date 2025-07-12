// src/app/layout.tsx
import type { Metadata } from "next";
import { Fira_Code, Orbitron } from "next/font/google";
import "./globals.css";

// Configurations
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-fira-code', 
});


const orbitron = Orbitron({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-orbitron', 
});

export const metadata: Metadata = {
  title: "Ho Kei Ching | Software Engineer Portfolio",
  description: "Portfolio of Ho Kei Ching, a Software Engineer and Business Development Intern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${firaCode.variable} ${orbitron.variable} font-sans`}>{children}</body>
    </html>
  );
}