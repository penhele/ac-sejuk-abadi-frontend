export default function TotalItems({ total }: { total: number }) {
  return (
    <span className="text-gray-600 text-sm">
      Showing {total} products per page
    </span>
  );
}
