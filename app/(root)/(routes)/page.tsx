import {Categories} from "@/components/categories";
import {SearchInput} from "@/components/search-input";
import prismaDb from "@/lib/prismadb";
import React from "react";
import {getTranslations} from 'next-intl/server';

const RootPage = async () => {
  const categories = await prismaDb.category.findMany();
  const t = await getTranslations("HomePage");
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      {t(('title'))}
    </div>
  );
};

export default RootPage;
