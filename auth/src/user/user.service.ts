import { User } from "@cowitter/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, FilterQuery, Model, Query, QueryOptions, UpdateQuery } from "mongoose";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

    getUser = async (filter: FilterQuery<User>, projection?: any, options?: QueryOptions) => {
        return await this.user.findOne(filter, projection, options);
    };

    createUser = async (createUserVO: CreateUserDTO): Promise<User & Document<any, any>> => {
        const newUser = new this.user(createUserVO);
        return await newUser.save();
    };

    updateUser = async (filter: FilterQuery<User>, update?: UpdateQuery<User>, options?: QueryOptions) => {
        return await this.user.updateOne(filter, update, options);
    };

    deleteUser = async (filter: FilterQuery<User>, options?: QueryOptions) => {
        return await this.user.deleteOne(filter, options);
    };
}
