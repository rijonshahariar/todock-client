import { signOut } from "firebase/auth";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase.init";
import "./Header.css"

const Header = () => {
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };
    return (


        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="me-5">
                        <h3>Todock</h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            {user ? (
                                <>
                                    <button onClick={logout} className="btn signoutbtn">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink as={Link}
                                        className={({ isActive }) => (isActive ? "active-link" : "link")}
                                        to="login">
                                        Login
                                    </NavLink>
                                    <NavLink as={Link}
                                        className={({ isActive }) => (isActive ? "active-link" : "link")}
                                        to="register">
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
