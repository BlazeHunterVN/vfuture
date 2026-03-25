import type { Metadata } from "next";
import { Saira_Semi_Condensed } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site";
import { AppProviders } from "@/components/providers/app-providers";

const heading = Saira_Semi_Condensed({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Saira_Semi_Condensed({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "VFuture",
    "Free Fire fan made",
    "lịch sự kiện Free Fire",
    "tin tức Free Fire",
    "cộng đồng game",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
  verification: {
    google: "vKpEfaaix3tyf3KNuLOD4z3LE4K1_5RnaU_lwqDOD9U",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faviconUrl = siteConfig.favicon;
  return (
    <html lang="vi" suppressHydrationWarning className={cn(heading.variable, body.variable)}>
      {/* Manually declared link tags for favicon to bypass caching or next-metadata bugs */}
      <link rel="icon" href={faviconUrl} sizes="any" />
      <link rel="apple-touch-icon" href={faviconUrl} />
      <link rel="shortcut icon" href={faviconUrl} />
      <body className={cn("font-body min-h-screen bg-background text-foreground antialiased")}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
