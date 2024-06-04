import { Injectable } from '@nestjs/common';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PaymentOrdersService {
  constructor(private readonly sequelize: Sequelize) {}
  create(createPaymentOrderDto: CreatePaymentOrderDto) {
    return 'This action adds a new paymentOrder';
  }

  findAll() {
    return `This action returns all paymentOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentOrder`;
  }

  update(id: number, updatePaymentOrderDto: UpdatePaymentOrderDto) {
    return `This action updates a #${id} paymentOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentOrder`;
  }
}
