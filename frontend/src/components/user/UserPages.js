import React from 'react';
import { Button } from '@material-ui/core';

const UserPages = () => {
    return (
        <div>
            <h1>User Resources</h1>
            <a href="/userprofile"><Button color="primary">Profile</Button></a><br></br>
            <a href="/userapplications"><Button color="secondary">Applications</Button></a>
        </div>
    )
}

export default UserPages;