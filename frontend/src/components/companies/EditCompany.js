import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core';
import ChefApi from '../api/api';
import { useHistory } from 'react-router';
import { editCompany } from '../utilities/utility';

const EditCompany = ({ company }) => {
    const { id, name, address, url } = company
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState([]);
    let history = useHistory();
    
    useEffect(() => {
        if (company !== null) {
            setFormData({
                name: name,
                url: url,
                address: address,
            });
        }
    }, [company, name, url, address])

    
    const handleSubmit = async e => {
        e.preventDefault();
        const editData = {
            "name": formData.name,
            "address": formData.address,
            "url": formData.url,
        };
        await editCompany(id, editData)
            .then((res) => {
                if (res.success) {
                    const NEW_STATE = {
                        "name": res.company.name,
                        "address": res.company.address,
                        "url": res.company.url
                    }
                    setFormData(data => ({
                        ...data,
                        ...NEW_STATE
                    }))
                    alert("Updated company info")
                }
                else {
                    setErrors(res.errors);
                }
         })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const deleteCompany = async () => {
        try {
            const company = await ChefApi.deleteCompany(id)
            console.log(company)
            alert(`Deleted company. Sorry to see you go!`)
            history.push('/')
        }
        catch (err) {
            console.log(err)
            setErrors(`Unable to delete company`)
        }
    }

    return (
        <div className="col">
        {formData === null  ? <p>Loading...</p> :
            <div>
                <h3>{name}</h3>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}/>
                    <br></br>
                    <TextField
                        label="URL"
                        type="text"
                        name="url"
                        onChange={handleChange}
                        value={formData.url}/>
                        <br></br>
                    <TextField
                        label="Address"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}/>
                        <br></br><br></br>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="secondary">
                        Edit Company
                    </Button>                    
                </form>
                <br></br>
                <Button 
                    onClick={deleteCompany}
                    variant="contained" 
                    color="primary">
                    Delete Company
                </Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                        : null }
                </div>
            </div>
        }
        </div>
    )
}

export default EditCompany;