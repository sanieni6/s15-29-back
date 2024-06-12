import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { UserAuction } from '../user-auction/entities/user-auction.entity';
import { ProductsModule } from 'src/products/products.module';
import { PaymentOrdersModule } from 'src/payment-orders/payment-orders.module';
// Importa UserAuctionModule
import { UserAuctionModule } from 'src/user-auction/user-auction.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    SequelizeModule.forFeature([Transaction, UserAuction]),
    ProductsModule,
    PaymentOrdersModule,
    // Añade UserAuctionModule a la lista de módulos importados
    UserAuctionModule,
  ],
})
export class TransactionModule {}
