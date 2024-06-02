import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.'})
  @ApiBody({
    description: 'Register a new user',
    schema: {
      example: {
        email: 'example@gmail.com',
        password: '12345432',
        name: 'luissss',
      },
    },
    type: RegisterAuthDto,
  })
    signUp(@Body() signUpDto: RegisterAuthDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login' })
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
