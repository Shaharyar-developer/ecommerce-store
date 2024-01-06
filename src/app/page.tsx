import NavBar from "@/components/navbar";
import Products from "./products";
import { LoadToast } from "@/components/load-toast";
export default function Home() {
  return (
    <>
      <NavBar />
      <Products />
      <LoadToast />
    </>
  );
}
