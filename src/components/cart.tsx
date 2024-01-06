import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

import { CartCard } from "./cart-card";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Cart({ cart }: { cart: Product[] }) {
  const [fixedCart, setFixedCart] = useState<Product[] | null>(null);
  const total = cart ? cart.reduce((acc, curr) => acc + curr.price, 0) : null;
  useEffect(() => {
    setFixedCart(() => {
      console.log(cart);
      return cart;
    });
    console.log(fixedCart);
  }, [cart, fixedCart]);
  return (
    <>
      <DrawerContent className="">
        <DrawerHeader className="">
          <DrawerTitle className="sm:text-3xl">Your Cart</DrawerTitle>
        </DrawerHeader>

        <DrawerDescription className="ml-4">
          {cart ? (
            cart.length > 0 ? (
              <>
                You have {cart?.length} items, totalling ${total}
              </>
            ) : (
              <>Your Cart is Empty</>
            )
          ) : (
            <></>
          )}
        </DrawerDescription>
        <div className="grid md:grid-cols-2 gap-4 container mx-auto">
          {cart?.map((product) => (
            <CartCard product={product} key={product.id} />
          ))}{" "}
        </div>
        <DrawerFooter className="">
          <DrawerClose asChild>
            <Button>Check Out</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
