import BrandCard from "@/components/cards/brand-card";
import ProductList from "@/components/lists/product-list";
import { HeaderSection } from "@/components/util/header";
import Image from "next/image";
import Link from "next/link";

export default function BrandDetailPage() {
  return (
    <div className="space-y-8">
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

        <ProductList className="grid-cols-4!" />
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
