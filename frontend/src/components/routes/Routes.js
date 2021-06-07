import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Search from '../search/Search'
import NavBar from '../nav/NavBar';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import UserContext from "./UserContext";
import ProtectedRoute from './ProtectedRoute';
import Profile from '../auth/Profile';
import ChefApi from '../api/api';
import jwt from 'jsonwebtoken';

const Routes = () => {

    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const SignUp = async formData => {
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

    const editUser = async (currentUser, formData) => {
        try {
            const user = await ChefApi.editUser(currentUser, formData);
            return {success: true, user}
        }
        catch (err) {
            return {success: false, errors: err}
        }
    }

    const LogOut = () => {
        setCurrentUser(null)
        setToken(null)
        localStorage.removeItem('token');
    }

    useEffect(() => {
        async function getCurrentUser() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    ChefApi.token = token;
                    setCurrentUser(username)
                    const userInfo = await ChefApi.getCurrentUser(username)
                    setUserInfo(userInfo)
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
                        <Search />
                    </Route>
                    <Route exact path="/signup">
                        <Signup SignUp = {SignUp}/>
                    </Route>
                    <Route exact path="/login">
                        <Login LogIn= {LogIn} />
                    </Route>
                    <ProtectedRoute exact path="/profile">
                        <Profile setUserInfo={setUserInfo} editUser={editUser}/>
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