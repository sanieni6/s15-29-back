import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AuctionModule } from './auction/auction.module';

@Module({
  imports: [ProductsModule, DatabaseModule, AuctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
