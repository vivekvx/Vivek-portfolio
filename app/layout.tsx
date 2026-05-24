import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vivek Sahu Portfolio",
  description: "Vivek Sahu's full-stack developer portfolio.",
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
