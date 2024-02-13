import React from "react";
import { Location } from "@/interfaces/APISchemas";

import Image from "next/image";

interface Props {
  locations: Location[];
}

export default function Locations({ locations }: Props) {
  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    return <p>No locations found.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 font-primary">
      {locations.map((location: Location, index: number) => (
        <a
        href="#"
        key={location.id}
        className="h-80 w-60 rounded-md bg-white p-4 hover:shadow-lg"
        >
          <Image src={location.url} width={80} height={60} />
          <h1 className="text-lg font-semibold">{location.name}</h1>
          <p className="text-gray-600">
            Type:{" "}
            <span className=" min-w-20 rounded-full bg-blue-800/20 p-1 text-xs text-blue-800">
              {location.type}
            </span>
          </p>
          <p className="font-blue-800 text-xs text-gray-600">
            {location.dimension}
          </p>
            <span className="text-red-400">Residents: {location.residents.length}</span>
        </a>
      ))}
    </div>
  );
}
