import React from 'react';
import logo from '../../assets/sub chef LOGO/Sub.Chef.LOGO1-01.jpg';
import { Button } from '@material-ui/core';

const UserPages = () => {
    return (
        <div>
            <img className="logo2" src={logo} alt="logo"/><br></br>
            <h1>User Resources</h1>
            <a href="/userprofile"><Button color="primary">Profile</Button></a><br></br>
            <a href="/userapplications"><Button color="secondary">Applications</Button></a>
        </div>
    )
}

export default UserPages;