import React from "react";
import { useState } from "react";

export default function FilterBar({
  statuses,
  genders,
  species,
  onStatusChange,
  onGenderChange,
  onSpecieChange,
}) {
  return (
    <>
      <select name="" id="" onChange={onStatusChange}>
        <option value="">Status</option>
        {statuses.map((statuses, index) => (
          <option key={index + 1} value={statuses}>
            {statuses}
          </option>
        ))}
      </select>
      <select name="" id="" onChange={onGenderChange}>
        <option value="">Gender</option>
        {genders.map((genders, index) => (
          <option key={index + 1} value={genders}>
            {genders}
          </option>
        ))}
      </select>
      <select name="" id="" onChange={onSpecieChange}>
        <option value="">Species</option>
        {species.map((species, index) => (
          <option key={index + 1} value={species}>
            {species}
          </option>
        ))}
      </select>
      <button>Clean</button>
    </>
  );
}
