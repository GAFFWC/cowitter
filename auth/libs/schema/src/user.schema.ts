import { Prop, Schema } from "@nestjs/mongoose";
import { IsEmail, IsString, IsUrl } from "class-validator";
import * as Mongoose from "mongoose";

@Schema()
export class User {
    @Prop({ type: Mongoose.Schema.Types.ObjectId, auto: true })
    userUid: number;

    @Prop({ type: Mongoose.Schema.Types.String })
    @IsString()
    name: string;

    @Prop({ type: Mongoose.Schema.Types.String })
    @IsEmail()
    email: string;

    @Prop({ type: Mongoose.Schema.Types.String })
    @IsUrl()
    imageUrl: string;
}
