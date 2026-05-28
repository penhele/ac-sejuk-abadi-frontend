import UploadProductImageForm from "@/components/forms/product/upload-product-image-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function UploadProductImagePage() {
  return (
    <div className="grid grid-cols-3">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
        </CardHeader>

        <CardContent>
          <UploadProductImageForm />
        </CardContent>

        <CardFooter>
          <div className="space-x-between-items">
            <Button variant={"outline"}>Cancel</Button>
            <Button>Submit</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
