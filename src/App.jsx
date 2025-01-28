import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContextProvider } from "../src/context/myContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap, faClock } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faSliders,
  faMartiniGlass,
  faUtensils,
  faTicket,
  faStar,
  faXmark,
  faAngleRight,
  faAngleLeft,
  faArrowLeft,
  faUser,
  faLocationDot,
  faLayerGroup,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Home from "./pages/home";
import Form from "./pages/form";
import Header from "./components/layout/Header";
import SelectedLocation from "./pages/selectedLocation";
import Premium from "./pages/premium";

// Ajout des icônes à la librairie FontAwesome
library.add(
  faMap,
  faSliders,
  faMartiniGlass,
  faUtensils,
  faTicket,
  faStar,
  faInstagram,
  faXmark,
  faAngleRight,
  faAngleLeft,
  faArrowLeft,
  faUser,
  faLocationDot,
  faLayerGroup,
  faLock,
  faClock
);

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/premium" element={<Premium />} />
          <Route
            path="/selectedLocation/:idLocation"
            element={<SelectedLocation />}
          />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
