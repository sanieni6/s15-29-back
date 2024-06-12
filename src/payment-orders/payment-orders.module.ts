import { Module } from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/users/entities/users.entity';
import { PaymentOrder } from './entities/payment-order.entity';

@Module({
  imports: [SequelizeModule.forFeature([PaymentOrder, Transaction, User])],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
