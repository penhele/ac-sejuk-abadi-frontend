import Image from "next/image";

export default function BrandCard() {
  const detailBrand = { country: "Jepang", since: "2009" };

  return (
    <div className="border p-2 shadow-sm rounded-lg float-left mb-4 mr-4">
      <div className="relative h-24 w-56">
        <Image src={"/daikin.png"} alt="" fill className="object-contain" />
      </div>

      <div className=" space-y-2">
        <h1 className="text-lg font-semibold">Daikin</h1>

        <div className="text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Asal</span>
            <span>{detailBrand.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sejak</span>
            <span>{detailBrand.since}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
