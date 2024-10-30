'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, CheckIcon, Globe} from "lucide-react";
import {locales} from "@/i18n/config";
import {setUserLocale} from '@/services/locale';

import React from "react";
import {useLocale, useTranslations} from "next-intl";

export const LanguageSelector = () => {
  const t = useTranslations("languages");
  const locale = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-1">
          <Globe className="h-5 w-5 hidden sm:block" />
          <span>{t(`${locale}`)}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((cur) => (
          <DropdownMenuItem
            className="flex items-center justify-between"
            key={cur}
            onClick={() => setUserLocale(cur)}
          >
            <span>{t(`${cur}`)}</span>
            {locale === cur && <CheckIcon className="h-5 w-5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
