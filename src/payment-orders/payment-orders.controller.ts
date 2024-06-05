import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';

@Controller('payment-orders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  @Post()
  create(@Body() createPaymentOrderDto: CreatePaymentOrderDto) {
    return this.paymentOrdersService.create(createPaymentOrderDto);
  }

  @Get()
  findAll() {
    return this.paymentOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentOrderDto: UpdatePaymentOrderDto) {
    return this.paymentOrdersService.update(+id, updatePaymentOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentOrdersService.remove(+id);
  }
}
