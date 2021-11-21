import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import {Home, About, Register} from "../pages";

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
    );
}

export default App;