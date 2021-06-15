import { HttpModule, Module } from "@nestjs/common";
import { KakaoController } from "./kakao.controller";

@Module({
    imports: [HttpModule],
    controllers: [KakaoController]
})
export class KakaoModule {}
