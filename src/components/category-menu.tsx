"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { useQueryState } from "nuqs";

export function Category({ categories }: { categories: string[] }) {
  const [_, setQuery] = useQueryState("search");

  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
    categories.reduce((acc: Record<string, boolean>, curr) => {
      acc[curr] = false;
      return acc;
    }, {})
  );
  const [checkedCategories, setCheckedCategories] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setQuery(checkedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCategories]);

  const handleCheckedChange = (category: string) => (checked: boolean) => {
    setCheckedStates((prev) => {
      const newCheckedStates = { ...prev, [category]: checked };
      const newCheckedCategories = Object.entries(newCheckedStates)
        .filter(([_, isChecked]) => isChecked)
        .map(([category, _]) => category)
        .join(",");
      setCheckedCategories(newCheckedCategories);
      return newCheckedStates;
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => {
          return (
            <DropdownMenuCheckboxItem
              key={category}
              checked={checkedStates[category]}
              onCheckedChange={handleCheckedChange(category)}
              className="capitalize"
            >
              {category}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
