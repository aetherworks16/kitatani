import React from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { buttonName } = useParams();

  // Misalnya, Anda memiliki data sesuai nama button
  const data = {
    Page1: "Ini adalah data untuk Page1",
    Page2: "Ini adalah data untuk Page2",
    Page3: "Ini adalah data untuk Page3",
  };

  return (
    <div>
      <h1>Detail Page: {buttonName}</h1>
      <p>{data[buttonName] || "Data tidak ditemukan"}</p>
    </div>
  );
}

export default Detail;
