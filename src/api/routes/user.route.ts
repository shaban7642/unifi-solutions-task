import { UserController } from '../controllers/user.controller';

import router from 'express';

const appRouter = router.Router();

appRouter.route('/login').post(UserController.login);

export default appRouter;
