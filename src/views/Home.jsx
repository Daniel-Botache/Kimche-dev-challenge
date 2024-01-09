import React, { useEffect } from "react";
import Cards from "../components/Cards/Cards";
import NavBar from "../components/NavBar/NavBar";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const ALL_CHARACTERS = gql`
    query {
      characters {
        results {
          name
          image
        }
      }
    }
  `;

  const { error, loading, data } = useQuery(ALL_CHARACTERS);

  useEffect(() => {
    // Puedes manejar los resultados, errores, etc. aquí
    if (data) {
      console.log(data);
      // Puedes establecer el estado de tus personajes aquí
    }
    if (error) {
      console.error(error);
    }
  }, [data, error]);

  return (
    <div>
      <NavBar />
      <Cards />
    </div>
  );
}
