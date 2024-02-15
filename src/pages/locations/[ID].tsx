import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { BASE_URL } from "@/constants/HomeC";
import { Character } from "@/interfaces/HomeT";

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
            `${BASE_URL}/character?origin=${location_name}&location=${location_name}`,
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
      {loading && <p>Loading...</p>}

      {characters?.length > 0 && (
        <div className="flex w-screen flex-wrap p-10 gap-4">
          {characters?.map((character, index) => (
            <div className=" rounded h-60 w-40 bg-gray-100 flex flex-col items-start justify-start p-2" key={index}>
              <Image
                alt={character.name}
                height={100}
                width={200}
                src={character.image}
              />
             <section className="space-y-2 flex flex-col items-start">
              <h1 className="truncate overflow-hidden font-primary font-bold">{character.name}</h1>
              <p className="bg-blue-200 text-blue-800 rounded-full text-xs p-1 text-center min-w-12">{character.status}</p>
              <p className="text-xs font-light animate-pulse">{location_name}</p>
              </section> 
            </div>
          ))}
        </div>
      )}
    </>
  );
}
