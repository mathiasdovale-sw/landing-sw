import cn from "classnames";
import "../globals.css";
import { inter, archivo, jetbrainsMono } from "@/app/fonts";
import { baseMetadata } from "@/app/base-metadata";
import RootHead from "@/app/_components/root-head";
import RootShell from "@/app/_components/root-shell";
import type { Metadata } from "next";

export const metadata: Metadata = baseMetadata;

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <RootHead />
      </head>
      <body
        className={cn(inter.className, archivo.variable, jetbrainsMono.variable)}
        style={{ backgroundColor: '#141417ff' }}
        suppressHydrationWarning
      >
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
