import { JsonHeaders } from "@cowitter/decorators";
import { Controller, Get, Headers, HttpService, InternalServerErrorException, Post, Req } from "@nestjs/common";
import { KakaoAuth } from "./dto/kakao.dto";

@Controller("kakao")
export class KakaoController {
    constructor(private readonly http: HttpService) {}
    @Get()
    async get(@Req() req) {
        console.log(req);
    }

    @Post("login")
    async post(@JsonHeaders("auth") kakaoAuth: KakaoAuth) {
        try {
            console.log(kakaoAuth);

            const userData = this.http
                .get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${kakaoAuth.access_token}`
                    }
                })
                .toPromise()
                .then((r) => {
                    return r.data;
                })
                .catch((err) => {
                    console.error(err);
                    return null;
                });

            if (!userData) {
                throw new InternalServerErrorException("Get user info failed");
            }
        } catch (err) {
            console.error(err);
        }
    }
}
