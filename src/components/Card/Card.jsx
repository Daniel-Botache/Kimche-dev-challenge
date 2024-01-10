import React from "react";

export default function Card({ name, img }) {
  return (
    <div>
      <img src={img} alt="character" />
      <h2>Name: {name}</h2>
      {/*   <h3>Gender</h3>
      <h3>Origin</h3>
      <h3>Status</h3>
      <h3>Species</h3>
      <h3>Type</h3>
      <h3>Location</h3>
      <h3>Dimension</h3> */}
    </div>
  );
}
