import React from "react";
import Cards from "../components/Cards/Cards";
import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const getAllCharacters = () => {};

  return (
    <div>
      <NavBar />
      <Cards />
    </div>
  );
}
