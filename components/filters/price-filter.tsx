export default function PriceFilter() {
  const handleReset = () => {};

  return (
    <div className="flex flex-col gap-2">
      <div className="group flex justify-between items-center">
        <h1 className="font-medium text-sm">Brands</h1>
        <span
          className="text-xs text-gray-400 cursor-pointer transition-colors group-hover:text-primary"
          onClick={() => handleReset()}
        >
          Reset
        </span>
      </div>
    </div>
  );
}
