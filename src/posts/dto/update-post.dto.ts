import { IsString, IsOptional } from "class-validator";

export class UpdatePostDto {
    @IsString()
    post: string;
}