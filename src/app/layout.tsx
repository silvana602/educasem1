import type { Metadata } from "next";
// import { geistSans, geistMono } from "@/config/fonts";
import "./globals.css";
import { SessionProvider } from "@/components";

export const metadata: Metadata = {
  title: "Educasem",
  description: "Plataforma educativa de Cecasem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}