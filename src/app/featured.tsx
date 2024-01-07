"use client";
import FeaturedProductCart from "@/components/featured-card";
import type { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";

export default function Featured({ products }: { products: Product[] }) {
  const [query] = useQueryState("search");
  const [sort] = useQueryState("sort");

  const filteredProducts = products
    .filter((a, b) => {
      return a.rating!.rate > 4.5;
    })
    .splice(0, 4);

  return (
    <motion.div
      animate={{
        height: sort || query ? "0%" : "auto",
        opacity: sort || query ? 0 : 1,
      }}
      className="pb-4 p-6 px-8 bg-accent flex flex-col justify-center rounded"
    >
      <>
        <h2 className="text-center text-3xl mb-2 font-bold md:-mt-8 lg:-mt-12">
          <svg viewBox="0 0.3 10 0.75">
            <text
              x="5"
              y="1"
              textAnchor="middle"
              fill="none"
              strokeWidth=".008"
              stroke="#000"
              fontFamily="sans-serif"
              fontStyle={"italic"}
              strokeDasharray="100"
              strokeDashoffset="100"
              className="responsive-text text-[0.85px] sm:text-[0.6px] md:text-[0.4px]"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="75s"
                fill="freeze"
              />
              FEATURED PRODUCTS
            </text>
          </svg>
        </h2>
        <div className="grid lg:grid-cols-4 ">
          {filteredProducts.map((product) => {
            return <FeaturedProductCart key={product.id} product={product} />;
          })}
        </div>
      </>
    </motion.div>
  );
}
