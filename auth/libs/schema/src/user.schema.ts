import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
import * as Mongoose from "mongoose";

@Schema()
export class User {
    @Prop({ type: Mongoose.Schema.Types.ObjectId, auto: true })
    id: number;

    @Prop({ type: Mongoose.Schema.Types.String })
    @IsNumberString()
    userId: string;

    @Prop({ type: Mongoose.Schema.Types.String })
    @IsString()
    name: string;

    @Prop({ type: Mongoose.Schema.Types.String, required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Prop({ type: Mongoose.Schema.Types.String, required: false })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
