import ShopPage from "@/components/pages/public/shop/shop-page";
import { getAcTypesQueryOptions } from "@/features/acType/queries/ac-type-queries";
import { getCategoriesQueryOptions } from "@/features/category/queries/category-queries";
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopPage />
    </HydrationBoundary>
  );
}
