import React from "react";
import Header from "./components/Header";
import CategoryPage from "./pages/client/CategoryPage";
import "./styles/tailwind.css";

function App() {
  return (
    <div className="App">
      <Header />
      <CategoryPage />
    </div>
  );
}

export default App;
