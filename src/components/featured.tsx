"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import type { Product } from "@/lib/types";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Star } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ProductDialog } from "./product-dialog";
export default function FeaturedProductCart({ product }: { product: Product }) {
  return (
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
}
