import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryProductsDto } from './dto/query-products.dto';

@ApiBearerAuth()
@ApiTags('products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products (you must send "page" and "limit" per query).',
  })
  @ApiResponse({
    status: 200,
    description:
      'If there is no error, the response will be an object with information about the page and the requested products, in addition to bringing a count of their attributes',
  })
  findAll(@Query() querys: QueryProductsDto) {
    return this.productsService.findAll(querys);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'The product ID' })
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'The product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'id', required: true, description: 'The product ID' })
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'id', required: true, description: 'The product ID' })
  @ApiOperation({ summary: 'Partially update a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been partially updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  partialUpdate(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.partialUpdate(id, updateProductDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'The product ID' })
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
