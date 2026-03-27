import CheckboxFilter from "./checkbox-filter";
import SliderFilter from "./slider-filter";

export default function ShopFilter() {
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
    <aside className="w-3xs sticky md:top-20 space-y-4">
      <h1 className="text-lg font-bold">Filter Products</h1>

      <div className="flex flex-col space-y-8 border rounded-lg p-4">
        <CheckboxFilter title="Brand" listFilter={brandList} />

        <CheckboxFilter title="PK" listFilter={pkList} />

        <CheckboxFilter title="Jenis" listFilter={typeList} />

        <SliderFilter title="Harga" />
      </div>
    </aside>
  );
}
