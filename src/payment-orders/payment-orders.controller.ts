import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/auth-user-decorator';
import { IGetUser } from 'src/auth/interfaces/getUser.interface';

@Controller('payment-orders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  // TODO: CAMBIAR LÓGICA USERID
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser() { userId }: IGetUser,
    @Body() createPaymentOrderDto: CreatePaymentOrderDto,
  ) {
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
