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
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { validate } from 'class-validator';
import { QueryProductsDto } from './dto/query-products.dto';
import { PaginatedProductsResponse } from './interface/serviceInterface';
import { Op, Order } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  private async findProductOrFail(id: string) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findAll(filters: QueryProductsDto): Promise<PaginatedProductsResponse> {
    try {
      const query = <any>{};
      const include = [];

      if (filters.category) {
        include.push({
          model: Category,
          as: 'categoryEntity', // Alias para la tabla "Category"
          where: Sequelize.where(
            Sequelize.cast(Sequelize.col('categoryEntity.type'), 'text'),
            {
              [Op.like]: `%${filters.category}%`,
            },
          ),
        });
      }

      if (filters.minPrice && filters.maxPrice) {
        query['initial_price'] = {
          [Op.gte]: parseFloat(filters.minPrice),
          [Op.lte]: parseFloat(filters.maxPrice),
        };
      } else if (filters.minPrice) {
        query['initial_price'] = { [Op.gte]: parseFloat(filters.minPrice) };
      } else if (filters.maxPrice) {
        query['initial_price'] = { [Op.lte]: parseFloat(filters.maxPrice) };
      }

      // Buscador
      if (filters.search) {
        const keywords = filters.search.trim().split(' ');

        // Construir un array de condiciones de búsqueda para cada palabra
        const whereConditions = keywords.map((keyword) => ({
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        }));

        query[Op.and] = whereConditions;
      }

      // Realizar ordenamiento
      const order: Order =
        filters.order === 'ASC'
          ? [['initial_price', 'ASC']]
          : [['initial_price', 'DESC']];

      // Realizar la consulta para obtener todos los productos
      const products = await Product.findAll({
        where: query,
        include: include.length > 0 ? include : undefined,
        order,
      });

      // Calcular el número total de páginas
      const total = products.length;

      // Aplicar paginación
      const limit = parseInt(filters.limit);
      const page = parseInt(filters.page);
      const offset = (page - 1) * limit;
      const paginatedProducts = products.slice(offset, offset + limit);

      // Calcular el número total de páginas
      const limitOfPages = Math.ceil(total / limit);

      const totalPages = Math.ceil(total / Number(limit));

      return {
        page: page,
        prevPage: page === 1 ? null : page - 1,
        nextPage: page === limitOfPages ? null : page + 1,
        totalPages,
        total: limitOfPages,
        products: paginatedProducts,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error getting all products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        'Error getting the product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createProductDto: CreateProductDto, userId: string) {
    try {
      let category = await this.categoryModel.findOne({
        where: { type: createProductDto.category },
      });

      if (!category) {
        // Si la categoría no existe, la creamos
        category = await this.categoryModel.create({
          type: createProductDto.category,
        });
        // Aseguramos que la categoría se ha guardado correctamente antes de continuar
        await category.save();
      }

      const newProduct = await this.productModel.create({
        id: uuidv4(),
        ...createProductDto,
        categoryId: category.id,
        userId: userId,
      });

      return {
        success: true,
        data: { ...newProduct.toJSON(), category: category.type },
      };
    } catch (error) {
      console.error(error.message);
      throw new HttpException(
        `Error creating product: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findProductOrFail(id);
      const errors = await validate(updateProductDto);
      if (errors.length > 0) {
        const errorMessages = errors
          .filter((error) => error.constraints)
          .map((error) => Object.values(error.constraints!))
          .join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      await product.update(updateProductDto);
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error updating product');
    }
  }

  async partialUpdate(id: string, updateProductDto: Partial<UpdateProductDto>) {
    try {
      const product = await this.findProductOrFail(id);
      await product.update(updateProductDto);
      return { success: true, data: product };
    } catch (error) {
      console.error(error);
      throw new Error('Error while partially updating the product');
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findProductOrFail(id);
      await product.destroy();
      return { success: true, data: product };
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting product');
    }
  }
  async findByName(name: string) {
    try {
      const product = await Product.findOne({ where: { name } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting the product by name');
    }
  }

  async findByCategory(category: string) {
    try {
      const products = await Product.findAll({ where: { category } });
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Error when obtaining products by category');
    }
  }

  async countAll() {
    try {
      const count = await Product.count();
      return count;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error counting the products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
