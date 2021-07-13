import { JsonHeaders } from "@cowitter/decorators";
import { User } from "@cowitter/schema";
import { Body, Controller, Get, Headers, HttpService, InternalServerErrorException, Post, Req } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { KakaoAuth } from "./dto/kakao.dto";

@Controller("kakao")
export class KakaoController {
    constructor(private readonly http: HttpService, private readonly userService: UserService) {}
    @Get()
    async get(@Req() req) {
        console.log(req);
    }

    @Post("login")
    async login(@Body() kakaoAuth: KakaoAuth) {
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

        const {
            id,
            kakao_account: { profile, email }
        } = userData;

        const user = await this.userService.getUser({ userId: id });

        if (user) {
            return user;
        }

        const newUser = new User();

        newUser.userId = id;
        newUser.name = profile.nickname;
        newUser.email = email || null;
        newUser.imageUrl = profile.profile_image_url || null;

        const createdUser = await this.userService.createUser(newUser);

        return createdUser;
    }
}
