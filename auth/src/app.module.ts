import { Module } from "@nestjs/common";
import { KakaoModule } from "./kakao/kakao.module";
import { GoogleModule } from "./google/google.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forRoot("mongodb://localhost:27017"), KakaoModule, GoogleModule],
    controllers: [],
    providers: []
})
export class AppModule {}
