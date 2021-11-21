import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavBarElements';

const NavBar = () => {
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
};

export default NavBar;
