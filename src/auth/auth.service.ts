import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userObject: RegisterAuthDto) {
    const { email, password } = userObject;
    // Check if the email is already registered
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const plainToHash = await hash(password as string, 10);
    userObject = { ...userObject, password: plainToHash };
    const createUserDto = {
      ...userObject,
      password: plainToHash,
      lastName: '',
      role: 'user',
      address: '',
      isActive: true,
    };
    return this.usersService.create(createUserDto);
  }

  async signIn(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new HttpException('User not found', 404);

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) throw new HttpException('Password incorrect', 403);

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    const data = {
      user: user,
      token,
    };

    return data;
  }
}
