import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// Modulos
import { Auction } from 'src/auction/entities/auction.entity';
import { Category } from '../products/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { User } from 'src/users/entities/users.entity';
import { UserAuction } from 'src/user-auction/entities/user-auction.entity';
import { PaymentOrder } from 'src/payment-orders/entities/payment-order.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectModule: require('pg'),
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
      models: [Product, User, Category, Auction, UserAuction, PaymentOrder],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      sync: { force: false },
    }),
    SequelizeModule.forFeature([
      Product,
      User,
      Category,
      Auction,
      UserAuction,
      PaymentOrder,
    ]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
