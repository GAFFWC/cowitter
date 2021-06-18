import { User, UserSchema } from "@cowitter/schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
