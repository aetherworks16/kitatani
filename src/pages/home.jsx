import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const buttons = ["Page1", "Page2", "Page3"];

  return (
    <div>
      <h1>Home</h1>
      {buttons.map((button) => (
        <Link to={`/detail/${button}`} key={button}>
          <button>{button}</button>
        </Link>
      ))}
    </div>
  );
}

export default Home;
