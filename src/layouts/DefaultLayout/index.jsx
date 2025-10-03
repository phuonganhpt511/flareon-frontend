import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const DefaultLayout = () => {
  return (
    <div className="default-layout flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Nội dung động (CategoryPage, Home, About...) */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
