import ShopPage from "@/components/pages/public/shop/shop-page";
import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";
import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getCategoriesQueryOptions());
  await queryClient.prefetchQuery(getAcTypesQueryOptions());
  await queryClient.prefetchQuery(getBrandsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopPage />
    </HydrationBoundary>
  );
}
