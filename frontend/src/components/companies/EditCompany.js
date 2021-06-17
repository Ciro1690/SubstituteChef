import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core';
import { editCompany } from '../utilities/utility';

const EditCompany = ({ company }) => {
    const { id, name, address, url } = company
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState([]);
    
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
                        color="primary">Edit Company</Button>                    <div>
                        {errors.length ?
                            <p>{errors}</p>
                            : null }
                    </div>
                </form>
            </div>
        }
        </div>
    )
}

export default EditCompany;