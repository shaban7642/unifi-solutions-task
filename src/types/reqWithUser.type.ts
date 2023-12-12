import User from 'user.type';
import { Request } from 'express';

interface RequestWithUser extends Request {
    user: User;
}

export default RequestWithUser;
