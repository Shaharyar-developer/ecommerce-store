import { ProductCards } from "@/components/product-card";
import { Product } from "@/lib/types";
import { Category } from "@/components/category-menu";
import { Sort } from "@/components/sorting-menu";
import FeaturedProductCart from "@/components/featured";
export default async function Products() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await fetch("https://fakestoreapi.com/products/categories");
  const products = (await res.json()) as Product[];
  const categories = (await data.json()) as string[];
  return (
    <section className="flex  flex-col gap-4 lg:gap-0 lg:flex-row ">
      <div className="max-w-max mt-4 lg:mt-12 lg:mb-12 flex sm:flex-col gap-2 mx-auto px-12 sticky top-0">
        <Category categories={categories} />
        <Sort />
      </div>
      <span className="w-full h-[1px] lg:w-[1px] bg-border" />
      <main className="max-w-[95%] rounded-lg lg:mt-12 mb-12 pb-32 lg:pb-28 mx-auto max-h-[90svh] md:max-w-[85%] flex flex-col gap-12">
        <div className="pb-4 p-6 px-8 bg-accent flex flex-col justify-center rounded">
          <h2 className="text-center text-3xl mb-2 font-bold">
            <svg viewBox="0 0.3 10 0.75">
              <text
                x="5"
                y="1"
                text-anchor="middle"
                fill="none"
                stroke-width=".015"
                stroke="#000"
                font-family="sans-serif"
                fontStyle={"italic"}
                stroke-dasharray="100"
                stroke-dashoffset="100"
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
            {products
              .filter((a, b) => {
                return a.rating!.rate > 4.5;
              })
              .splice(0, 4)
              .map((product) => {
                return (
                  <FeaturedProductCart key={product.id} product={product} />
                );
              })}
          </div>
        </div>
        <div className=" grid lg:grid-cols-4">
          <ProductCards products={products} />
        </div>
      </main>
    </section>
  );
}
