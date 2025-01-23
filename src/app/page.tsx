"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "@/redux/reducers";

const getCharacters = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return data;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: any) => state.characters.characters);

  const loadData = async () => {
    const { results } = await getCharacters();
    if (results) {
      dispatch(setCharacters(results));
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map((char: any) => (
          <li key={char.id}>
            <img src={char.image} alt={char.name} />
            <h2>{char.name}</h2>
            <p>
              {char.status} - {char.species}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
