import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../products/entities/product.entity';
import { ProductCategory } from '../products/entities/productCategory.entity';
import { AuctionType } from '../products/entities/auction.entity';
import { User } from 'src/users/entities/users.entity';

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
      models: [ Product, User],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      sync: { force: true },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
