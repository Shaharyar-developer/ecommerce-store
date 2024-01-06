import type { Product } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";

export const CartCard = ({ product }: { product: Product }) => {
  const { updateItemQuantity, removeItem } = useCart();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>
          {product.description.substring(0, 100)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex text-lg font-semibold">
          Price Per Item: ${product.price}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          Quantity
          <Button
            variant={"outline"}
            onClick={() => {
              updateItemQuantity(
                product.id,
                product.quantity ? product.quantity - 1 : 0
              );
            }}
          >
            <Minus />
          </Button>
          <p className="flex text-lg font-semibold">{product.quantity}</p>
          <Button
            variant={"outline"}
            onClick={() => {
              updateItemQuantity(
                product.id,
                product.quantity ? product.quantity + 1 : 1
              );
            }}
          >
            <Plus />
          </Button>
        </div>
        <span className="h-8 w-[1px] bg-primary mx-2" />
        <Button
          variant={"destructive"}
          onClick={() => {
            removeItem(product.id);
          }}
        >
          <Trash2 className="w-6 h-6" />
        </Button>
      </CardFooter>
    </Card>
  );
};
