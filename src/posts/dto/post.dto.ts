import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator'
import { UsersEntity } from 'src/users/users.entity';

export class PostDto {
    // @IsNumber()
    // id: number;

    @IsString()
    post: string;

    // @IsDate()
    // date: Date;
    
    // user: UsersEntity;
}