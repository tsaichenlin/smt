import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Simulator from "./pages/Simulator";

function App() {
  return (
    <div className="App" id="background">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Start />}></Route>
          <Route path="simulator" element={<Simulator />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
