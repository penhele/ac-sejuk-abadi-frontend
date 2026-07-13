import useAcTypes from "@/features/acType/hooks/use-ac-types";
import { useMemo } from "react";
import createAcTypeChart from "../utils/ac-type-chart";

export const useAcTypeChart = () => {
  const { data: acTypes = [] } = useAcTypes();

  return useMemo(() => {
    return createAcTypeChart(acTypes);
  }, [acTypes]);
};
