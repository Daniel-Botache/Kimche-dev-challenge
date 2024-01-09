import React from "react";
import FilterBar from "../FilterBar/FilterBar";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <div>
      <SearchBar />
      <div>
        <h6>Filtros</h6>
      </div>
      <FilterBar />
    </div>
  );
}
