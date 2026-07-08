import type { Viewport } from "next";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});
export const viewport: Viewport = {
  themeColor: "#F4A261",
};
export const metadata: Metadata = {
  metadataBase: new URL("https://secular-immigrant.com"),

  title: {
    default: "مهاجر سکولار",
    template: "%s | مهاجر سکولار",
  },

  description:
    "مجله شخصی درباره آزادی، سکولاریسم، حقوق زنان، حقوق بشر و تجربه مهاجرت.",

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

  authors: [
    {
      name: "مهاجر سکولار",
    },
  ],

  creator: "مهاجر سکولار",

  publisher: "مهاجر سکولار",

  openGraph: {
    title: "مهاجر سکولار",
    description:
      "یادداشت‌ها و مقاله‌هایی درباره آزادی، سکولاریسم، حقوق زنان، حقوق بشر و مهاجرت.",
    url: "https://secular-immigrant.com",
    siteName: "مهاجر سکولار",
    locale: "fa_IR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "مهاجر سکولار",
    description:
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
        {children}
      </body>
    </html>
  );
}