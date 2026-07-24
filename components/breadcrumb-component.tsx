"use client";

import { ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface Props {
  isDashboard?: boolean;
}

export default function BreadcrumbComponent({ isDashboard }: Props) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  return (
    <Breadcrumb className="p-0 mx-0">
      <BreadcrumbList>
        {!isDashboard && (
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.HOME}>Home</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {pathSegments.map((path, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <Fragment key={href}>
              {(index > 0 || !isDashboard) && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {path}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
