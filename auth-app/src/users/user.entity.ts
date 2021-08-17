import { Role } from "src/auth/roles/enums/role.enum";

export class User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
}
