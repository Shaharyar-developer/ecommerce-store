"use client";
import { HomeIcon, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { useCart } from "@/hooks/useCart";
import Cart from "./cart";

export default function NavBar() {
  const [search, setSearch] = useState<string | undefined>();
  const [_, setQuery] = useQueryState("search");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setQuery(e.target.value);
  };
  const { cart } = useCart();

  return (
    <>
      <div className="h-20 lg:h-12">
        <div className="fixed w-full top-0 z-50 bg-background">
          <nav className="px-5 py-4 flex gap-4 justify-between">
            <Button
              onClick={() => {
                window.location.href = "https://www.shaharyar-dev.engineer/";
              }}
            >
              <HomeIcon />
            </Button>
            <div className="min-w-[30%] flex gap-2 justify-center">
              <Input
                value={search}
                onChange={handleChange}
                className=""
                placeholder="Search..."
              />
            </div>
            <div className="flex gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button>
                    <ShoppingBag /> &nbsp;Cart
                  </Button>
                </DrawerTrigger>
                <Cart cart={cart} />
              </Drawer>
            </div>
          </nav>
          <Separator />
        </div>
      </div>
    </>
  );
}
