import React, { useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({
  onSearch,
  statuses,
  genders,
  species,
  onStatusChange,
  onGenderChange,
  onSpecieChange,
}) {
  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);

  const toggleFilterBar = () => {
    setIsFilterBarVisible(!isFilterBarVisible);
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <div>
        <button onClick={toggleFilterBar}>
          {isFilterBarVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
      </div>
      {isFilterBarVisible && (
        <FilterBar
          statuses={statuses}
          genders={genders}
          species={species}
          onStatusChange={onStatusChange}
          onGenderChange={onGenderChange}
          onSpecieChange={onSpecieChange}
        />
      )}
    </div>
  );
}
