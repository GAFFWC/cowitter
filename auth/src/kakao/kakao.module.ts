import { HttpModule, Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { KakaoController } from "./kakao.controller";

@Module({
    imports: [HttpModule, UserModule],
    controllers: [KakaoController]
})
export class KakaoModule {}
