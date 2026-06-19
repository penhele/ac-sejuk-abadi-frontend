import { useMemo } from "react";
import { useStore } from "@tanstack/react-form";

type Option = {
  label: string;
  value: string;
};

type Props = {
  form: any;
  brandOptions: Option[];
  categoryOptions: Option[];
  acTypeOptions: Option[];
};

export function useProductName({
  form,
  brandOptions,
  categoryOptions,
  acTypeOptions,
}: Props) {
  const values = useStore(form.store, (state: any) => state.values);

  const brandMap = useMemo(
    () =>
      Object.fromEntries(brandOptions.map((item) => [item.value, item.label])),
    [brandOptions],
  );

  const categoryMap = useMemo(
    () =>
      Object.fromEntries(
        categoryOptions.map((item) => [item.value, item.label]),
      ),
    [categoryOptions],
  );

  const acTypeMap = useMemo(
    () =>
      Object.fromEntries(acTypeOptions.map((item) => [item.value, item.label])),
    [acTypeOptions],
  );

  return useMemo(() => {
    return [
      brandMap[values.id_brand],
      acTypeMap[values.id_ac_type],
      values.pk && `${values.pk} PK`,
      categoryMap[values.id_category],
      values.series_name,
      values.freon_type,
      values.model_code && `- ${values.model_code}`,
    ]
      .filter(Boolean)
      .join(" ");
  }, [
    values.id_brand,
    values.id_category,
    values.id_ac_type,
    values.pk,
    values.series_name,
    values.model_code,
    brandMap,
    categoryMap,
    acTypeMap,
  ]);
}
