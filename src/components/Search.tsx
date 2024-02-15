import React from 'react';
import { Input } from "@/components/ui/input";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { SearchProps } from '@/interfaces/HomeT';



export default function Search({ handleSearch, showAlert, value }: SearchProps) {
  return (
    <>
      <Input
        onClick={handleSearch}
        type="submit"
        value="Search"
        className="h-12 w-16 cursor-pointer rounded-lg bg-black text-center text-white hover:shadow-lg active:cursor-wait"
      />
      {showAlert && (
        <Alert className="absolute right-3 top-10 flex h-20 w-80 flex-col items-start justify-center bg-white font-primary text-black backdrop-blur">
          <MagicWandIcon className="h-5 w-5" />
          <AlertTitle>Looking up!</AlertTitle>
          <AlertDescription className="space-x-2">
            Let's see if we can find
            {value.length ? (
              <span className="h-10 w-10 rounded-xl bg-blue-200 p-1 text-xs text-blue-800">
                {value}
              </span>
            ) : (
              <span className="h-10 rounded-xl bg-red-200 p-1 text-xs text-red-800">
                NOTHING!
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
