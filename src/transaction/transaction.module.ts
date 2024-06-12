import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { UserAuction } from '../user-auction/entities/user-auction.entity';
import { ProductsModule } from 'src/products/products.module';
import { TransactionSchedulerService } from './transactionScheduler.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionSchedulerService],
  imports: [
    SequelizeModule.forFeature([Transaction, UserAuction]),
    ProductsModule,
  ],
})
export class AuctionModule {}
