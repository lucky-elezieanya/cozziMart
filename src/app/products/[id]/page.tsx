import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetails from "@/components/products/ProductDetails";
import { Suspense } from "react";
import Loading from "@/app/loading";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// 1. Separate the data-fetching and product logic into its own inner component
async function ProductContent({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

// 2. The main page component wraps the content cleanly inside <Suspense>
export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="min-h-screen bg-background-secondary">
      <Suspense fallback={<Loading />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}