import React from "react";
import Card from "../Card/Card";

export default function Cards({ characters }) {
  /* const characters = allCharacters.characters.results; */

  console.log(characters);
  return (
    <div>
      {characters.map(
        ({ name, image, id, status, gender, species, origin }) => (
          <Card
            key={id}
            name={name}
            img={image}
            status={status}
            gender={gender}
            species={species}
            origin={origin}
          />
        )
      )}
    </div>
  );
}
