import User from 'user.type';

interface Todo {
    id?: string;
    title: string;
    text: string;
    user: User;
}

export default Todo;
