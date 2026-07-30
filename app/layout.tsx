import type { Metadata } from "next";
import Image from "next/image";
import {
  Navbar,
  type NavItem,
} from "@fynd-design-engineering/fynd-one-ds";
import "@fynd-design-engineering/fynd-one-ds/styles/tokens.css";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const navigation: NavItem[] = [
  {
    label: "Cookbook home",
    href: "/cookbooks/ERP/Forge",
  },
  {
    label: "Download PDF",
    href: "/api/cookbooks/forge/download",
  },
  {
    label: "Fynd.com",
    href: "https://www.fynd.com",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Forge MES Product Cookbook",
    template: "%s | Forge MES Product Cookbook",
  },
  description:
    "A visual, beginner-friendly guide to setting up Forge MES, launching production, and tracing finished units.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar
          logo={
            <Image
              src="/brand/fynd-horizontal-dark.svg"
              alt="Fynd"
              width={134}
              height={48}
              priority
            />
          }
          logoHref="/cookbooks/ERP/Forge"
          navItems={navigation}
          alwaysSolidBg
        />
        {children}
      </body>
    </html>
  );
}
