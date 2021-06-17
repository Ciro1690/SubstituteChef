const db = require("../db");
const axios = require('axios');
const { NotFoundError } = require("../expressError");
require('dotenv').config()

class Company {

    static async register({name, url, address, username}) {
        let coordinates = [];
            await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params:{
                        address: address,
                        key: process.env.REACT_APP_API_KEY
                    }
                })
                    .then(function(response){
                        const location = response.data.results[0].geometry.location
                        coordinates.push(location.lat)
                        coordinates.push(location.lng)
                    })
                    .catch(function(error) {
                        console.log(error)
                    }) 

            const result = await db.query(
                `INSERT INTO companies
                    (name,
                    url,
                    address,
                    lat,
                    lng,
                    username)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, name, url, address, lat, lng, username`,
                [
                name,
                url,
                address,
                coordinates[0],
                coordinates[1],
                username
                ]                
            )
            return result.rows[0];
        }

    static async get(username) {
        const result = await db.query(
            `SELECT 
            id,
            name,
            url,
            address,
            lat,
            lng,
            username
            FROM companies
            WHERE username = $1`,
            [username]
        );
        let companies = result.rows
        if (!companies) {
            throw new NotFoundError(`No username ${username}`, 400)
        }
        return companies;
    }

    static async getById(id) {
        const result = await db.query(
            `SELECT 
            id,
            name,
            url,
            address,
            lat,
            lng,
            username
            FROM companies
            WHERE id = $1`,
            [id]
        );

        let company = result.rows[0]
        if (!company) {
            throw new NotFoundError(`No id ${id}`, 400)
        }
        return company;
    }

    static async findAll() {
    const result = await db.query(
            `SELECT 
            id,
            name,
            url,
            address,
            lat,
            lng,
            username
            FROM companies
           ORDER BY id`,
    );

    return result.rows
    }

    static async update(id, data) {
            const result = await db.query(
                `UPDATE companies
                 SET name=$1,
                    url=$2,
                    address=$3
                 WHERE id = $4
                 RETURNING id, name, url, address, username`,
                [
                data.name,
                data.url,
                data.address,
                id
                ]                
            )
            return result.rows[0];
        }

        static async remove(id) {
            const result = await db.query(
                `DELETE
                 FROM companies
                 WHERE id = $1
                 RETURNING id`,
                [id]                
            );
            const company = result.rows[0];

            if (!company) throw new NotFoundError(`No id ${id}`);
            return company;
        }
}

module.exports = Company;