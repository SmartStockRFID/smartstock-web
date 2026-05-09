"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/queries";
import { ProductList } from "@/components/products/product-list";
import { ProductRegistration } from "../products/product-registration";
import { ErrorWidget, LoadingWidget } from "./_components";

export function ProductsPage() {
  const productsReq = useQuery({
    queryFn: getProducts,
    queryKey: ["products"],
  });

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 pt-8 pb-2 *:gap-4 max-sm:px-1 sm:flex-row">
      {productsReq.status === "pending" && <LoadingWidget />}
      {productsReq.status === "error" && <ErrorWidget />}
      {productsReq.status === "success" && (
        <>
          <ProductList
            className="w-full sm:w-2/3"
            products={productsReq.data ?? []}
          />
          <ProductRegistration className="w-full sm:w-1/3" />
        </>
      )}
    </main>
  );
}
