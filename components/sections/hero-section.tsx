import Image from "next/image";

export default function HeroSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen h-80 flex items-center justify-center bg-muted">
      <Image
        src={"/hero.jpg"}
        alt=""
        fill
        className="object-cover brightness-75"
      />
      <div className="max-w-7xl absolute">
        <div className="flex flex-col space-y-2 items-center text-center">
          <span className="text-5xl font-bold text-white  rounded-sm">
            {title}
          </span>
          <span className="text-sm text-white   rounded-sm">{description}</span>
        </div>
      </div>
    </section>
  );
}
