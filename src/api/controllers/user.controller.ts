import UserModel from '../../schemas/users.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

class User {
    private name: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private id: string;
    constructor({
        firstName,
        lastName,
        email,
        password,
        id,
    }: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        id?: string;
    } = {}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.id = id;
    }
    toJson() {
        console.log({
            name: this.name,
            firstName: this.firstName,
            lastName: this.lastName,
        });
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            id: this.id,
        };
    }
    async comparePassword(plainText: string) {
        return bcrypt.compare(plainText, this.password);
    }
    encoded() {
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
                ...this.toJson(),
            },
            process.env.SECRET_KEY
        );
    }
    static async decoded(userJwt: string) {
        return jwt.verify(
            userJwt,
            process.env.SECRET_KEY,
            (error: any, res: any) => {
                if (error) {
                    return { error };
                }
                return new User(res);
            }
        );
    }
}

class UserController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || typeof email !== 'string') {
                res.status(400).json({
                    error: 'Bad email format, expected string.',
                });
                return;
            }
            if (!password || typeof password !== 'string') {
                res.status(400).json({
                    error: 'Bad email format, expected string.',
                });
                return;
            }
            let userData = await UserModel.findOne({ email });

            if (!userData) {
                res.status(401).json({
                    error: 'Make sure your email is correct.',
                });
                return;
            }
            const user = new User(userData);

            if (!(await user.comparePassword(password))) {
                res.status(401).json({
                    error: 'Make sure your password is correct.',
                });
                return;
            }
            res.json({
                auth_token: user.encoded(),
                info: {
                    _id: userData._id,
                    name: userData.firstName + ' ' + userData.lastName,
                    email: userData.email,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export { UserController, User };
