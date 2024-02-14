import React from "react";
import { Location } from "@/interfaces/APISchemas";

import Link from "next/link";
import Image from "next/image";

interface Props {
  locations: Location[];
}

export default function Locations({ locations }: Props) {
  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    return <p>No locations found.</p>;
  }

  return (
    <div className="font-primary flex flex-wrap items-center justify-center gap-4">
      {locations.map((location: Location, index: number) => {
        console.log(location.url);

        return (
          <Link
            href={`characters/${location.id}`}
            key={location.id}
            className="h-40 w-60 rounded-md bg-gray-100 p-4 hover:shadow-lg"
          >
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
            <span className="text-red-400">
              Residents: {location.residents.length}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
