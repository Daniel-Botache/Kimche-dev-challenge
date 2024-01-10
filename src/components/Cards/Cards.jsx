import React from "react";
import Card from "../Card/Card";

export default function Cards({ data }) {
  const characters = data.characters.results;
  console.log();
  return (
    <div>
      {characters.map(({ name, image }) => (
        <Card key={name} name={name} img={image} />
      ))}
    </div>
  );
}
