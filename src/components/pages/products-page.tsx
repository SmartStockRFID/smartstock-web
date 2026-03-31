"use client";

import { getProducts } from "@/api/queries";
import { ProductList } from "@/components/products/product-list";
import { useFetchData } from "@/hooks/use-fetch-data";
import { RequestStatus } from "@/types";
import { ProductRegistration } from "../products/product-registration";
import { ErrorWidget, LoadingWidget } from "./_components";

export function ProductsPage() {
  const productsReq = useFetchData(getProducts);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto max-sm:px-1 flex flex-col sm:flex-row pt-8 gap-8 *:gap-4 pb-2">
      {productsReq.status === RequestStatus.PENDING && <LoadingWidget />}
      {productsReq.status === RequestStatus.ERROR && <ErrorWidget />}
      {productsReq.status === RequestStatus.SUCCESS && (
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
