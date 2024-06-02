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
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request.' 
})
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict: User already exists.' 
})
  @ApiBody({
    description: 'Register a new user',
    examples: {
      example: {
        value:{
        email: 'example@gmail.com',
        password: '12345678',
        name: 'John Doe',
        }
      },
    },
    type: RegisterAuthDto,
  })
  signUp(@Body() signUpDto: RegisterAuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful.', 
})
@ApiResponse({ 
    status: 401, 
    description: 'Unauthorized: Invalid credentials.' 
})
  @ApiBody({
    description: 'Login',
    examples: {
      example1: {
          summary: 'Example login',
          description: 'An example of user login',
          value: {
              email: 'example@gmail.com',
              password: '12345678',
          },
      },
  },
    type: LoginAuthDto,
  })
  signIn(@Body() userObjectLogin: LoginAuthDto) {
    return this.authService.signIn(userObjectLogin);
  }
}
