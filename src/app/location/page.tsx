"use client";

import { useSearchParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import "@/app/globals.css";
import Link from "next/link";

const LocationPage = () => {
  const locationParams = useSearchParams();

  // POSSIBLY "NULL", CAUSES ERROR
  let paramsId = locationParams.get("id") as string;
  
  if (paramsId === 'null') {
    paramsId = '0'
  }

  const getLocation = gql`
    query {
      location(id: ${paramsId}) {
        name
        type
        dimension
        residents {
          id
          name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(getLocation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center m-5 gap-y-8">
      <Link href="/">
        <button className="bg-gray-700 p-2 rounded-xl text-xl">
          Back to main page
        </button>
      </Link>
      <h1 className="self-center text-6xl text-red-200">Location's page</h1>

      <p className="text-6xl">
        Name: <span className="text-cyan-300">{data.location.name}</span>
      </p>
      <p className="text-6xl">
        Type: <span className="text-cyan-300">{data.location.type}</span>
      </p>
      <p className="text-6xl">
        Dimension:{" "}
        <span className="text-cyan-300">{data.location.dimension}</span>
      </p>

      <p className="text-6xl">Residents:</p>
      <ul>
        {data.location.residents?.map((res: any) => (
          <li key={res.id}>
            <Link
              href={`character?id=${res.id}`}
              className="text-4xl hover:text-cyan-600 text-cyan-300"
            >
              {res.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationPage;
