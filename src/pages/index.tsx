import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

import { Location } from "@/interfaces/APISchemas";
import { api } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Locations from "@/components/locations";

export default function Home() {
  const LOCATIONS_URL = "https://rickandmortyapi.com/api/location";
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocations() {
      setLoading(true);
      try {
        const response = await axios.get(LOCATIONS_URL);
        setLocations(response.data.results);
      } catch (error) {
        setError("Failed to fetch locations");
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    }

    getLocations();
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  return (
    <>
      <Head>
        <title>Rick N Morty</title>
        <meta name="description" content="I love pickle rick more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gray-200 px-10 space-y-10">
        <section className="flex flex-row items-center space-x-2">
          <Input className="font-primary w-60 bg-white p-2" />
          <Button className="font-primary tracking-wide" variant="outline">
            search
          </Button>
        </section>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Locations locations={locations} />
        )}
      </main>
    </>
  );
}
