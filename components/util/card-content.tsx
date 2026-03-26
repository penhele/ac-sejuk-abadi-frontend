export function TitleCard({ title }: { title: string }) {
  return <h1 className="title">{title}</h1>;
}

export function DescriptionCard({ description }: { description: string }) {
  return <h1 className="description h-12 line-clamp-2">{description}</h1>;
}
