import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Views/Home'
import Dashboard from './Views/Dashboard'
import Login from './Views/Login'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Error404 from "./Views/Error404";


function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<Error404 />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
