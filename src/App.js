import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Start from "./pages/Start";
import Simulator from "./pages/Simulator";
import background from "./background.png";
import About from "./pages/About";
import How from "./pages/How";
import ModelLoader from "./model/ModelLoader";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  return (
    <div className="App">
      <img src={background} id="background"></img>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Start />}></Route>
          <Route path="sim" element={<Simulator />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="how" element={<How />}></Route>
          <Route path="test" element={<ModelLoader />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
