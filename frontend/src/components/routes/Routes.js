import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompanyList from '../home/CompanyList';
import NavBar from '../nav/NavBar';
import Login from '../auth/Login';
import UserSignup from '../auth/UserSignup';
import CompanySignup from '../companies/CompanySignup';
import UserContext from "./UserContext";
import ProtectedRoute from './ProtectedRoute';
import UserProfile from '../user/UserProfile';
import CompaniesProfile from '../companies/CompaniesProfile';
import CompaniesApplications from '../companies/CompaniesApplications';
import UserApplications from '../user/UserApplications';
import JobSignup from '../jobs/JobSignup';
import ChefApi from '../api/api';
import Footer from '../footer/Footer';
import logo from '../../assets/sub chef LOGO/Sub.Chef.LOGO1-01.jpg';
import jwt from 'jsonwebtoken';

const Routes = () => {

    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const registerUser = async formData => {
        try {
            const token = await ChefApi.Signup(formData)
            setCurrentUser(formData.username)
            setToken(token)
            localStorage.setItem('token', token);
            return {success: true}
        } catch (err) {
            return {success: false, errors: err}
        }
    }

    const LogIn = async formData => {
        try {
            const token = await ChefApi.Login(formData)
            setCurrentUser(formData.username)
            setToken(token)
            localStorage.setItem('token', token);
            return {success: true}
        } catch (err) {
            return {success: false, errors: err}
        }
    }

    const LogOut = () => {
        setCurrentUser(null)
        setToken(null)
        localStorage.removeItem('token');
    }

    useEffect(function getUserInfo() {
        async function getCurrentUser() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    ChefApi.token = token;
                    const user= await ChefApi.getUserInfo(username);
                    setCurrentUser(username)
                    setUserInfo(user)
                }
                catch (e) {
                    setCurrentUser(null)
                }
            }
        } getCurrentUser()
    }, [token]) 

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currentUser, token, userInfo, setUserInfo }}>
                <NavBar LogOut={LogOut}/>
                <img className="logo2" src={logo} alt="logo"/><br></br>
                <Switch>
                    <Route exact path="/">
                        <CompanyList />
                    </Route>
                    <Route exact path="/signup">
                        <UserSignup registerUser={registerUser}/>
                    </Route>
                    <Route exact path="/login">
                        <Login LogIn= {LogIn} />
                    </Route>
                    <Route exact path="/userapplications">
                        <UserApplications currentUser={currentUser} />
                    </Route>
                    <ProtectedRoute exact path="/userprofile">
                        <UserProfile setUserInfo={setUserInfo} LogOut={LogOut}/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/companyprofile">
                        <CompaniesProfile currentUser={currentUser}/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/companiesapplications">
                        <CompaniesApplications currentUser={currentUser}/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/job">
                        <JobSignup  currentUser={currentUser} />
                    </ProtectedRoute> 
                    <ProtectedRoute exact path="/company">
                        <CompanySignup currentUser={currentUser}/>
                    </ProtectedRoute>
                    <Route>
                        <p>I can't seem to find what you want</p>
                    </Route>
                </Switch>
                <Footer/>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Routes;