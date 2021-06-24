const { Client } = require("pg");

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

db.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    db.end();
});

// let DB_URI;

// if (process.env.NODE_ENV === "test") {
//     DB_URI = "postgresql:///subchef_test";
// } else {
//     DB_URI = "postgresql:///subchef";


// let db = new Client({
//     connectionString: DB_URI
// });

// db.connect();

module.exports = db;