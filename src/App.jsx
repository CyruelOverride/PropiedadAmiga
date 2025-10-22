import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropiedadAmiga from "./components/propiedadAmiga";
import "./App.css";

function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7f9fc",
          padding: "1rem",
        }}
      >
        <Routes>
          <Route path="/:id" element={<PropiedadAmiga />} />

          <Route
            path="/"
            element={
              <div
                style={{
                  textAlign: "center",
                  marginTop: "4rem",
                  color: "#2F4F6F",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <h2>Propiedad Amiga</h2>
                <p>Ingresá una URL con el ID de la propiedad.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
