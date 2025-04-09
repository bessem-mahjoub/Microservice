import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LayoutN from './components/LayoutN';
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About"
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
    <Routes>
   
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="/Login" element={<LayoutN><Login /></LayoutN>} />
      <Route path="/Register" element={<LayoutN> <Register /> </LayoutN>} />
      <Route path="/About" element={<LayoutN> <About /> </LayoutN>} />

    
     
    </Routes>
    </AuthProvider>
  </BrowserRouter>

  );
}

export default App;
