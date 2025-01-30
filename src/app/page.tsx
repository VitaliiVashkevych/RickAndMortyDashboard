"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "@/redux/reducers";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { flavors } from "./ui/fonts";

import "@/app/globals.css";

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
  const dispatch = useDispatch();
  const characters = useSelector((state: any) => state.characters.characters);
  const { data, loading, error } = useQuery(getCharactersGraph);

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [dispatch, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main className="flex flex-col items-center">
      <h1 className={`${flavors.className} text-6xl mt-20 mb-16`}>
        Rick and Morty Characters
      </h1>
      <ul className="grid md:grid-cols-3 gap-x-20 gap-y-12">
        {characters &&
          characters.map((char: any) => (
            <li key={char.id} className="bg-gray-700 rounded-3xl">
              <Link href={`/character?id=${char.id}`}>
                <img src={char.image} alt={char.name} className="rounded-3xl mr-4 ml-4 mt-4" />
                <h2 className="text-2xl m-4">{char.name}</h2>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};
export default HomePage;
