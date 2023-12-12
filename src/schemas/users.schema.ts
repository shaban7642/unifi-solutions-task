import { NextFunction } from 'express';

const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'this field is required'],
            minlength: [2, 'your first name must be more than one character'],
            text: true,
        },
        lastName: {
            type: String,
            required: [true, 'this filed is required'],
            minlength: [2, 'your last name must be more than one character'],
            text: true,
        },
        email: {
            type: String,
            required: [true, 'this filed is required'],
            unique: [true, 'this field is unique'],
            text: true,
        },
        password: {
            type: String,
            required: [true, 'this filed is required'],
            minlength: [6, 'password cannot less than 6 characters'],
        },
    },
    { timestamps: true }
);

// Hash password
UsersSchema.pre('save', async function (next: NextFunction) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UsersSchema);
export default User;
