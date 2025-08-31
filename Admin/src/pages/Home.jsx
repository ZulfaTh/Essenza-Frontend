import React from "react";

const Home = () => {
  return (
    <div className="p-50 w-full">
      <h1 className="text-2xl text-center  md:text-3xl font-bold font-dancing animate-pulse text-purple-700">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
                Salon Essenza
              </span>{" "}
              Panel 
            </h1>
      <p className="text-gray-700 text-xl text-center  mt-3">
        You are now logged in. Please use the sidebar to navigate through the system.
      </p>
    </div>
  );
};

export default Home;
