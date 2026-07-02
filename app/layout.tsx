import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مهاجر سکولار",
    template: "%s | مهاجر سکولار",
  },
  description:
    "مجله شخصی درباره آزادی، حقوق بشر، سکولاریسم، حقوق زنان و مهاجرت.",
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