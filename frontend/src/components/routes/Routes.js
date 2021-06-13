import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import CompanyList from '../search/CompanyList';
import NavBar from '../nav/NavBar';
import Login from '../auth/Login';
import UserSignup from '../auth/UserSignup';
import CompanySignup from '../companies/CompanySignup';
import UserContext from "./UserContext";
import ProtectedRoute from './ProtectedRoute';
import Profile from '../auth/Profile';
import CompanyProfile from '../companies/CompanyProfile';
import Applications from '../jobs/Applications';
import JobSignup from '../jobs/JobSignup';
import ChefApi from '../api/api';
import jwt from 'jsonwebtoken';

const Routes = () => {

    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [companies, setCompanies] = useState(null);

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
                    const companies = await ChefApi.getCompaniesFromUsername(username);
                    setCurrentUser(username)
                    setUserInfo(user)
                    setCompanies(companies)
                }
                catch (e) {
                    console.log(e)
                    setCurrentUser(null)
                }
            }
        } getCurrentUser()
    }, [token]) 

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currentUser, token, userInfo, setUserInfo }}>
                <NavBar LogOut={LogOut}/>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/search">
                        <CompanyList />
                    </Route>
                    <Route exact path="/signup">
                        <UserSignup registerUser={registerUser}/>
                    </Route>
                    <Route exact path="/login">
                        <Login LogIn= {LogIn} />
                    </Route>
                    <Route exact path="/applications">
                        <Applications currentUser={currentUser} />
                    </Route>
                    <ProtectedRoute exact path="/profile">
                        <Profile companies={companies} setUserInfo={setUserInfo}/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/companyprofile">
                        <CompanyProfile companies={companies} />
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
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Routes;