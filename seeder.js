const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

// Connect To DB
const connectDB = async () => {
    try {
        const mongo = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return mongo;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

let users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'));
const importData = async () => {
    try {
        const mongo = await connectDB();
        const usersCollection = mongo.connection.collection('users');

        // Hash passwords
        users = users.map((user) => ({
            ...user,
            password: bcryptjs.hashSync(
                user.password,
                bcryptjs.genSaltSync(10)
            ),
        }));

        await usersCollection.insertMany(users);
        console.log('Data Imported ...');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

// Delete Data
const deleteData = async () => {
    try {
        const mongo = await connectDB();
        const usersCollection = mongo.connection.collection('users');
        await usersCollection.deleteMany();
        console.log('Data Distroyed...');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
