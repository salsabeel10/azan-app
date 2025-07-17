import React from "react";
import NavBar from "../components/NavBar";
import ListOfTimes from "../components/ListOfTimes";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      {/* Top NavBar */}
      <NavBar />

      {/* Main Content (List of Times) - Fills remaining height */}
      <main className="flex-grow flex items-center justify-center">
        <ListOfTimes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
