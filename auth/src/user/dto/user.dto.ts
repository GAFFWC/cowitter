import { User } from "@cowitter/schema";
import { OmitType } from "@nestjs/swagger";

export class CreateUserDTO extends OmitType(User, ["id"]) {}
