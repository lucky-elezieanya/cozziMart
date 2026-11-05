import Benefits from "@/components/sections/Benefits";
import Hero from "@/components/sections/Hero";
import PopularCategories from "@/components/sections/PopularCategories";
import Products from "@/components/sections/Products";
import Image from "next/image";

export default function Home() {
  return (
<div>
 <Hero />
 <Benefits />
 <PopularCategories />
<Products />
</div>

  );
}
