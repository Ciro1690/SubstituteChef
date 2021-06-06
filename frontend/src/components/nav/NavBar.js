import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import UserContext from '../routes/UserContext';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import '../../styles/Navbar.css';

const NavBar = ({LogOut}) => {

    const {currentUser} = useContext(UserContext);
    const token = localStorage.getItem('token');
    console.log(token)

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink tag={Link} to="/" className="navbar-brand">
            <img src={logo} alt="logo"/>
        </NavLink>
    {token ? 
        <Nav navbar>
            <NavItem>
                <NavLink tag={Link} to="/search">Search for Jobs</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/business">Register as a Business</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/" onClick={LogOut}>Logout {currentUser}</NavLink>
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