import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    
    @ApiProperty()
    @IsString()
    post: string;
}