import { ProductCards } from "@/components/product-card";
import { Product } from "@/lib/types";
import { Category } from "@/components/category-menu";
import { Sort } from "@/components/sorting-menu";
import Featured from "./featured";
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
        <Featured products={products} />
        <div className=" grid lg:grid-cols-4">
          <ProductCards products={products} />
        </div>
      </main>
    </section>
  );
}
