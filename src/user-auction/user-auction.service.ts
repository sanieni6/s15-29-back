import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserAuctionDto } from './dto/create-user-auction.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserAuction } from './entities/user-auction.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserAuctionService {
  constructor(private readonly sequelize: Sequelize) {}

  async create(createUserAuctionDto: CreateUserAuctionDto) {
    try {
      const NewUserAuction = await UserAuction.create({
        ...createUserAuctionDto,
        id: uuidv4(),
        hourBid: new Date(),
      });

      return { success: true, data: NewUserAuction };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating UserAuction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const userAuctions = await UserAuction.findAll();

      return { success: true, data: userAuctions };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error getting all UserAuctions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const userAuction = await UserAuction.findOne({
        where: {
          id: id,
        },
      });

      if (!userAuction) {
        throw new HttpException('UserAuction not found', HttpStatus.NOT_FOUND);
      }
      return userAuction;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error getting userAuction by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update(id: number, updateTestDto: UpdateUserAuctionDto) {
  //   return `This action updates a #${id} test`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} test`;
  // }
}
