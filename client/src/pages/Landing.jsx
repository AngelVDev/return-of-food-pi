import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
const Landing = () => {
  return (
    <div className="landingBg">
      <div className="landingTextDiv">
        <h1 style={{ fontWeight: "bold", color: "white" }}>
          ¡Tonio's Kitchen!
        </h1>
        <h3 style={{ fontWeight: "lighter", backgroundColor: "#ffcd39" }}>
          Gourmet and health for your home
        </h3>
      </div>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/home"
      >
        <button className="landingBtn">¡Andiamo!</button>
      </Link>
      {/* <img className="Tonio" alt="tonioismissing"></img> */}
    </div>
  );
};

export default Landing;
