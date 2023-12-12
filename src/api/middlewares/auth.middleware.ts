import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import User from 'user.type';
import RequestWithUser from 'reqWithUser.type';
import { User as UserClass } from '../controllers/user.controller';

const auth = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    let token;
    try {
        token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error('Not authorized!');
        }

        jwt.verify(
            token,
            process.env.SECRET_KEY,
            (error: any, result: User) => {
                if (error) {
                    res.status(401).json({ error: 'NOT_AUTHORIZED' });
                    return;
                }
                req.user = new UserClass(result).toJson();
                next();
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default auth;
