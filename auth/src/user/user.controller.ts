import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get(":id")
    async getUser(@Param("id") id: number) {
        const user = await this.userService.getUser({ id });

        return user;
    }
}
