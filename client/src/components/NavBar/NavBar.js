import React, {useEffect, useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavBarElements';

const NavBar = () => {

    const [logged_in, setLogged_in] = useState({});

    useEffect(() => {

        setInterval(() => {
            const logIn = sessionStorage.getItem("logged-in");
            setLogged_in(logIn);
        });
    });

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
                        <NavBtnLink to="/viewAccount">View Account</NavBtnLink>
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