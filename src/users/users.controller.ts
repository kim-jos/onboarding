import { Body, ClassSerializerInterceptor, Controller, Get, Post, Session, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Post('/signup')
    async signUp(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.usersService.signUp(body.email, body.password);
        session.userId = user.id
        return user;
    }
    
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.usersService.signIn(body.email, body.password);
        session.userId = user.id
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Get('/whoami')
    whoami(@Session() user: UsersEntity) {
        return user;
    }

}
