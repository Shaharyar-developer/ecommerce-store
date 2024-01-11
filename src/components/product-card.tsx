"use client";

import type { Sorts } from "./sorting-menu";
import type { Product } from "@/lib/types";

import { ProductDialog } from "./product-dialog";

import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Dialog, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import Image from "next/image";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const ProductCards = ({ products }: { products: Product[] }) => {
  const [page, setPage] = useQueryState("page");
  const [query] = useQueryState("search");
  const [sort] = useQueryState("sort");
  const sortBy = sort as Sorts;
  useEffect(() => {
    if (!page) {
      setPage("1");
    }
  }, [page]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price low to high") {
      return a.price - b.price;
    }
    if (sortBy === "price high to low") {
      return b.price - a.price;
    }
    return 0;
  });

  const midpoint = Math.ceil(sortedProducts.length / 2);
  const productsToRender =
    page === "1"
      ? sortedProducts.slice(0, midpoint)
      : sortedProducts.slice(midpoint);
  const RenderCard = (product: Product) => (
    <Card
      className="min-w-[20%] relative flex flex-col rounded-none"
      key={product.id}
    >
      <CardHeader>
        <CardTitle className="text-ellipsis whitespace-nowrap overflow-hidden">
          {product.title}
        </CardTitle>
        <Separator />
        <CardDescription>
          {product.description.substring(0, 100)}...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center flex-grow">
        <Image
          src={product.image}
          alt=""
          loading="lazy"
          className="w-auto aspect-square object-contain"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="grid gap-4">
        <div className="flex justify-between w-full">
          <p className="flex text-lg font-semibold">Price: ${product.price}</p>
          <div className="flex items-center gap-2">
            <p className="flex gap-1 text-md items-center text-lg font-semibold">
              {product.rating?.rate} <Star />{" "}
            </p>
            <span className="text-muted-foreground">
              ({product.rating?.count})
            </span>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>View</Button>
          </DialogTrigger>
          <ProductDialog product={product} />
        </Dialog>
      </CardFooter>
    </Card>
  );

  if (query === null) {
    return (
      <>
        {productsToRender.map((product) => (
          <RenderCard key={product.id} {...product} />
        ))}
      </>
    );
  }

  const filteredProducts = productsToRender.filter((product) => {
    const isTitleMatch = product.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const queryCategories = query
      .split(",")
      .map((category) => decodeURIComponent(category));

    const isCategoryMatch = product.category
      ? queryCategories.includes(product.category.toLowerCase())
      : false;

    return isCategoryMatch || isTitleMatch;
  });

  return (
    <>
      {filteredProducts.map((product) => (
        <RenderCard key={product.id} {...product} />
      ))}
    </>
  );
};
export const PaginationTab = () => {
  const [page, setPage] = useQueryState("page");
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              Number(page) > 1
                ? setPage((Number(page) - 1).toString())
                : setPage("1");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={page === "1"}
            onClick={() => {
              setPage("1");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={page === "2"}
            onClick={() => {
              setPage("2");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              Number(page) < 2
                ? setPage((Number(page) + 1).toString())
                : setPage("2");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};