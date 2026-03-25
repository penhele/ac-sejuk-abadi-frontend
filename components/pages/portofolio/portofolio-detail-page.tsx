import ProductCard from "@/components/cards/product-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PortofolioDetailPage() {
  return (
    <div className="">
      <div className="space-y-16">
        <div className="space-y-4">
          <h1 className="text-header-h2 font-bold">Hardi's House</h1>

          <div className="space-y-4">
            <p className="text-body">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
              laboriosam cumque porro exercitationem quibusdam id inventore
              repellendus eveniet ea et ullam culpa labore neque saepe delectus
              commodi ipsam rerum eos explicabo corrupti, ratione maiores
              tempora. Recusandae repellendus quasi optio provident! Voluptate
              hic nihil quia saepe velit, perspiciatis itaque nostrum deserunt,
              doloribus exercitationem beatae suscipit excepturi aspernatur ipsa
              ab id, molestiae rerum provident dolorum possimus. Tempore
              incidunt hic iure nobis modi illo ex voluptatum eveniet,
              consectetur tenetur ab praesentium rem! Voluptate eum, commodi
              laudantium mollitia fugiat quaerat ipsa provident at accusantium!
              Cumque commodi dolore illo debitis officiis, quos a cum molestiae.
            </p>
            <p className="text-body">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
              tempora natus! Fuga numquam mollitia voluptates architecto quia
              non incidunt excepturi quod fugit sequi reprehenderit sint libero
              fugiat, laudantium nemo omnis tempore assumenda. Animi dignissimos
              provident eum deserunt? Aperiam aspernatur maxime id ducimus.
              Alias excepturi enim facere eveniet necessitatibus distinctio qui
              voluptatum iusto. Laboriosam voluptatibus qui asperiores ducimus
              non itaque labore nostrum odio, soluta animi similique assumenda
              corporis quam nulla molestiae? Explicabo laboriosam dolores quae.
              Odit, iure! Ea qui minus expedita eos laborum vero debitis
              inventore quod earum! Consequatur doloremque ullam corporis
              itaque, tempora laudantium temporibus amet cumque repellat
              laboriosam culpa iure excepturi soluta quidem beatae harum cum,
              commodi earum, quasi hic! Ut voluptas, animi est nostrum suscipit
              unde laborum ducimus corrupti, consectetur rem molestias ab!
            </p>
          </div>

        <div className="grid grid-cols-3 gap-4">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />
        </div>
        </div>


        <div className="space-y-4">
          <h2 className="text-lg font-bold">Produk</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis</TableHead>
                <TableHead>Merk</TableHead>
                <TableHead>Nama</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Outdoor AC</TableCell>
                <TableCell>Daikin</TableCell>
                <TableCell>VRV Daikin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Indoor AC</TableCell>
                <TableCell>Daikin</TableCell>
                <TableCell>AC Split</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator/>

          <div className="grid grid-cols-3 gap-4">
            <ProductCard id="qwertyuiop" />
            <ProductCard id="qwertyuiop" />
            <ProductCard id="qwertyuiop" />
          </div>
        </div>
      </div>
    </div>
  );
}
