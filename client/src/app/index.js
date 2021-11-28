import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import {Home, About, Register, CreatePost, Login} from "../pages";

function App() {
    return (
        <Router>
            <NavBar logged_in = {sessionStorage.getItem("logged-in") }/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/createPost" element={<CreatePost/>}/>
            </Routes>
        </Router>
    );
}

export default App;