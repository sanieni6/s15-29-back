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
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/auth-user-decorator';
import { IGetUser } from 'src/auth/interfaces/getUser.interface';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({
    description: 'Create a new transaction',
    schema: {
      example: {
        initialBid: 1000.5,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T00:00:00Z',
        auctionType: [
          'traditional auctions',
          'direct purchase',
          'judicial auctions',
        ],
        productId: '004dd695-7b9f-4315-a65e-4595f60da51a',
        // paymentOrderId: '15475d76-bf2e-43db-b537-5094ea408651',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Return a new transaction.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser() { userId }: IGetUser,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(createTransactionDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Return all transactions.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ status: 200, description: 'Return transaction.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Update transaction',
    schema: {
      example: {
        initialBid: 1000.5,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T00:00:00Z',
        auctionType: [
          'traditional auctions',
          'direct purchase',
          'judicial auctions',
        ],
        productId: '004dd695-7b9f-4315-a65e-4595f60da51a',
        // paymentOrderId: '15475d76-bf2e-43db-b537-5094ea408651',
      },
    },
  })
  @ApiOperation({ summary: 'Update an existing transaction' })
  @ApiResponse({ status: 200, description: 'Returns the updated transaction.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Patch(':id')
  @ApiBody({
    description: 'Partial upgrade transaction',
    schema: {
      example: {
        initialBid: 1000.5,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T00:00:00Z',
        auctionType: [
          'traditional auctions',
          'direct purchase',
          'judicial auctions',
        ],
        productId: '004dd695-7b9f-4315-a65e-4595f60da51a',
        // paymentOrderId: '15475d76-bf2e-43db-b537-5094ea408651',
      },
    },
  })
  @ApiOperation({ summary: 'Partially update an existing transaction' })
  @ApiResponse({
    status: 200,
    description: 'Returns the partially updated transaction.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  partialUpdate(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.partialUpdate(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an transaction' })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
