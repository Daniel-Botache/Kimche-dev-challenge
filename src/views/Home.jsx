import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import NavBar from "../components/NavBar/NavBar";
import { gql, useQuery, useApolloClient } from "@apollo/client";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPage, setCharactersPage] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const charactersPerPage = 20; // Cantidad de personajes por página
  const [searchTerm, setSearchTerm] = useState("");
  const [species, setSpecies] = useState([]);
  const [genders, setGenders] = useState([]);
  const [status, setStatus] = useState("");
  const [specie, setSpecie] = useState("");
  const [gender, setGender] = useState("");
  const [statuses, setStatuses] = useState([]);
  const client = useApolloClient(); // Obtener el cliente Apollo
  const handleChangeSpecie = (event) => {
    setSpecie(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const GET_CHARACTERS = gql`
    query GetCharacters($page: Int!) {
      characters(page: $page) {
        info {
          count
          pages
        }
        results {
          name
          image
          id
          species
          gender
          status
          origin {
            name
          }
        }
      }
    }
  `;

  const SEARCH_CHARACTERS = gql`
    query SearchCharacters(
      $page: Int
      $name: String
      $status: String
      $gender: String
      $species: String
    ) {
      characters(
        page: $page
        filter: {
          name: $name
          status: $status
          gender: $gender
          species: $species
        }
      ) {
        info {
          count
          pages
        }
        results {
          name
          image
          id
          status
          species
          gender
          origin {
            name
          }
        }
      }
    }
  `;

  const getAllCharacters = async (currentPage, allCharacters = []) => {
    const { data } = await client.query({
      query: GET_CHARACTERS,
      variables: { page: currentPage },
    });

    const characters = data.characters.results;
    allCharacters = allCharacters.concat(characters);

    const nextPage = currentPage + 1;

    if (nextPage <= data.characters.info.pages) {
      return getAllCharacters(nextPage, allCharacters);
    } else {
      return allCharacters;
    }
  };

  const { loading, data } = useQuery(
    searchTerm ? SEARCH_CHARACTERS : GET_CHARACTERS,
    {
      variables: {
        page: currentPage,
        name: searchTerm,
        perPage: charactersPerPage,
        species: specie,
        gender: gender,
        status: status,
      },
    }
  );

  useEffect(() => {
    handleSearch(searchTerm);
    if (data) {
      const totalPages = data.characters.info.pages;
      setTotalPages(totalPages);
      const characters = data.characters.results;
      setCharactersPage(characters);
      console.log(charactersPage);
      console.log(gender);
    }
  }, [data]);

  // se realiza para poder filtrar todas las especies, estados y generos de todos los personajes
  useEffect(() => {
    const fetchAllCharacters = async () => {
      const allCharactersData = await getAllCharacters(1);
      console.log(allCharactersData);
      // Aquí puedes manejar las especies obtenidas según tus necesidades
      const uniqueSpecies = allCharactersData.reduce((unique, character) => {
        if (!unique.includes(character.species)) {
          return [...unique, character.species];
        }
        return unique;
      }, []);
      const uniqueGender = allCharactersData.reduce((unique, character) => {
        if (!unique.includes(character.gender)) {
          return [...unique, character.gender];
        }
        return unique;
      }, []);
      const uniqueStatus = allCharactersData.reduce((unique, character) => {
        if (!unique.includes(character.status)) {
          return [...unique, character.status];
        }
        return unique;
      }, []);
      setStatuses(uniqueStatus);
      setGenders(uniqueGender);
      setSpecies(uniqueSpecies);
      console.log(uniqueSpecies); // Log después de establecer el estado
      console.log(uniqueGender);
      console.log(setStatuses);
    };

    fetchAllCharacters();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Verifica si al menos uno de los filtros está activo
    if (searchTerm || specie || gender || status) {
      // Define el filtro
      const filter = {
        name: searchTerm,
        species: specie,
        gender: gender,
        status: status,
      };

      // Realiza la consulta con los filtros
      client
        .query({
          query: SEARCH_CHARACTERS,
          variables: {
            page: currentPage,
            ...filter,
            perPage: charactersPerPage,
          },
        })
        .then(({ data }) => {
          const totalPages = data.characters.info.pages;
          setTotalPages(totalPages);
          const characters = data.characters.results;
          setCharactersPage(characters);
        });
    } else {
      // Si no hay filtros, realiza una consulta general
      client
        .query({
          query: GET_CHARACTERS,
          variables: { page: currentPage },
        })
        .then(({ data }) => {
          const totalPages = data.characters.info.pages;
          setTotalPages(totalPages);
          const characters = data.characters.results;
          setCharactersPage(characters);
        });
    }
  };

  return (
    <div>
      <NavBar
        onSearch={handleSearch}
        statuses={statuses}
        genders={genders}
        species={species}
        onStatusChange={handleChangeStatus}
        onGenderChange={handleChangeGender}
        onSpecieChange={handleChangeSpecie}
      />
      <Cards characters={charactersPage} />
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
