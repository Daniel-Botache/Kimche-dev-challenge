import React from "react";
import Card from "../Card/Card";

export default function Cards({ characters }) {
  /* const characters = allCharacters.characters.results; */

  console.log(characters);
  return (
    <div>
      {characters.map(({ name, image }) => (
        <Card key={name} name={name} img={image} />
      ))}
    </div>
  );
}
