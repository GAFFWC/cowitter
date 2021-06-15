import { Module } from "@nestjs/common";
import { KakaoModule } from "./kakao/kakao.module";
import { GoogleModule } from "./google/google.module";

@Module({
    imports: [KakaoModule, GoogleModule],
    controllers: [],
    providers: []
})
export class AppModule {}
