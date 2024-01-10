import React from "react";
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
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <div>
        <h6>Filtros</h6>
      </div>
      <FilterBar
        statuses={statuses}
        genders={genders}
        species={species}
        onStatusChange={onStatusChange}
        onGenderChange={onGenderChange}
        onSpecieChange={onSpecieChange}
      />
    </div>
  );
}
