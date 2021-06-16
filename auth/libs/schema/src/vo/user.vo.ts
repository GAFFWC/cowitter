import { OmitType } from "@nestjs/swagger";
import { User } from "../user.schema";

export class CreateUserVO extends OmitType(User, ["userUid"]) {}
