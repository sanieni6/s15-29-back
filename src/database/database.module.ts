import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../products/entities/product.entity';
import { Category } from '../products/entities/category.entity';
import { User } from 'src/users/entities/users.entity';
import { Auction } from 'src/auction/entities/auction.entity';
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
      models: [Product, User, Category, Auction],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      sync: { force: true },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
