import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as env from '../config/enviroments';
import { Product } from '../products/entities/product.entity';
import { Category } from '../products/entities/category.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectModule: require('pg'),
      host: env.DBHOST,
      port: Number(env.DBPORT),
      username: env.DBUSERNAME,
      password: env.DBPASSWORD,
      database: env.DBDATABASE,
      models: [Product, Category],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      sync: { force: true },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
