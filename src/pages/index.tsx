import React, {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
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
import { SearchModalProps } from "@/interfaces/HomeT";
import { SkeletonLocation } from "@/components/ui/Skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { RocketIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { api } from "@/utils/api";
import Search from "@/components/Search";

enum FilterOption {
  location = "location",
  Character = "character",
  episodes = "episodes",
}

export default function Home() {
  const router = useRouter()
  const LOCATIONS_URL = "https://rickandmortyapi.com/api/location";
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = React.useState<string>("");
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOption>(
    FilterOption.location,
  );

  // const handleRadioChange = (value) => {
  //   setSelectedOption(value);
  // };

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

  async function handleSearch() {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    console.log(value);
  }

  return (
    <>
      <Head>
        <title>Rick N Morty</title>
        <meta name="description" content="I love pickle rick more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-h-auto flex h-auto min-h-screen flex-col items-center space-y-10 bg-gray-200 px-10 pb-10 pt-10">
        <div className="flex h-[400px] w-full flex-col items-center justify-center">
          <section className="flex flex-col items-center space-y-2">
            <h1 className="font-primary text-6xl font-extrabold">
              Rick And Morty API
            </h1>
            <p>A Simple site to show case my full stack skills</p>
          </section>

          <div className="mt-16 flex w-[60%] flex-col items-center space-y-4">
            <section className="flex flex-row space-x-2">
              <Input
                onChange={(event) => {
                  router.replace({
                    query: { ...router.query, misiks_wish: event.target.value },
                  });
                  setValue(event.target.value)

                }}
                className="w-60 bg-white p-2 h-12"
                placeholder="location"
              />
              <Search handleSearch={handleSearch} showAlert={showAlert} value={value} />
            </section>
            <section>
              <h1 className="font-primary text-xl font-bold tracking-wide text-gray-600">
                Filter by
              </h1>
              <RadioGroup
                className="flex w-80 flex-row space-x-2 rounded-lg bg-gray-100 p-4"
                defaultValue={FilterOption.location}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={FilterOption.location} id="r1" />
                  <Label htmlFor="r1">Location Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={FilterOption.Character} id="r2" />
                  <Label htmlFor="r2">Character Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={FilterOption.episodes} id="r3" />
                  <Label htmlFor="r3">Episode Name</Label>
                </div>
              </RadioGroup>
            </section>
          </div>
        </div>

        <div className="group relative flex items-center justify-center">
          <Image
            className="filter-monochrome rounded-xl"
            alt="I'm Mr.Misicks"
            width={800}
            height={0}
            src="/forpicklerick.webp"
          />
        </div>

        <h1 className="font-primary text-xl font-bold tracking-wider underline">
          Locations
        </h1>
        {loading ? (
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonLocation />
            ))}
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Locations locations={locations} />
        )}
      </main>
    </>
  );
}
