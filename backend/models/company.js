const db = require("../db");
const { NotFoundError } = require("../expressError");

class Company {

    static async register({name, url, address, username}) {
    
            const result = await db.query(
                `INSERT INTO companies
                    (name,
                    url,
                    address,
                    username)
                VALUES ($1, $2, $3, $4)
                RETURNING id, name, url, address, username`,
                [
                name,
                url,
                address,
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
            username
            FROM companies
            WHERE username = $1`,
            [username]
        );
        if (!result.rows) {
            throw new NotFoundError(`No username ${username}`, 400)
        }
        return result.rows
    }

    static async getById(id) {
        const result = await db.query(
            `SELECT 
            id,
            name,
            url,
            address,
            username
            FROM companies
            WHERE id = $1`,
            [id]
        );
        if (!result.rows[0]) {
            throw new NotFoundError(`No id ${id}`, 400)
        }
        return result.rows[0]
    }

    static async findAll() {
    const result = await db.query(
            `SELECT 
            id,
            name,
            url,
            address,
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