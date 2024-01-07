import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { CheckOut } from "./check-out";

import { Button } from "./ui/button";

import { CartCard } from "./cart-card";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Cart({ cart }: { cart: Product[] }) {
  const [open, setOpen] = useState(false);
  const [fixedCart, setFixedCart] = useState<Product[] | null>(null);
  const total = cart
    ? cart.reduce(
        (acc, curr) => acc + curr.price * (curr.quantity ? curr.quantity : 1),
        0
      )
    : null;
  useEffect(() => {
    setFixedCart(() => {
      console.log(cart);
      return cart;
    });
    console.log(fixedCart);
  }, [cart, fixedCart]);
  const closeModal = () => setOpen(false);
  return (
    <>
      <DrawerContent className="">
        <DrawerHeader className="">
          <DrawerTitle className="sm:text-3xl">Your Cart</DrawerTitle>
        </DrawerHeader>

        <DrawerDescription className="ml-4 mb-4">
          {cart &&
            (cart.length > 0 ? (
              <>
                You have {cart?.length} items, totalling $
                {Math.floor(total ? total : 0 * 100) / 1}
              </>
            ) : (
              <>Your Cart is Empty</>
            ))}
        </DrawerDescription>
        <div
          className="grid lg:grid-cols-3 max-h-[75svh] overflow-y-auto
         lg:overflow-y-hidden lg:max-h-[100%]  gap-4 container mx-auto"
        >
          {cart?.map((product) => (
            <CartCard product={product} key={product.id} />
          ))}{" "}
        </div>
        <DrawerFooter className="">
          <DrawerClose asChild>
            <Button onClick={() => setOpen(true)}>Check Out</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
      <CheckOut closeModal={closeModal} open={open} />
    </>
  );
}
