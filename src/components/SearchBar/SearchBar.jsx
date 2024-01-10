import React, { useState } from "react";

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input type="search" onChange={handleChange} />
      <button
        onClick={() => {
          props.onSearch(name);
        }}
      >
        Search
      </button>
    </div>
  );
}
