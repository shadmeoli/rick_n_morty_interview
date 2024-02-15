import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { BASE_URL, GRAPH_URL } from "@/constants/HomeC";
import { Character } from "@/interfaces/HomeT";
import { Input } from "@/components/ui/input";
import { SkeletonLocation } from "@/components/ui/Skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CharcterByID() {
  const [loading, setLoading] = useState<boolean>(false);
  const [location_ID, setLocationID] = useState<number>();
  const [location_name, setLocationName] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const client = new ApolloClient({
    uri: GRAPH_URL,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    setLoading(true);

    setLocationID(Number(sessionStorage.getItem("location_id")));
    setLocationName(sessionStorage.getItem("origin") as string);
    async function withGQL() {
      const results = await client.query({
        query: gql`
          query GetCharacters {
            characters(page: ${page}, filter: {name: "${value}"}) {
              results {
                id
                name
                image
                status
                gender
                location {
                  id
                  name
                }
              }
            }
          }
        `,
      });

      setCharacters(results.data.characters.results);
      console.log(results);
    }

    withGQL();
    setLoading(false);
  }, [value, page]); // Add value to the dependency array

  return (
    <>
      {/* <Input
        className="w-60 border-black"
        onChange={(event: Event) => setValue(event?.target?.value as string)}
        placeholder="Character Name"
      /> */}
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
                <h1 className="overflow-clip truncate font-primary font-bold">
                  {character.name}
                </h1>
                <p className="min-w-12 rounded-full bg-blue-200 p-1 text-center text-xs text-blue-800">
                  {character.status}
                </p>
                <p className="animate-pulse text-xs font-light">
                  {character.location.name}
                </p>
              </section>
            </div>
          ))}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="cursor-pointer" onClick={() => {
                  if (page === 0) {
                    return
                  } else {
                    setPage(page - 1)
                  }
                }} />
              </PaginationItem>
              {
                page >= 4 && (
              <PaginationItem>
                <PaginationLink className="bg-pink-200 text-pink-800 cursor-pointer" onClick={() => setPage(1)} >1</PaginationLink>
              </PaginationItem>
                )
              }
              {page > 1 && (
              <PaginationItem>
                <PaginationLink className="cursor-pointer" onClick={() => setPage(page-1)} >{page-1}</PaginationLink>
              </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="cursor-pointer" onClick={() => setPage(page+1)}>{page+1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="cursor-pointer" onClick={() => setPage(page+1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
