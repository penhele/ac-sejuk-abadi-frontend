import { Button } from "./ui/button";

export default function PromoBar() {
  return (
    <div className="w-full bg-green-400 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-center p-2 gap-4">
        <span>Gratis ongkir untuk pembelian di atas IDR 200.000</span>
        <Button>Shop now</Button>
      </div>
    </div>
  );
}
