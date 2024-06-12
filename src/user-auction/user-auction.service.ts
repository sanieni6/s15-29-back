import { Injectable } from '@nestjs/common';
import { CreateUserAuctionDto } from './dto/create-user-auction.dto';
import { UpdateUserAuctionDto } from './dto/update-user-auction.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserAuctionService {
  constructor(private readonly sequelize: Sequelize) {}
}
// create
// findAll
// findOne
