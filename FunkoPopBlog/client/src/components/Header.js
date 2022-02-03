/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { logout, _getUserData } from '../modules/authManager';




export default function Header({ isLoggedIn }) {

    const [isUserActive, setIsUserActive] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            _getUserData().then(res => setIsUserActive(res.isActive))
        }
    }, [isLoggedIn])


    return (

        <div>

            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">FunkoPop!</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {isLoggedIn &&
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/Products">Products</NavLink>
                        </NavItem>
                    }
                    {isLoggedIn &&
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/BlogPost">Forum</NavLink>
                        </NavItem>
                    }
                    {isLoggedIn &&
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/MyCollection">My Collection</NavLink>
                        </NavItem>
                    }
                </Nav>

                <Nav navbar>
                    {isLoggedIn &&
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/category">EventualSearchBar</NavLink>
                        </NavItem>
                    }
                    {isLoggedIn &&
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/MyProfile">My Profile</NavLink>
                        </NavItem>
                    }
                    {isLoggedIn &&
                        <>
                            <NavItem>
                                <a aria-current="page" className="nav-link"
                                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                            </NavItem>
                        </>
                    }
                    {!isLoggedIn &&
                        <>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                            </NavItem>
                        </>
                    }
                </Nav>
            </Navbar>
        </div >

    );

}