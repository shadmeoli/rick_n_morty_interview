import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { BASE_URL, GRAPH_URL } from "@/constants/HomeC";
import { Character } from "@/interfaces/HomeT";
import { Input } from "@/components/ui/input";
import { SkeletonLocation } from "@/components/ui/Skeleton";
import { useRouter } from "next/router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { api } from "@/utils/api";

export default function CharcterByID() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [location_ID, setLocationID] = useState<number>();
  const [location_name, setLocationName] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [characterName, setCharacterName] = useState<string>();
  const [note, setNote] = useState<string>();
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

  const db = api.post.create.useMutation();

  function saveNote() {
    try {
      db.mutate({
        note: note,
        character_name: characterName,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setNote("");
    }
  }

  return (
    <>
      <div className="sticky top-2 z-10 h-12 w-full backdrop-blur">
        <Image
          className="filter-monochrome z-10 rounded-xl"
          alt="I'm Mr.Misicks"
          width={100}
          height={0}
          src="/Rick-and-Morty.png"
        />
      </div>
    <section className="mt-40 flex flex-col items-center -space-y-6">
        <section className="flex flex-col items-center space-y-2"> 
          <h1 className="text-6xl font-bold text-black">Rick And Morty</h1>
          <p>A Simple site to show case my full stack skills</p>
        </section>
      </section>

      <div className="mt-16 flex w-[60%] flex-col items-start space-y-1 px-10">
        <h1 className="font-primary font-semibold">Character Name</h1>
        <section className="flex flex-row space-x-2">
          <Input
            onChange={(event) => {
              router.replace({
                query: { ...router.query, misiks_wish: event.target.value },
              });
              setValue(event.target.value);
            }}
            className="h-12 w-60 bg-white p-2"
            placeholder="character"
          />
        </section>
      </div>
      {loading && (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonLocation key={index} />
          ))}
        </div>
      )}

      {characters?.length && (
        <Dialog>
          <DialogTrigger>
            <div className="flex w-screen flex-wrap gap-4 p-10">
              {characters?.map((character, index) => (
                <button
                  className=" flex h-60 w-40 flex-col items-start justify-start rounded bg-gray-100 p-2"
                  key={index}
                  onClick={() => setCharacterName(character.name)}
                >
                  <Image
                    alt={character.name}
                    height={100}
                    width={200}
                    src={character.image}
                  />
                  <section className="flex flex-col items-start space-y-2">
                    <h1 className="w-36 overflow-clip truncate text-ellipsis font-primary font-bold">
                      {character.name}
                    </h1>
                    <p className="min-w-12  rounded-full bg-blue-200 p-1 text-center text-xs text-blue-800">
                      {character.status}
                    </p>
                    <p className="w-36 animate-pulse overflow-clip truncate text-ellipsis text-xs font-light">
                      {character.location.name}
                    </p>
                  </section>
                </button>
              ))}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className="cursor-pointer"
                      onClick={() => {
                        if (page === 0) {
                          return;
                        } else {
                          setPage(page - 1);
                        }
                      }}
                    />
                  </PaginationItem>
                  {page >= 4 && (
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer bg-pink-200 text-pink-800"
                        onClick={() => setPage(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => setPage(page - 1)}
                      >
                        {page - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => setPage(page + 1)}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className="cursor-pointer"
                      onClick={() => setPage(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Note</DialogTitle>
              <DialogDescription>
                Make a note about your selected character.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  character's Name
                </Label>
                <Input disabled value={characterName} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Note on {characterName}
                </Label>
                <Input
                  onChange={(event) => setNote(event.target.value)}
                  id="username"
                  value={note}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={saveNote} type="submit">
                Save Note
              </Button>
            </DialogFooter>
            {showAlert && (
              <Alert className="bg-green-200 font-primary text-black shadow-lg">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle className="font-bold text-green-800">
                  Heads up!
                </AlertTitle>
                <AlertDescription>Note has been saved</AlertDescription>
              </Alert>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
