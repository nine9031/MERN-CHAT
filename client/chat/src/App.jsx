import React from "react";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
