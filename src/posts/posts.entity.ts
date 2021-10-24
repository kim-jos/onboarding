import { UsersEntity } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post: string;
    
    @Column()
    date: Date;

    // many posts one user
    @ManyToOne(() => UsersEntity, (user) => user.posts) 
    user: UsersEntity;
}