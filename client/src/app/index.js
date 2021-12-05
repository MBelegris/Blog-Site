import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import {Home, About, Register, CreatePost, Login, Account, UpdateUser} from "../pages";

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/createPost" element={<CreatePost/>}/>
                <Route path="/viewAccount" element={<Account/>}/>
                <Route path="/updateUser" element={<UpdateUser/>}/>
            </Routes>
        </Router>
    );
}

export default App;