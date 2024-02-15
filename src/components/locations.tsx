import React from "react";
import { Location } from "@/interfaces/HomeT";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
  locations: Location[];
}

export default function Locations({ locations }: Props) {
  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    return <p>No locations found.</p>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 font-primary">
      {locations.map((location: Location, index: number) => {
        console.log(location.url);

        return (
          <Link
            onClick={() => {
              sessionStorage.setItem("location_ID", `${location.id}`);
              sessionStorage.setItem("origin", `${location.name}`);
            }}
            href={`locations/ID=${location.id}origin=${location.name}`}
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
