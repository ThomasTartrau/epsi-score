import { Footer } from "@/components/custom/footer";
import Logo from "@/components/custom/logo";
import { Github, LinkedinIcon } from "lucide-react";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
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
    </div>
  );
}
