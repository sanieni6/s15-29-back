import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAuctionService } from './user-auction.service';
import { UserAuction } from './entities/user-auction.entity';
import { User } from 'src/users/entities/users.entity';
import { Auction } from 'src/auction/entities/auction.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserAuction, User, Auction])],
  providers: [UserAuctionService],
  exports: [UserAuctionService],
})
export class UserAuctionModule {}
