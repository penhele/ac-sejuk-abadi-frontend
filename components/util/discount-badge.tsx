export default function DiscountBadge({ discount }: { discount: string }) {
  return (
    <div className="absolute top-3 left-3 bg-discount py-1 px-2 text-white text-xs rounded-lg">
      {discount}
    </div>
  );
}
