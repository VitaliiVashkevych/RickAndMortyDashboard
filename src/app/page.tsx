"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { flavors } from "./ui/fonts";

import "@/app/globals.css";
import { Skeleton } from "./ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";

const HomePage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const getCharactersGraph = gql`
  query {
    characters(page: ${currentPage}) {
      results {
        id
        name
        image
      }
    }
  }
`;
  const { data, loading, error } = useQuery(getCharactersGraph);

  const handlePage = (e: any) => {
    e.preventDefault();
    const pageNumber = e.target.innerText;
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    window.location.href = `${pathname}?${params.toString()}`;
    return `${pathname}?${params.toString()}`;
  };

  // if (loading) return <Skeleton />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main className="flex flex-col items-center">
      <h1 className={`${flavors.className} text-6xl mt-20 mb-16`}>
        Rick and Morty Characters
      </h1>

      <div className="bg-white mb-12">
        <Pagination
          count={42}
          defaultPage={1}
          page={currentPage}
          siblingCount={2}
          color="primary"
          onChange={handlePage}
          hidePrevButton
          hideNextButton
        />
      </div>

      <ul className="grid md:grid-cols-3 gap-x-20 gap-y-12">
        {loading && <Skeleton />}
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
