import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize-typescript';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly sequelize: Sequelize) {}

  async findAll() {
    try {
      const products = await Product.findAll();
      return { success: true, data: products };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener todos los productos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        'Error al obtener el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await Product.create({
        id: uuidv4(),
        ...createProductDto,
      });
      return { success: true, data: newProduct };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al crear el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      await product.update(updateProductDto);
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el producto');
    }
  }

  async partialUpdate(id: string, updateProductDto: Partial<UpdateProductDto>) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      await product.update(updateProductDto);
      return { success: true, data: product };
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar parcialmente el producto');
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      await product.destroy();
      return { success: true, data: product };
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar el producto');
    }
  }

  async findByName(name: string) {
    try {
      const product = await Product.findOne({ where: { name } });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener el producto por nombre');
    }
  }

  async findByCategory(category: string) {
    try {
      const products = await Product.findAll({ where: { category } });
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los productos por categoría');
    }
  }

  async countAll() {
    try {
      const count = await Product.count();
      return count;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al contar los productos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
