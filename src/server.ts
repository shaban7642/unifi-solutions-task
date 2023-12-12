import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './api/middlewares/errorHandler';
const app = express();
/**------------------------------------------------------------------------
 *                            ?ImportROUTES
 *------------------------------------------------------------------------**/
// import users from './api/routes/users/users.route';
import todo from './api/routes/todo.route';
import user from './api/routes/user.route';

app.use(
    cors({
        origin: '*',
    })
);
process.env.NODE_ENV !== 'prod' && app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**======================
 *    ?UseRoutes
 *========================**/
// app.use('/api/v1/users', users);
app.use('/api/v1/todo', todo);
app.use('/api/v1/user', user);
/**======================
 *    ?Hanle DB Errors
 *========================**/
app.use(errorHandler);
export default app;
