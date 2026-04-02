import BrandCard from "@/components/cards/brand-card";
import ProductList from "@/components/lists/product-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HeaderSection } from "@/components/util/header";
import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function BrandDetailPage() {
  const DUMMY_PRODUCTS: ProductType[] = [
    {
      id: "p1",
      name: "Midea AC Standard Gold Fin",
      description:
        "Lapisan anti karat ganda yang tahan lama dan mendinginkan lebih cepat.",
      type: "Split Wall",
      price: 2450000,
      pk: 0.5,
      quantity: 15,
      brandId: "midea-01",
      createdAt: "2024-01-10T08:00:00Z",
      updatedAt: "2024-01-10T08:00:00Z",
    },
    {
      id: "p2",
      name: "Daikin Thailand FTNE Series",
      description:
        "AC Thailand yang terkenal dengan ketahanan kompresor dan efisiensi tinggi.",
      type: "Split Wall",
      price: 4200000,
      pk: 1,
      quantity: 8,
      brandId: "daikin-01",
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-12T09:00:00Z",
    },
    {
      id: "p3",
      name: "Sharp Sayonara Zen Plasmacluster",
      description:
        "Teknologi ion generator untuk udara lebih bersih dan bebas bakteri.",
      type: "Inverter",
      price: 3850000,
      pk: 0.75,
      quantity: 12,
      brandId: "sharp-01",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "p4",
      name: "LG Dual Inverter Eco",
      description: "Hemat listrik hingga 70% dengan teknologi kompresor ganda.",
      type: "Inverter",
      price: 3600000,
      pk: 0.5,
      quantity: 0, // Contoh stok habis
      brandId: "lg-01",
      createdAt: "2024-01-18T11:00:00Z",
      updatedAt: "2024-01-18T11:00:00Z",
    },
    {
      id: "p5",
      name: "Panasonic Standard Non-Inverter",
      description:
        "Eco-tough casing yang tahan terhadap cuaca ekstrem di luar ruangan.",
      type: "Split Wall",
      price: 3100000,
      pk: 0.5,
      quantity: 20,
      brandId: "panasonic-01",
      createdAt: "2024-01-20T12:00:00Z",
      updatedAt: "2024-01-20T12:00:00Z",
    },
    {
      id: "p6",
      name: "Gree Combo Split Multi",
      description:
        "Satu outdoor untuk dua indoor, solusi hemat tempat untuk apartemen.",
      type: "Multi Split",
      price: 7500000,
      pk: 2,
      quantity: 4,
      brandId: "gree-01",
      createdAt: "2024-01-22T13:00:00Z",
      updatedAt: "2024-01-22T13:00:00Z",
    },
    {
      id: "p7",
      name: "Samsung WindFree Lite",
      description:
        "Mendinginkan tanpa hembusan angin langsung yang menusuk kulit.",
      type: "Inverter",
      price: 4900000,
      pk: 1,
      quantity: 6,
      brandId: "samsung-01",
      createdAt: "2024-01-25T14:00:00Z",
      updatedAt: "2024-01-25T14:00:00Z",
    },
    {
      id: "p8",
      name: "Aqua Japan Turbo Cool",
      description:
        "Fitur turbo cooling mendinginkan ruangan hanya dalam waktu 5 menit.",
      type: "Split Wall",
      price: 2300000,
      pk: 0.5,
      quantity: 18,
      brandId: "aqua-01",
      createdAt: "2024-01-28T15:00:00Z",
      updatedAt: "2024-01-28T15:00:00Z",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Brand</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Daikin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="">
        <HeaderSection title="Tentang Brand" />

        <div className="">
          <BrandCard />

          <div className="space-y-4 text-sm text-gray-800">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, unde
              labore. Ipsam corporis necessitatibus soluta enim provident magni?
              Ratione tempore eveniet id impedit debitis enim doloremque! Sint
              nesciunt non voluptatum aspernatur iusto a quod eius quas
              temporibus molestias nulla explicabo voluptatem esse numquam
              aliquid sapiente, fugit voluptatibus maxime mollitia quae
              assumenda! Voluptate aperiam et corporis odit voluptatem numquam
              in ea incidunt debitis porro. Quia dicta vero ullam cumque veniam
              incidunt explicabo. Ad at quasi, provident veritatis aspernatur
              voluptatem, est totam recusandae ratione culpa consequatur ipsam
              molestias tenetur ea? Iste earum vel repudiandae nesciunt, sequi
              reprehenderit, soluta eaque perspiciatis quia quis laudantium
              totam. Distinctio tempore ipsa itaque fuga dolor doloremque
              voluptates soluta amet, molestiae possimus quam dignissimos,
              voluptatibus quisquam. Repellendus neque tempore nobis laborum,
              facere ipsum doloribus unde nisi blanditiis! Amet, aliquid
              architecto, odio voluptatem ab error minus repellendus nulla
              expedita voluptatum dignissimos nisi ex. Explicabo minus
              necessitatibus autem nemo libero?
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              facere nostrum atque ut, quidem at id officiis odit reprehenderit
              doloremque quibusdam, iusto sequi animi asperiores, suscipit
              tempora quis amet expedita? Nisi blanditiis architecto, rem quis
              quam facere enim adipisci ipsum commodi asperiores voluptatum.
              Esse nemo accusantium necessitatibus consequuntur laborum autem
              repudiandae error, accusamus reprehenderit odio cumque voluptates
              doloribus nihil quis sequi laudantium quo iste animi veritatis
              distinctio. Fugit sapiente odio aliquid modi ut, placeat ea quasi,
              officia nam molestiae voluptatum ab dolores aliquam voluptates.
              Deserunt est accusamus dolores! Hic quam labore debitis magni
              consequuntur dolorem accusantium facere atque exercitationem
              delectus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              iusto quas minima, obcaecati aspernatur saepe! Facilis accusamus
              dolorem quas at necessitatibus asperiores porro dicta, modi
              distinctio voluptate! Quas quo aut est quod, consectetur
              repudiandae doloremque quae sit quisquam voluptatem, facere
              corrupti quam reiciendis esse saepe nisi! Error, ipsam. At est
              maxime dolore possimus ea ullam ab consequatur ad. Magnam,
              voluptatibus quae ab quam ipsam a, iste autem est nemo sunt minus
              incidunt velit molestiae, saepe excepturi suscipit eius qui
              expedita veritatis debitis totam. In, dicta praesentium! Enim
              voluptatum nostrum voluptatibus, totam aliquid porro ex esse.
              Reprehenderit cum voluptatum nemo. Corporis quam ab nihil suscipit
              cum laboriosam, explicabo nam impedit voluptatem ipsam. Ut
              repellendus explicabo ex quia dicta dolore commodi tempore!
              Placeat, ratione nemo alias maiores itaque autem a quis vero ad
              architecto blanditiis temporibus magni exercitationem? Suscipit
              aut iusto aliquam aliquid earum, ipsa quae voluptate eveniet
              necessitatibus eligendi esse rem.
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <HeaderSection title="Produk Daikin" href="/shop/" />

        <ProductList className="grid-cols-4!" products={DUMMY_PRODUCTS} limit={4} />
      </div>

      <div className="">
        <HeaderSection title="Brand Lain" />

        <div className="grid grid-cols-8 gap-4">
          {Array.from({ length: 10 }).map((item, index) => (
            <Link key={index} href={"/brand/daikin"}>
              <div className="h-16 relative border rounded-lg shadow-sm transition-all hover:shadow-lg">
                <Image
                  src={"/daikin.png"}
                  alt=""
                  fill
                  className="object-contain px-4 py-2"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
