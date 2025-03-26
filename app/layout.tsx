"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorHandler } from "@/components/custom/error-handler";
import { Spinner } from "@/components/custom/spinner";
import { Suspense } from "react";
import { ToasterProvider } from "@/app/_components/toaster-provider";
import SWRProvider from "@/app/_components/SWRProvider";
import { Footer } from "@/components/custom/footer";
import Logo from "@/components/custom/logo";
import { Github, LinkedinIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRProvider>
          <Suspense fallback={<Spinner />}>
            <ErrorHandler />
          </Suspense>
          {children}
          <ToasterProvider />
        </SWRProvider>
        {!isAdminRoute && (
          <div className="w-full">
            <Footer
              logo={<Logo size="sm" />}
              brandName="OpenInnovation EPSI Nantes"
              socialLinks={[
                {
                  icon: <LinkedinIcon className="h-5 w-5" />,
                  href: "https://fr.linkedin.com/in/thomas-tartrau",
                  label: "Linkedin",
                },
                {
                  icon: <Github className="h-5 w-5" />,
                  href: "https://github.com/ThomasTartrau",
                  label: "GitHub",
                },
              ]}
              copyright={{
                text: "© 2025 Thomas Tartrau - EPSI Nantes",
                license: "Tous droits réservés",
              }}
            />
          </div>
        )}
      </body>
    </html>
  );
}
