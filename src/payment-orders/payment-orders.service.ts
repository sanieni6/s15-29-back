import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';
import { PaymentOrder } from './entities/payment-order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentOrdersService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(PaymentOrder) private paymentOrderModel: typeof PaymentOrder,
  ) {}

  async create(createPaymentOrderDto: CreatePaymentOrderDto, userId: string) {
    //TODO: USAR TRANSACTION PARA IMPLEMENTAR API PAGO
    // const transaction = await this.sequelize.transaction();
    try {
      const newPaymentOrder = await this.paymentOrderModel.create(
        {
          id: uuidv4(),
          ...createPaymentOrderDto,
          paidAt: new Date(),
          userId,
        },
        // { transaction },
      );

      // Simulación de integración con API de pago
      // const paymentResponse = await this.processPayment(newPaymentOrder);
      // if (!paymentResponse.success) {
      //   throw new HttpException(
      //     'Payment processing failed',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }

      // SI SE EFECTUA CORRECTAMENTE EL PAGO COMPLETAR CAMPOS OPCIONALES
      // newPaymentOrder.isPaid = true;
      // newPaymentOrder.paidAt = new Date();
      // newPaymentOrder.paymentId = paymentResponse.paymentId;

      // await newPaymentOrder.save({ transaction });

      // Confirmar la transacción para aplicar los cambios
      // await transaction.commit();
      return { success: true, data: newPaymentOrder };
    } catch (error) {
      // En caso de error, deshace cualquier cambio realizado dentro de la orden de pago
      // await transaction.rollback();
      console.error(error.message);
      throw new HttpException(
        `Error creating payment order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO API PAGO:
  private async processPayment(paymentOrder: PaymentOrder) {
    // Lógica para interactuar con la API de pago
    // Retorna una respuesta simulada de la API de pago
    return {
      success: true,
      paymentId: 'some-unique-payment-id',
    };
  }

  async findAll() {
    try {
      const paymentOrders = await PaymentOrder.findAll();

      return { success: true, data: paymentOrders };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error getting all payment orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const paymentOrder = await PaymentOrder.findOne({
        where: {
          id: id,
        },
      });

      if (!paymentOrder) {
        throw new HttpException(
          'Payment order not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return paymentOrder;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error getting payment order by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //TODO: METHOD UPDATE
  // async update(id: string, updatePaymentOrderDto: UpdatePaymentOrderDto) {
  //   const transaction = await this.sequelize.transaction();
  //   try {
  //     const paymentOrder = await this.paymentOrderModel.findByPk(id, {
  //       transaction,
  //     });

  //     if (!paymentOrder) {
  //       throw new HttpException(
  //         'Payment Order not found',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     await paymentOrder.update(updatePaymentOrderDto, { transaction });

  //     await transaction.commit();
  //     return { success: true, data: paymentOrder };
  //   } catch (error) {
  //     await transaction.rollback();
  //     console.error(error.message);
  //     throw new HttpException(
  //       `Error updating payment order: ${error.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async remove(id: string) {
    try {
      const paymentOrder = await this.findOne(id);
      if (!paymentOrder) {
        throw new NotFoundException('Payment order not found');
      }

      await paymentOrder.destroy();
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error deleting Payment order by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
