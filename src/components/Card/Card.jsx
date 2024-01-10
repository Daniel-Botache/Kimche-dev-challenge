import React, { useState } from "react";

export default function Card({ name, img, gender, status, species, origin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img src={img} alt="character" onClick={openModal} />
      <h2>Name: {name}</h2>

      {isModalOpen && (
        <div className="modal">
          {/* Contenido del modal */}
          <button onClick={closeModal}>Close</button>
          <h3>Gender: {gender}</h3>
          <h3>Origin: {origin.name}</h3>
          <h3>Status: {status}</h3>
          <h3>Species: {species}</h3>
        </div>
      )}
    </div>
  );
}
