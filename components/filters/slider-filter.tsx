import { Slider } from "../ui/slider";

export default function SliderFilter({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">{title}</h1>
        <span className="text-xs text-gray-400 cursor-pointer transition-colors hover:text-primary">
          Reset
        </span>
      </div>

      <Slider
        defaultValue={[25, 50]}
        max={100}
        step={5}
        className="mx-auto w-full max-w-xs"
      />
    </div>
  );
}
