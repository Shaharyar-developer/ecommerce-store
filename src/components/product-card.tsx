"use client";

import type { Sorts } from "./sorting-menu";
import type { Product } from "@/lib/types";

import { ProductDialog } from "./product-dialog";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import Image from "next/image";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const ProductCards = ({ products }: { products: Product[] }) => {
  const [query] = useQueryState("search");
  const [sort] = useQueryState("sort");
  const sortBy = sort as Sorts;
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price low to high") {
      return a.price - b.price;
    }
    if (sortBy === "price high to low") {
      return b.price - a.price;
    }
    return 0;
  });
  const RenderCard = (product: Product) => (
    <Card className="min-w-[20%] relative flex flex-col " key={product.id}>
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
        <p className="flex text-lg font-semibold">Price: ${product.price}</p>
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
        {sortedProducts.map((product) => (
          <RenderCard key={product.id} {...product} />
        ))}
      </>
    );
  }

  const filteredProducts = sortedProducts.filter((product) => {
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
