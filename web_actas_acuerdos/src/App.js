import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./Screens/LoginPage";
import MainPage from "./Screens/MainPage";
import AgregarPage from "./Screens/AgregarPage";
import ModificarPage from "./Screens/ModificarPage";
import VerActaPage from "./Screens/VerActaPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/MainPage" element={<MainPage/>}/>
        <Route path="/AgregarActa" element={<AgregarPage/>}/>
        <Route path="/ModificarActa" element={<ModificarPage/>}/>
        <Route path="/VerDetalle" element={<VerActaPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;