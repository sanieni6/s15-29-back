import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Array<{ id: string }> = [];

  findAll() {
    return [...this.products];
  }

  findOne(id: string) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: uuidv4(),
      ...createProductDto,
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

  partialUpdate(id: string, updateProductDto: Partial<UpdateProductDto>) {
    const product = this.findOne(id);
    const updatedProduct = { ...product, ...updateProductDto };
    const productIndex = this.products.findIndex((prod) => prod.id === id);

    this.products[productIndex] = updatedProduct;
    return { ...updatedProduct };
  }

  remove(id: string) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    const removedProduct = this.products.splice(productIndex, 1);
    return removedProduct[0];
  }
}
