import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuctionModule } from './auction/auction.module';


@Module({
  imports: [ ProductsModule, DatabaseModule, UsersModule, AuthModule, AuctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
