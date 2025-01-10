import mysql from 'mysql2'; // Use 'mysql2' for modern support
import dotenv from 'dotenv';

dotenv.config();

let connection;

const connectWithRetry = () => {
    console.log('Attempting to connect to the MySQL database...');

    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Database connection error:', err.message);
            if (err.code === 'ER_NOT_SUPPORTED_AUTH_MODE') {
                console.error('Please check the MySQL authentication mode and credentials.');
            }
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('Connected to MySQL database');
        }
    });

    connection.on('error', (err) => {
        console.error('Database error:', err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Connection lost. Reconnecting...');
            connectWithRetry();
        } else {
            console.error('Unexpected database error:', err.message);
            // Optionally handle other errors or re-throw
        }
    });
};

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('Missing required database environment variables.');
    process.exit(1);
}

connectWithRetry();


process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing MySQL connection...');
    if (connection) {
        connection.end((err) => {
            if (err) {
                console.error('Error closing the database connection:', err.message);
            } else {
                console.log('Database connection closed.');
            }
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});

export default connection;
