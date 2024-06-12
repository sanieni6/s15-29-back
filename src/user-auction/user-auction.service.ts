import { Injectable } from '@nestjs/common';
import { CreateUserAuctionDto } from './dto/create-user-auction.dto';
import { UpdateUserAuctionDto } from './dto/update-user-auction.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserAuction } from './entities/user-auction.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class UserAuctionService {
  constructor(private readonly sequelize: Sequelize,
    @InjectModel(UserAuction) private userAuctionModel: typeof UserAuction,
    // @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(User) private userModel: typeof User,
  
  ) {}

  async highestBid(transactionId: string) {
    const highestBidAuction = await this.userAuctionModel.findOne({
      where: {id: transactionId},
      order: [['valueBid', 'DESC']],
    });

    if (highestBidAuction){
      const userWinner = await this.userModel.findOne({
        where: { id: highestBidAuction.userId }
      });

      return {
        user: userWinner,
        value: highestBidAuction.valueBid
      }
    }

    return null;
  }
}
// insert al momento de pujar
// user id -> guard, transaction id -> body, value bid, hour -> genera la DB

// get all

// get by id

// servicio que consulte puja mas alta