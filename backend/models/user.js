const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    static async get(username) {
        const result = await db.query(
            `SELECT username,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            is_company AS "isCompany"
            FROM users
            WHERE username = $1`,
            [username]
        );
        if (!result.rows[0]) {
            throw new ExpressError(`Username ${username} is invalid`, 400)
        }
        return result.rows[0]
    }

    static async findAll() {
    const result = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_company AS "isCompany"
           FROM users
           ORDER BY username`,
    );

    return result.rows;
    }

    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username,
                password,
                first_name AS firstName,
                last_name AS lastName,
                email,
                is_company AS "isCompany"
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new ExpressError("Invalid username/password");
    }

    static async register(
        {username, password, firstName, lastName, email, isCompany}) {
            const duplicateCheck = await db.query(
                `SELECT username
                FROM users
                WHERE username = $1`,
                [username],
            );

            if (duplicateCheck.rows[0]) {
                throw new ExpressError(`Duplicate username: ${username}`);
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

            const result = await db.query(
                `INSERT INTO users
                (username,
                    password,
                    first_name,
                    last_name,
                    email,
                    is_company)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_company AS "isCompany"`,
                [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
                isCompany
                ]                
            )
            return result.rows[0];
        }

    static async update(username, data) {
            const result = await db.query(
                `UPDATE users
                 SET first_name=$1,
                    last_name=$2,
                    email=$3,
                    is_company=$4
                 WHERE username = $5
                 RETURNING first_name AS "firstName", last_name AS "lastName", email, is_company AS "isCompany"`,
                [
                data.firstName,
                data.lastName,
                data.email,
                data.isCompany,
                username
                ]                
            )
            return result.rows[0];
        }
}

module.exports = User;