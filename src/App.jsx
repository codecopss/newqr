import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ViewDetails from "./components/ViewDetails";
import EditProfile from "./components/EditProfile";
import AdminPanel from "./components/AdminPanel";
import Landing from './components/Landing';
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/view/:userId" element={<ViewDetails />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
