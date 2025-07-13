import React, { useState } from "react";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Profile from "./pages/userProfile";
import Header from "./components/header";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "auth":
        return <Auth setCurrentPage={setCurrentPage} />;
      case "profile":
        return <Profile setCurrentPage={setCurrentPage} />;
      case "home":
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Header setCurrentPage={setCurrentPage} isMenuOpen={false} setIsMenuOpen={() => {}} />
      {renderPage()}
    </>
  );
};

export default App;
