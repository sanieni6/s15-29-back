import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { UserAuction } from '../user-auction/entities/user-auction.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/users.entity';
import { PaymentOrdersService } from 'src/payment-orders/payment-orders.service';
import { UserAuctionService } from 'src/user-auction/user-auction.service';
import { CreateUserAuctionDto } from 'src/user-auction/dto/create-user-auction.dto';
import { CreatePaymentOrderDto } from 'src/payment-orders/dto/create-payment-order.dto';

//Luis
//evalua hora final con hora actual --> funcion
// servicio buscar puja mas alta
// nuevo servicio
// una ves terminada la fecha limite enviar la ruta de la pasarela de pagos, usar servicio que busque puja mas alta de user-transaccion, tambien crea la orden con estado false hasta terminado el pago.

//Leo hacer crud orders y el seed de products

//Clay
// Agregar a la tabla campo active --> done
// Hago el crud transaccion
// fijarme en el usuario del create
// crud de usuario/transaccion

@Injectable()
export class TransactionService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(UserAuction) private userAuctionModel: typeof UserAuction,
    @InjectModel(Product) private productModel: typeof Product,
    private readonly paymentOrdersService: PaymentOrdersService, // Añade esta línea
    private readonly userAuctionService: UserAuctionService, // Y esta línea
  ) {}

  // cuando es compra directa crear orden de pago
  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      const transaction = await this.transactionModel.create({
        id: uuidv4(),
        initialBid: createTransactionDto.initialBid,
        startDate: new Date(),
        endDate: createTransactionDto.endDate,
        transactionType: createTransactionDto.transactionType,
        productId: createTransactionDto.productId,
      }); 

      const product = await this.productModel.findOne({
        where: {
          id: createTransactionDto.productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await transaction.save();

      // // Verificar el tipo de transacción y actuar en consecuencia
      // if (createTransactionDto.transactionType === 'Buy') {
      //   // Crear una orden de pago para una compra directa
      //   const createPaymentOrderDto = new CreatePaymentOrderDto({
      //     transactionId: transaction.id,
      //     userId: userId,
      //     // Otros campos necesarios
      //   });
      //   await this.paymentOrdersService.create(createPaymentOrderDto);
      // } else if (createTransactionDto.transactionType === 'Auction') {
      //   // Crear una subasta para el usuario
      //   const createUserAuctionDto = new CreateUserAuctionDto({
      //     transactionId: transaction.id,
      //     userId: userId,
      //     // Otros campos necesarios
      //   });
      //   await this.userAuctionService.create(createUserAuctionDto);
      // }

      return transaction;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error.name === 'SequelizeValidationError') {
        throw new HttpException('Validation error', HttpStatus.BAD_REQUEST);
      } else {
        console.error(error);
        throw new HttpException(
          'Error creating transaction',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll() {
    try {
      const transactions = await Transaction.findAll();

      return { success: true, data: transactions };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error getting all transactions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const transaction = await Transaction.findOne({
        where: {
          id: id,
        },
      });

      if (!transaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error getting transaction by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transaction = await this.findOne(id);
      if (!transaction) {
        throw new NotFoundException(`Error getting transaction by id #${id}`);
      }

      await transaction.update(updateTransactionDto);
      return transaction;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error updating transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async partialUpdate(
    id: string,
    updateTransactionDto: Partial<UpdateTransactionDto>,
  ) {
    try {
      const transaction = await this.findOne(id);
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      await transaction.update(updateTransactionDto);
      return { success: true, data: transaction };
    } catch (error) {
      console.error(error);
      throw new Error('Error partially updating the transaction');
    }
  }

  async remove(id: string) {
    try {
      const transaction = await this.findOne(id);
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      await transaction.destroy();
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error deleting transaction by id #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
