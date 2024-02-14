import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Location } from "@/interfaces/APISchemas";
import { Button } from "@/components/ui/button";
import Locations from "@/components/locations";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api } from "@/utils/api";

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
  }, []);

  const Search = ({title}) => {
    return (
      <Dialog>
        <DialogTrigger className="absolute mt-[32%] h-12 rounded-xl border-b-black border-r-black bg-black/10 p-2 text-center text-white/20 backdrop-blur-xl transition duration-300 ease-in-out hover:border-b-4 hover:border-r-4 group-hover:bg-gray-800 group-hover:text-white">
          {title}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search for location</DialogTitle>
            <DialogDescription className="space-y-4">
              <section className="flex flex-row space-x-2">
                <Input placeholder="location" />
                <Button>search</Button>
              </section>
              <section>
                <h1 className="font-primary text-xl tracking-wide font-bold">
                  Filter by
                </h1>
                <RadioGroup
                  className="flex flex-row space-x-2 bg-gray-200 p-4"
                  defaultValue="comfortable"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Location Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Character Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Episode Name</Label>
                  </div>
                </RadioGroup>
              </section>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Head>
        <title>Rick N Morty</title>
        <meta name="description" content="I love pickle rick more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-h-auto flex h-auto min-h-screen flex-col items-center space-y-10 bg-gray-200 px-10 pb-10 pt-10">
        {/* <section className="flex flex-row items-center space-x-2">
          <Input className="font-primary w-60 bg-white p-2" />
          <Button className="font-primary tracking-wide" variant="outline">
            search
          </Button>
        </section> */}

        <div className="flex h-[1080px] w-full items-center justify-center">
          <section className="flex flex-col items-center space-y-2">
            <h1 className="font-primary text-6xl font-extrabold">
              Rick And Morty API
            </h1>
            <p>A Simple site to show case my full stack skills</p>
          </section>
          <p className="absolute bottom-10 text-gray-400">Just scroll</p>
        </div>

        <div className="group relative flex items-center justify-center">
          <Image
            className="filter-monochrome rounded-xl"
            alt="I'm Mr.Misicks"
            width={1360}
            height={0}
            src="/forpicklerick.webp"
          />
          <Search title="search for location" />
        </div>

        <h1 className="font-primary text-xl font-bold tracking-wider underline">
          Locations
        </h1>
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
