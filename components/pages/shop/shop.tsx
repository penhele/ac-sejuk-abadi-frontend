import CheckboxFilter from "@/components/checkbox-filter";
import ProductList from "@/components/product-list";
import SliderFilter from "@/components/slider-filter";

export default function Shop() {
  const brandList = [
    { name: "Daikin", id: "clh123abc0001" },
    { name: "Samsung", id: "clh123abc0002" },
    { name: "Gree", id: "clh123abc0003" },
    { name: "LG", id: "clh123abc0004" },
    { name: "Panasonic", id: "clh123abc0005" },
  ];

  const pkList = [
    { name: "1/2 PK", id: "clh456def0001" },
    { name: "3/4 PK", id: "clh456def0002" },
    { name: "1 PK", id: "clh456def0003" },
    { name: "1,5 PK", id: "clh456def0004" },
    { name: "2 PK", id: "clh456def0005" },
  ];

  const typeList = [
    { name: "AC Split Wall", id: "clh789ghi0001" },
    { name: "AC Floor Standing", id: "clh789ghi0002" },
    { name: "AC Cassette", id: "clh789ghi0003" },
    { name: "AC Split Duct", id: "clh789ghi0004" },
    { name: "AC Inverter", id: "clh789ghi0005" },
    { name: "AC Portable", id: "clh789ghi0006" },
    { name: "AC Window", id: "clh789ghi0007" },
  ];

  return (
    <div className="flex flex-row gap-8 items-start">
      <aside className="w-3xs flex flex-col gap-8 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <CheckboxFilter title="Brand" listFilter={brandList} />

        <CheckboxFilter title="PK" listFilter={pkList} />

        <CheckboxFilter title="Jenis" listFilter={typeList} />

        <SliderFilter title="Harga" />
      </aside>

      <ProductList />
    </div>
  );
}
