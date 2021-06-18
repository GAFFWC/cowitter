import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { GoogleController } from "./google.controller";

@Module({
    imports: [UserModule],
    controllers: [GoogleController]
})
export class GoogleModule {}
