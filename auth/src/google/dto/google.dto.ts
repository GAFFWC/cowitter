import { IsEmail, IsString, IsUrl } from "class-validator";

export class GoogleAuth {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsUrl()
    imageUrl: string;
}
