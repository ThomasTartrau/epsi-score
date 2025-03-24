import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { ErrorHandler } from "@/components/custom/error-handler";
import { Spinner } from "@/components/custom/spinner";
import { Suspense } from "react";
import { ToasterProvider } from "@/app/_components/toaster-provider";
import SWRProvider from "@/app/_components/SWRProvider";
import { Footer } from "@/components/custom/footer";
import Logo from "@/components/custom/logo";
import { Github, LinkedinIcon } from "lucide-react";

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
        <SWRProvider>
          <Suspense fallback={<Spinner />}>
            <ErrorHandler />
          </Suspense>
          {children}
          <ToasterProvider />
        </SWRProvider>
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
      </body>
    </html>
  );
}
