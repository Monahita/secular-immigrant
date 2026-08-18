import type { Viewport } from "next";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

const site = getSiteSettings();

export const viewport: Viewport = {
  themeColor: "#F4A261",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://farsi.autonomy-secular.site"),

  title: "مهاجر سکولار",
  description: "مجله شخصی درباره آزادی، حقوق بشر و سکولاریسم",

  keywords: [
    "سکولاریسم",
    "حقوق زنان",
    "حجاب اجباری",
    "اسلام‌گرایی",
    "حقوق بشر",
    "آزادی",
    "مهاجرت",
    "ایران",
  ],

  authors: [{ name: site.siteName || "مهاجر سکولار" }],

  creator: site.siteName || "مهاجر سکولار",
  publisher: site.siteName || "مهاجر سکولار",

  openGraph: {
    title: site.siteName || "مهاجر سکولار",
    description:
      site.tagline ||
      "یادداشت‌ها و مقاله‌هایی درباره آزادی، سکولاریسم، حقوق زنان، حقوق بشر و مهاجرت.",
    url: "https://farsi.autonomy-secular.site",
    siteName: site.siteName || "مهاجر سکولار",
    locale: "fa_IR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: site.siteName || "مهاجر سکولار",
    description:
      site.tagline ||
      "یادداشت‌ها و مقاله‌هایی درباره آزادی، سکولاریسم، حقوق زنان و مهاجرت.",
  },

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
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}