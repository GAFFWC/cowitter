import { IsEmail, IsNumber, IsNumberString, IsString, IsUrl } from "class-validator";

export class GoogleAuth {
    @IsNumberString()
    userId: string;

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsUrl()
    imageUrl: string;
}
