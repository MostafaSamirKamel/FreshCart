import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
}

export default function CategoryCard({ id, name, image }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${id}`}
      className="card group flex flex-col items-center p-4 hover:border-primary-600 transition-all duration-300"
    >
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-sm font-bold text-gray-800 text-center line-clamp-1 group-hover:text-primary-600">
        {name}
      </h3>
    </Link>
  );
}
