import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auction } from './entities/auction.entity';
import { UserAuction } from '../user-auction/entities/user-auction.entity';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService],
  imports: [SequelizeModule.forFeature([Auction, UserAuction])],
})
export class AuctionModule {}
