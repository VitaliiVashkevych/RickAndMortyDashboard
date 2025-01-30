"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { flavors } from "./ui/fonts";

import "@/app/globals.css";
import { Skeleton } from "./ui/skeletons";

const getCharactersGraph = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

const HomePage = () => {
  const { data, loading, error } = useQuery(getCharactersGraph);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  return (
    <main className="flex flex-col items-center">
      <h1 className={`${flavors.className} text-6xl mt-20 mb-16`}>
        Rick and Morty Characters
      </h1>

      <ul className="grid md:grid-cols-3 gap-x-20 gap-y-12">
        {loading && Array(9).fill(1).map(() => <Skeleton />)}
        {data?.characters?.results?.map((char: any) => (
          <li key={char.id} className="bg-gray-700 rounded-3xl max-w-[300px]">
            <Link href={`/character?id=${char.id}`}>
              <img
                src={char.image}
                alt={char.name}
                className="rounded-3xl p-4 box-border"
              />
              <h2 className="text-2xl p-4">{char.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default HomePage;
