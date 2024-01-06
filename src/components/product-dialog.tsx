import { Product } from "@/lib/types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import Image from "next/image";

import { useCart } from "@/hooks/useCart";

import { toast } from "sonner";
import { useEffect } from "react";

export const ProductDialog = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  return (
    <DialogContent className="w-full px-16">
      <DialogHeader>
        <DialogTitle className="text-2xl">{product.title}</DialogTitle>
        <div className="flex-col gap-12 py-12 -mx-12 justify-center items-center">
          <Image
            src={product.image}
            alt=""
            loading="lazy"
            width={175}
            height={175}
            className="object-contain max-w-max mx-auto"
          />
          <div className="container mx-auto mt-12 tracking-wider leading-6 overflow-y-auto max-h-[175px] sm:max-h-[250px]">
            <p className="text-lg">{product.description}</p>
          </div>
        </div>
      </DialogHeader>
      <Separator />
      <DialogFooter className="flex justify-center gap-3 px-0 mx-0 items-center">
        <p className="text-2xl flex-1 whitespace-nowrap">
          Price: ${product.price}
        </p>
        <DialogClose className="w-full sm:w-auto" asChild>
          <Button variant={"destructive"}>Cancel</Button>
        </DialogClose>
        <DialogClose className="w-full sm:w-auto" asChild>
          <Button
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart");
            }}
            className="w-full sm:w-auto"
            variant={"default"}
          >
            Add To Cart
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
