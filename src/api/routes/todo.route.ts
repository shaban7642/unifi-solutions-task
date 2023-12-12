import TodoController from '../controllers/todo.controller';

import router from 'express';
import auth from '../middlewares/auth.middleware';

const appRouter = router.Router();

appRouter.route('/').post(auth, TodoController.add);
appRouter.route('/func5').get(auth, TodoController.getAll);
appRouter.route('/:id').put(auth, TodoController.update);
appRouter.route('/:id').delete(auth, TodoController.delete);
appRouter.route('/:id').get(auth, TodoController.getInfo);

export default appRouter;
