import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input";
import Search from "@/components/Search";
import Locations from "@/components/locations";
import { SkeletonLocation } from "@/components/ui/Skeleton";
import { Location } from "@/interfaces/HomeT";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {BASE_URL}  from "@/constants/HomeC"
import Hero from "@/components/Hero";

export default function Home() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let response;
        if (value) {
          response = await axios.get(`${BASE_URL}/location?name=${value}`);
        } else {
          response = await axios.get(`${BASE_URL}/location`);
        }
        setLocations(response.data.results);
      } catch (error) {
        setError("Failed to fetch locations");
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
        setShowAlert(false);
      }
    };
    fetchData();
  }, [value]);

  const handleSearch = async () => {
    setShowAlert(true);
    const response = await axios.get(`${BASE_URL}/location?query=${value}`);
    setLocations(response.data.results);
    setShowAlert(false);
    console.log(value);
  };

  return (
    <>
      <Head>
        <title>Rick N Morty</title>
        <meta name="description" content="I love pickle rick more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-h-auto flex h-auto min-h-screen flex-col items-center space-y-10 bg-gray-200 px-10 pb-10 pt-10">
        <Hero setValue={setValue} handleSearch={handleSearch} showAlert={showAlert} value={value} /> 

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
              <SkeletonLocation key={index} />
            ))}
          </div>
        ) : error ? (
          <Alert className="absolute z-10" variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was something wrong with your search value. Please reload
              the page
            </AlertDescription>
          </Alert>
        ) : (
          <Locations locations={locations} />
        )}
      </main>
    </>
  );
}



/**
 * 
 * Work on :
 * - pagination
 * - detailed view
 * 
 */