import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "start",
        }}>
        <h1 style={{ fontSize: "5rem", margin: 0 }}>LOKMAN</h1>
        <h2 style={{ fontSize: "3rem", margin: "10px 0 30px" }}>
          JAVASCRIPT DEVELOPER
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/item">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100px",
                backgroundColor: "#007BFF",
              }}>
              Item
            </button>
          </Link>
          <Link to="/anime">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100px",
                backgroundColor: "#28A745",
              }}>
              Anime
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
