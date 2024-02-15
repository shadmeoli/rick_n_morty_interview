import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { BASE_URL } from "@/constants/HomeC";
import { Character } from "@/interfaces/HomeT";
import { SkeletonLocation } from "@/components/ui/Skeleton";

export default function CharcterByID() {
  const [loading, setLoading] = useState<boolean>(false);
  const [location_ID, setLocationID] = useState<string>();
  const [location_name, setLocationName] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setLocationID(sessionStorage.getItem("location_id") as string);
    setLocationName(sessionStorage.getItem("origin") as string);
    async function loadData() {
      try {
        let response;
        if (value) {
          response = await axios.get(`${BASE_URL}/character?query=${value}`);
        } else {
          // Assuming location_name is already set properly
          response = await axios.get(
            `${BASE_URL}/character?location=${location_name}`,
          );
        }
        setCharacters(response.data.results);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // Move setLoading(false) inside the finally block
      }
    }
    loadData();
  }, [value]); // Add value to the dependency array

  const handleSearch = async () => {
    setLoading(true); // Set loading to true before making the request
    try {
      const response = await axios.get(`${BASE_URL}/character?query=${value}`);
      setCharacters(response.data.results);
    } catch (error) {
      console.error("Error searching characters:", error);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <>
      {/* Add loading indicator */}
      {loading && (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonLocation key={index} />
          ))}
        </div>
      )}

      {characters?.length && (
        <div className="flex w-screen flex-wrap gap-4 p-10">
          {characters?.map((character, index) => (
            <div
              className=" flex h-60 w-40 flex-col items-start justify-start rounded bg-gray-100 p-2"
              key={index}
            >
              <Image
                alt={character.name}
                height={100}
                width={200}
                src={character.image}
              />
              <section className="flex flex-col items-start space-y-2">
                <h1 className="overflow-hidden truncate font-primary font-bold">
                  {character.name}
                </h1>
                <p className="min-w-12 rounded-full bg-blue-200 p-1 text-center text-xs text-blue-800">
                  {character.status}
                </p>
                <p className="animate-pulse text-xs font-light">
                  {location_name}
                </p>
              </section>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
