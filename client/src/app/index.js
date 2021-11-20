import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import {home, about, signUp} from "../pages";

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" exact component={home}/>
                <Route path="/about" component={about}/>
                <Route path="/sign-up" component={signUp}/>
            </Routes>
        </Router>
    );
}

export default App;