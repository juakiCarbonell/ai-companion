"use client";

import {Search} from "lucide-react";
import {ChangeEventHandler, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import qs from "query-string";

import {Input} from "@/components/ui/input";
import {useDebounce} from "@/hooks/use-debounce";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debounceValue = useDebounce<string>(value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {skipEmptyString: true, skipNull: true}
    );
    router.push(url);
  }, [debounceValue, categoryId, router]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-10 bg-primary/10" onChange={onChange} value={value} />
    </div>
  );
};
