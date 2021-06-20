import React, { useState, useContext, useEffect } from 'react';
import { editUser } from '../utilities/utility';
import UserContext from '../routes/UserContext';
import ChefApi from '../api/api';
import { useHistory } from 'react-router';
import {
    TextField,
    Button
} from '@material-ui/core';

const UserProfile = ({ setUserInfo, LogOut }) => {

    const { userInfo } = useContext(UserContext);
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState([]);
    let history = useHistory();
    
    useEffect(() => {
        if (userInfo !== null) {
            setFormData({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email
            });
        }
    }, [userInfo])
    
    const handleSubmit = async e => {
    e.preventDefault();
    const editData = {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email
    };
    await editUser(userInfo.username, editData)
        .then((res) => {
            if (res.success) {
                const NEW_STATE = {
                    "firstName": res.user.firstName,
                    "lastName": res.user.lastName,
                    "email": res.user.email
                }
                setUserInfo(data => ({
                    ...data,
                    ...NEW_STATE
                }))
                alert("Updated user info")
            }
            else {
                setErrors(res.errors);
            }
        })
    }

    const deleteUser = async () => {
        try {
            const user = await ChefApi.deleteUser(userInfo.username)
            console.log(user)
            alert(`Deleted ${user.deleted}. Sorry to see you go!`)
            LogOut()
            history.push('/')
        }
        catch (err) {
            console.log(err)
            setErrors(`Unable to delete ${userInfo.username}`)
        }
    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div>
        {formData === null  ? <p>Loading...</p> :
            <div>
                <a href="/userapplications"><Button>View Open Applications</Button></a>
                <h1>Edit User Profile</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}/>
                        <br></br>
                    <TextField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}/>
                        <br></br>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}/>
                        <br></br><br></br>
                    <div>
                        {errors.length ?
                            <p>{errors}</p>
                            : null }
                    </div>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="secondary">Edit User</Button>
                </form>
                <br></br>
                <Button 
                    onClick={deleteUser}
                    variant="contained" 
                    color="primary">Delete User
                </Button>
            </div>
        }
        </div>
    )
}

export default UserProfile;