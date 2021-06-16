import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { GoogleAuth } from "./dto/google.dto";

@Controller("google")
export class GoogleController {
    @Post()
    async post(@Body() googleAuth: GoogleAuth) {
        console.log(googleAuth);
    }
}
