import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth.js";
import Menu from "./components/Menu.js";
import AddEquipment from './components/AddEquipment.js';
import AddReport from './components/AddReport.js';

function App() {
  return (
    <Router>
      {}
      <Routes>
        {}
        <Route path="/" element={<Auth />} />
        {}
        <Route path="/Menu" element={<Menu />} />
        {}
        <Route path="/AddEquipment" element={<AddEquipment />} />
        {}
        <Route path="/AddReport" element={<AddReport />} />
      </Routes>
    </Router>
  );
};

export default App;
