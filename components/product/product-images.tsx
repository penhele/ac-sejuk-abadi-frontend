import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

export default function ProductImages({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex flex-col gap-2">
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md" />

      {jumlah > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: jumlah - 1 }).map((_, index) => {
            if (index >= 5) return null;

            return (
              <AspectRatio
                key={index}
                ratio={1 / 1}
                className="bg-muted rounded-md relative overflow-hidden"
              >
                {index === 4 && jumlah > 6 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-700 font-bold text-lg">
                      + {jumlah - 5}
                    </span>
                  </div>
                )}
              </AspectRatio>
            );
          })}
        </div>
      )}
    </div>
  );
}
