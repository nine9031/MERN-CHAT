import { BrowserRouter } from "react-router";
import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Router />
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
