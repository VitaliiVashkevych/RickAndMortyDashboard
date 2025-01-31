"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import "@/app/globals.css";
import { Suspense } from "react";

const CharacterInfo = () => {
  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id") as string;
  const getCharacter = gql`
    query {
  character(id: ${paramsId}) {
    name
    status
    species
    gender
    image
    origin {
      name
      id
    }
    episode {
      id
      name
      episode
    }
  }
}
  `;

  const { data, loading, error } = useQuery(getCharacter);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  return (
    <Suspense>
      <div className="flex flex-col justify-center m-5 gap-y-8">
        <Link href="/">
          <button className="bg-gray-700 p-2 rounded-xl text-xl">
            Back to main page
          </button>
        </Link>
        <h1 className="self-center text-6xl text-red-200">Character's page</h1>
        <img
          src={data.character.image}
          alt={data.character.name}
          className="rounded-2xl object-fill w-[300px] h-[300px]"
        />
        <p className="text-6xl">
          Name: <span className="text-cyan-300">{data.character.name}</span>
        </p>
        <p className="text-6xl">
          Status: <span className="text-cyan-300">{data.character.status}</span>
        </p>
        <p className="text-6xl">
          Species:{" "}
          <span className="text-cyan-300">{data.character.species}</span>
        </p>
        <p className="text-6xl">
          Gender: <span className="text-cyan-300">{data.character.gender}</span>
        </p>
        <Link href={`/location?id=${data.character.origin.id}`}>
          <p className="text-6xl hover:text-cyan-600">
            Origin:{" "}
            <span className="text-cyan-300">{data.character.origin.name}</span>
          </p>
        </Link>

        <p className="text-4xl">Episodes: </p>

        <ul>
          {data.character.episode?.map((ep: any) => (
            <li key={ep.id}>
              <Link
                href={`episode?id=${ep.id}`}
                className="text-4xl hover:text-cyan-600"
              >
                {ep.episode} <span className="text-cyan-300">{ep.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
};

export default CharacterInfo;
