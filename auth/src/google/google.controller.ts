import { User } from "@cowitter/schema";
import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { GoogleAuth } from "./dto/google.dto";

@Controller("google")
export class GoogleController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async login(@Body() googleAuth: GoogleAuth) {
        const { userId, email, name, imageUrl } = googleAuth;

        const user = await this.userService.getUser({ userId: userId });

        console.log(user);

        if (user) {
            return user;
        }

        const newUser = new User();

        newUser.userId = userId;
        newUser.email = email;
        newUser.name = name;
        newUser.imageUrl = imageUrl || null;

        const createdUser = await this.userService.createUser(newUser);

        return createdUser;
    }
}
