import { User } from "../entity/user.entity";

export class UserRequestDto extends PickType(User,) {}