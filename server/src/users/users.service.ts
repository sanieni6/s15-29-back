import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly sequelize: Sequelize) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await User.create({
                id: uuidv4(),
                ...createUserDto,
            })
            return { success: true, data: newUser };
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error al crear el usuario',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAll() {
        try {
            const users = await User.findAll();
            return { success: true, data: users };
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error al obtener todos los usuarios',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOne(id: string) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(
                'Error al obtener el usuario',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            await user.update(updateUserDto);
            return { success: true, data: user };
        } catch (error) {
            throw new Error('Error al actualizar el usuario');
        }
    }

    async partialUpdate(id: string, updateUserDto: Partial<UpdateUserDto>) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            await user.update(updateUserDto);
            return { success: true, data: user };
        } catch (error) {
            throw new Error('Error al actualizar parcialmente el producto');
        }
    }

    async remove(id: string) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            await user.destroy();
            return { success: true, data: user };
        } catch (error) {
            throw new Error('Error al eliminar el usuario');
        }
    }

    async findByName(name: string) {
        try {
            const user = await User.findOne({ where: { name } });
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new Error('Error al buscar el usuario');
        }
    }


}
