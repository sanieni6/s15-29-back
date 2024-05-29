import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() signInDto: Record<string, any>) {
//     return this.authService.signIn(signInDto.username, signInDto.password);
//   }

  @Post('register')
  @ApiBody({
    description: 'Register a new user',
    schema: {
      example: {
        email: 'example@gmail.com',
        password: '12345432',
        name: 'luissss',
      },
    },
  })
    signUp(@Body() signUpDto: RegisterAuthDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    @ApiBody({
        description: 'Login',
        schema: {
          example: {
            email: 'example@gmail.com',
            password: '12345432'
          },
        },
      })
    signIn(@Body() userObjectLogin: LoginAuthDto) {
        return this.authService.signIn(userObjectLogin);
    }


}
