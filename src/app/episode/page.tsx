"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css";

export const EpisodePage = () => {
  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id") as string;
  const getEpisode = gql`
    query {
      episode(id: ${paramsId}) {
        name
        air_date
        episode
        characters {
          id
          name
        }
      }
    }`;
  const { data, loading, error } = useQuery(getEpisode);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center m-5 gap-y-8">
      <Link href="/">
        <button className="bg-gray-700 p-2 rounded-xl text-xl">
          Back to main page
        </button>
      </Link>
      <h1 className="self-center text-6xl text-red-200">Episode's page</h1>
      <p className="text-6xl">
        Name: <span className="text-cyan-300">{data.episode.name}</span>
      </p>
      <p className="text-6xl">
        Air date: <span className="text-cyan-300">{data.episode.air_date}</span>
      </p>
      <p className="text-6xl">
        Episode: <span className="text-cyan-300">{data.episode.episode}</span>
      </p>
      <p className="text-4xl">Characters:</p>
      <ul>
        {data.episode.characters.map((char: any) => (
          <li key={char.id}>
            <Link href={`character?id=${char.id}`} className="text-4xl hover:text-cyan-600 text-cyan-300">{char.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodePage;
