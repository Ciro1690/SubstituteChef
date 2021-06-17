import React from "react";
import logo from "../../assets/sub chef LOGO/Artboard 2.png";
import {Link} from "react-router-dom";
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import '../../styles/Navbar.css';

const NavBar = ({LogOut}) => {

    const token = localStorage.getItem('token');

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink tag={Link} to="/" className="navbar-brand">
            <img className="logo" src={logo} alt="logo"/>
        </NavLink>
    {token ? 
        <Nav navbar>
            <NavItem>
                <NavLink tag={Link} to="/company">Register a Company</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/job">Post a Job</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/user">User</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/companies">Company</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/" onClick={LogOut}>Logout</NavLink>
            </NavItem>
        </Nav> :
        <Nav navbar>
            <NavItem>
                <NavLink tag={Link} to="/search">Search for Jobs</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/login">Login</NavLink>
            </NavItem>            
            <NavItem>
                <NavLink tag={Link} to="/signup">Signup</NavLink>
            </NavItem>
        </Nav>
        }
    </Navbar>
    )
}

export default NavBar;