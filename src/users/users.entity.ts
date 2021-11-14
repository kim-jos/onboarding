import { PostsEntity } from "src/posts/posts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    @Exclude()
    password: string;
    
    // one user many posts
    @OneToMany(() => PostsEntity, (post) => post.user)
    posts: PostsEntity[];
}