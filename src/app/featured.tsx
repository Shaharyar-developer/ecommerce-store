"use client";
import FeaturedProductCart from "@/components/featured-card";
import type { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export default function Featured({ products }: { products: Product[] }) {
  const [query] = useQueryState("search");
  const [sort] = useQueryState("sort");
  const [page] = useQueryState("page");
  const [show, setShow] = useState(true);

  const filteredProducts = products
    .filter((a, _) => {
      return a.rating!.rate > 4.5;
    })
    .splice(0, 4);
  useEffect(() => {}, [query, sort, page]);
  return (
    <motion.div
      animate={{
        height: sort || query || Number(page) === 2 ? 0 : "auto",
        opacity: sort || query || Number(page) === 2 ? 0 : 1,
      }}
      className="py-4 italic px-8 bg-accent flex flex-col justify-center rounded"
    >
      <>
        <h2 className="text-center text-6xl font-light">Featured</h2>
        <div className="grid lg:grid-cols-4 ">
          {filteredProducts.map((product) => {
            return <FeaturedProductCart key={product.id} product={product} />;
          })}
        </div>
      </>
    </motion.div>
  );
}
