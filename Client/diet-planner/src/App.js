import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Nav from "./components/Nav";

import Home from "./components/Home";
import Side from "./components/Side";
import DietHome from "./components/Favourites/DietHome";
import Analytics from "./components/Analytics";
import Router from "./components/Routes/Router";
function App() {
  return (
    <div>
      <Nav/>
      <Router />
    </div>
  );
}

export default App;
