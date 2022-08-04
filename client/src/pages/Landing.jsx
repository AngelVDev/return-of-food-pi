import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
const Landing = () => {
  return (
    <div className="landingBg">
      <div className="landingTextDiv">
        <h1 style={{ fontWeight: "bold" }}>¡Tonio's Kitchen!</h1>
        <h3 style={{ fontWeight: "lighter" }}>Gourmet and health at home</h3>
      </div>
      <button className="landingBtn">
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/home"
        >
          ¡Andiamo!
        </Link>
      </button>
    </div>
  );
};

export default Landing;
