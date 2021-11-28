import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavBarElements';

const NavBar = (logged_in) => {

    //const loggedIn = sessionStorage.getItem("logged-in");
    console.log(sessionStorage.getItem("logged-in"));
    if (logged_in === "True"){
        return (
            <div>
                <Nav>
                    <Bars />

                    <NavMenu>
                        <NavLink to="/" activestyle="true">
                            Home
                        </NavLink>
                        <NavLink to="/about" activestyle="true">
                            About
                        </NavLink>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/">View Account</NavBtnLink>
                    </NavBtn>
                </Nav>
            </div>
        );
    }

    else {
        return (
            <div>
                <Nav>
                    <Bars />

                    <NavMenu>
                        <NavLink to="/" activestyle="true">
                            Home
                        </NavLink>
                        <NavLink to="/about" activestyle="true">
                            About
                        </NavLink>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/register">Sign Up</NavBtnLink>
                    </NavBtn>
                </Nav>
            </div>
        );
    }
};

export default NavBar;
