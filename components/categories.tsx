"use client";

import {cn} from "@/lib/utils";

import {Category} from "@prisma/client";
import { useTranslations } from "next-intl";
import {useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({data}: CategoriesProps) => {
  const router = useRouter();
  const t = useTranslations("categories");
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = {categoryId: id};
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {skipNull: true, skipEmptyString: true}
    );
    router.push(url);
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-y
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
      >
        {t("new")}
      </button>
      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => onClick(category.id)}
          className={cn(
            `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-y
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
            categoryId === category.id ? "bg-primary/25" : "bg-primary/10"
          )}
        >
          {t(category.name)}
        </button>
      ))}
    </div>
  );
};
