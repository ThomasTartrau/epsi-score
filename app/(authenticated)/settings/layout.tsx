"use client";

import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { SettingsNav } from "./_components/settings-nav";
import { sidebarNavItems } from "./_config/nav-items";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTab =
    sidebarNavItems.find((item) => item.href === pathname)?.value || "account";

  if (!mounted) {
    return (
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-4xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground text-lg">
            Gérer vos paramètres de compte et définir vos préférences de
            messagerie.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-6 p-4">
        <div>
          <div className="mb-6 space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
            <p className="text-muted-foreground text-sm">
              Gérer vos paramètres de compte et définir vos préférences de
              messagerie.
            </p>
          </div>
          <Tabs
            value={currentTab}
            onValueChange={(value: string) => {
              const item = sidebarNavItems.find((item) => item.value === value);
              if (item) router.push(item.href);
            }}
            className="w-full"
          >
            <TabsList className="w-full">
              {sidebarNavItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="flex-1"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Separator className="my-4" />
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-4xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground text-lg">
          Gérer vos paramètres de compte et définir vos préférences de
          messagerie.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="lg:w-1/5">
          <SettingsNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
