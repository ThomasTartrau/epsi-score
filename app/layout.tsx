import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { ErrorHandler } from "@/components/custom/error-handler";
import { Spinner } from "@/components/custom/spinner";
import { Suspense } from "react";
import { ToasterProvider } from "@/app/_components/toaster-provider";
import SWRProvider from "@/app/_components/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME + " - Affichage du classement",
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SWRProvider>
            <Suspense fallback={<Spinner />}>
              <ErrorHandler />
            </Suspense>
            {children}
            <ToasterProvider />
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
