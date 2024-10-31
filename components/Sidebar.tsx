"use client";

import {Home, Plus, Settings} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import { useTranslations } from "next-intl";

const routes = [
  {
    label: "home",
    href: "/",
    icon: Home,
    pro: false,
  },
  {
    label: "create",
    href: "/companion/new",
    icon: Plus,
    pro: true,
  },
  {
    label: "settings",
    href: "/settings",
    icon: Settings,
    pro: false,
  },
];

export const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const t = useTranslations("sidebar");
  const onNavigate = (url: string) => {
    //TODO: check if pro
    router.push(url);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href)}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathName === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {t(route.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
