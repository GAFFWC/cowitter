import { CreateUserVO, User } from "@cowitter/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

@Injectable()
export class KakaoService {
    constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

    createUser = async (createUserVO: CreateUserVO): Promise<User & Document<any, any>> => {
        const newUser = new this.user(createUserVO);
        return await newUser.save();
    };
}
