"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";
import { useQueryState } from "nuqs";

export type Sorts = "price low to high" | "price high to low" | "popularity";
export function Sort() {
  const [sortBy, setSortBy] = useState<Sorts>("price high to low");
  const [_, setQuery] = useQueryState<Sorts>("sort", {
    defaultValue: "price high to low",
    parse: (value) => value as Sorts,
  });
  const handleClicked = (sort: Sorts) => {
    setSortBy(sort);
    setQuery(sort);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Sort</Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) =>
            handleClicked(e.currentTarget.innerText.toLowerCase() as Sorts)
          }
          className="max-w-max mx-auto"
        >
          Price Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) =>
            handleClicked(e.currentTarget.innerText.toLowerCase() as Sorts)
          }
          className="max-w-max mx-auto"
        >
          Price High to Low
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) =>
            handleClicked(e.currentTarget.innerText.toLowerCase() as Sorts)
          }
          className="max-w-max mx-auto"
        >
          Popularity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
