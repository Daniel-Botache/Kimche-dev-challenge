import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import NavBar from "../components/NavBar/NavBar";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const charactersPerPage = 20; // Cantidad de personajes por página

  const ALL_CHARACTERS = gql`
  query {
    characters(page: ${currentPage}) {
      info {
        count,
        pages
      }
      results {
        name,
        image
      }
    }
  }
  `;
  console.log(allCharacters);
  const { loading, data } = useQuery(ALL_CHARACTERS, {
    variables: { page: currentPage, perPage: charactersPerPage },
  });

  useEffect(() => {
    if (data) {
      // Concatena los nuevos resultados con los existentes
      const totalPages = data.characters.info.pages;
      setTotalPages(totalPages);
      console.log(totalPages);
      const characters = data.characters.results;
      setAllCharacters(characters);
    }
  }, [data]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <NavBar />
      <Cards characters={allCharacters} />
      {totalPages === 1 ? (
        <></>
      ) : (
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ˂ Prev
          </button>
          <span>
            <span
              style={{ fontWeight: "bold", fontFamily: "'Inter', sans-serif'" }}
            >
              {currentPage}
            </span>
            <span> to </span>
            <span
              style={{ fontWeight: "bold", fontFamily: "'Inter', sans-serif'" }}
            >
              {totalPages}
            </span>
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ˃
          </button>
        </div>
      )}
    </div>
  );
}
