import { JsonHeaders } from "@cowitter/decorators";
import { Body, Controller, Get, Headers, HttpService, InternalServerErrorException, Post, Req } from "@nestjs/common";
import { KakaoAuth } from "./dto/kakao.dto";

@Controller("kakao")
export class KakaoController {
    constructor(private readonly http: HttpService, private readonly kakaoService) {}
    @Get()
    async get(@Req() req) {
        console.log(req);
    }

    @Post("login")
    async post(@Body() kakaoAuth: KakaoAuth) {
        console.log(kakaoAuth);

        const userData = await this.http
            .get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${kakaoAuth.access_token}`
                }
            })
            .toPromise()
            .then((r) => r.data)
            .catch((err) => {
                console.error(err);
                return null;
            });

        if (!userData) {
            throw new InternalServerErrorException("Get user info failed");
        }

        console.log(userData);

        const user = 
    }
}
