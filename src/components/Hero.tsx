import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Input } from "./ui/input";
import Search from "./Search";
import { HeroProps } from "@/interfaces/HomeT";

export default function Hero({setValue, handleSearch, showAlert, value}: HeroProps) {

  const router = useRouter()

  return (
    <>
    <div className="w-full h-12 sticky top-2 backdrop-blur">
      <Image
            className="filter-monochrome rounded-xl z-10"
            alt="I'm Mr.Misicks"
            width={100}
            height={0}
            src="/Rick-and-Morty.png"
          />
    </div>
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <section className="flex flex-col items-center space-y-2"> 
          <h1 className="text-6xl font-bold text-black">Rick And Morty</h1>
          <p>A Simple site to show case my full stack skills</p>
        </section>

        <div className="mt-16 flex w-[60%] flex-col items-center space-y-4">
          <section className="flex flex-row space-x-2">
            <Input
              onChange={(event) => {
                router.replace({
                  query: { ...router.query, misiks_wish: event.target.value },
                });
                setValue(event.target.value);
              }}
              className="h-12 w-60 bg-white p-2"
              placeholder="location"
            />
            <Search
              handleSearch={handleSearch}
              showAlert={showAlert}
              value={value}
            />
          </section>
        </div>
      </div>
    </>
  );
}
