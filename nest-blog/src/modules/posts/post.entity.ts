import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToOne(() => User, user => user.posts, {onDelete: "SET NULL"})
    user: User;
}
