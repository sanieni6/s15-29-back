import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { CloudinaryController } from 'src/cloudinary/cloudinary.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Category]),
    // ...otros módulos importados...
  ],
  providers: [ProductsService, CloudinaryService],
  controllers: [ProductsController, CloudinaryController],
  exports: [ProductsService, CloudinaryService],
})
export class ProductsModule {}
