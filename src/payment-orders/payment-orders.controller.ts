import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';

@Controller('payment-orders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  // TODO: CAMBIAR LÓGICA USERID
  @Post()
  create(@Body() createPaymentOrderDto: CreatePaymentOrderDto, userId: string) {
    return this.paymentOrdersService.create(createPaymentOrderDto, userId);
  }

  @Get()
  findAll() {
    return this.paymentOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentOrdersService.findOne(id);
  }

  // TODO:
  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updatePaymentOrderDto: UpdatePaymentOrderDto,
  // ) {
  //   return this.paymentOrdersService.update(id, updatePaymentOrderDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentOrdersService.remove(id);
  }
}
