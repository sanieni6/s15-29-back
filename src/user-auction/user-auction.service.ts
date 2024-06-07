import { Injectable } from '@nestjs/common';
import { CreateUserAuctionDto } from './dto/create-user-auction.dto';
import { UpdateUserAuctionDto } from './dto/update-user-auction.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserAuctionService {
  constructor(private readonly sequelize: Sequelize) {}
}
// insert al momento de pujar
// user id -> guard, transaction id -> body, value bid, hour -> genera la DB

// get all

// get by id

// servicio que consulte puja mas alta