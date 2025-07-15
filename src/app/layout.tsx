import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import Navbar from "@/app/_components/navbar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import cn from "classnames";
import "./globals.css";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `SellifyWorks | Shopify Agency`,
  description: `Shopify agency in Barcelona. We help you sell more on Shopify.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />

        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:black dark:text-slate-400 bg-black")}
      >
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
