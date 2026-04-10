import { Button } from "../ui/button";

export default function ErrorFallback() {
  return (
    <div className="flex justify-center items-center flex-col space-y-4">
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold">Internal Server Error!</span>
        <span className="text-sm text-gray-400">
          Page could not be loaded. Please try again later.
        </span>
      </div>
    </div>
  );
}
