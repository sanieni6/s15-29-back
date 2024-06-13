import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { UserAuction } from '../user-auction/entities/user-auction.entity';
import { PaymentOrder } from '../payment-orders/entities/payment-order.entity';
import { ProductsModule } from 'src/products/products.module';
import { TransactionSchedulerService } from './transactionScheduler.service';
import { PaymentOrdersModule } from 'src/payment-orders/payment-orders.module';
// Importa UserAuctionModule
import { UserAuctionModule } from 'src/user-auction/user-auction.module';
import { PaymentOrdersService } from 'src/payment-orders/payment-orders.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PaymentOrdersService, TransactionSchedulerService],
  imports: [
    SequelizeModule.forFeature([Transaction, UserAuction, PaymentOrder]),
    ProductsModule,
    PaymentOrdersModule,
    UserAuctionModule,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
