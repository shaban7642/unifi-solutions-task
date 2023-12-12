import Todo from 'todo.type';
import TodoModel from '../schemas/todo.schema';
import { FilterQuery, QueryOptions } from 'mongoose';

class TodoService {
    static async add(todoInfo: Todo) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await TodoModel.create(todoInfo));
            } catch (error) {
                reject(error);
            }
        });
    }

    static async update(
        query: FilterQuery<any>,
        data: Todo,
        options: QueryOptions
    ) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await TodoModel.findOneAndUpdate(
                    query,
                    { $set: data },
                    options
                );
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    static async delete(query: FilterQuery<any>) {
        return new Promise(async (resolve, reject) => {
            try {
                const result: any = await TodoModel.findOneAndDelete(query);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    static async getInfo(query: QueryOptions): Promise<Todo> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await TodoModel.findOne(query)
                    .populate('user')
                    .exec();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    static async getAll(query: QueryOptions): Promise<Todo[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await TodoModel.find(query)
                    .populate('user')
                    .exec();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default TodoService;
