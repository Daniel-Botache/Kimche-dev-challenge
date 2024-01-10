import React, { useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

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
    <div className={style.principalContainer}>
      <div className={style.searchCointainer}>
        <div className={style.tittleContainer}>
          <div className={style.title}>
            Rick
            <span className={style.spanTitle}>and</span>
            Morty
            <span className={style.spanTitle}>APP</span>
          </div>
          <div className={`${style.title} ${style.middle}`}>
            Rick
            <span className={style.spanTitle}>and</span>
            Morty
            <span className={style.spanTitle}>APP</span>
          </div>
          <div className={`${style.title} ${style.bottom}`}>
            Rick
            <span className={style.spanTitle}>and</span>
            Morty
            <span className={style.spanTitle}>APP</span>
          </div>
        </div>
        <SearchBar onSearch={onSearch} />
        <button onClick={toggleFilterBar}>
          {isFilterBarVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
      </div>
      <div className={style.filterContainer}>
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
    </div>
  );
}
