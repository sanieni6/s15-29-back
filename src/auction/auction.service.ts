import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionService {
  constructor(private readonly sequelize: Sequelize) {}

  async create(createAuctionDto: CreateAuctionDto) {
    try {
      const newAuction = await Auction.create({
        id: uuidv4(),
        ...createAuctionDto,
      });

      return { success: true, data: newAuction };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating auction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const auctions = await Auction.findAll();

      return { success: true, data: auctions };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error getting all auctions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const auction = await Auction.findOne({
        where: {
          id: id,
        },
      });

      if (!auction) {
        throw new HttpException('Auction not found', HttpStatus.NOT_FOUND);
      }
      return auction;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error getting auction by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto) {
    try {
      const auction = await this.findOne(id);
      if (!auction) {
        throw new NotFoundException(`Error getting auction by id #${id}`);
      }

      await auction.update(updateAuctionDto);
      return auction;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error updating auction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async partialUpdate(id: string, updateAuctionDto: Partial<UpdateAuctionDto>) {
    try {
      const auction = await this.findOne(id);
      if (!auction) {
        throw new NotFoundException('Auction not found');
      }

      await auction.update(updateAuctionDto);
      return { success: true, data: auction };
    } catch (error) {
      console.error(error);
      throw new Error('Error partially updating the auction');
    }
  }

  async remove(id: string) {
    try {
      const auction = await this.findOne(id);
      if (!auction) {
        throw new NotFoundException('Auction not found');
      }

      await auction.destroy();
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error deleting auction by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
