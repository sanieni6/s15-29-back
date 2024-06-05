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

@Injectable()
export class TransactionService {
  constructor(
    private readonly sequelize: Sequelize,
    // Inyección de Modelos
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(UserAuction) private userAuctionModel: typeof UserAuction,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  // Se utiliza transaction para asegurar que tanto la creación de la subasta
  // como la creación del registro de la tabla intermedia(UserAuction) se realicen de manera atómica.
  async create(createTransactionDto: CreateTransactionDto) {
    // Inicia la transacción
    const transaction = await this.sequelize.transaction();
    try {
      // Obtener el producto para extraer el userId
      const product = await this.productModel.findOne({
        where: { id: createTransactionDto.productId },
        transaction, // Indica que esta operación se realizar dentro de la transacción
      });

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      const newTransaction = await Transaction.create(
        {
          id: uuidv4(),
          ...createTransactionDto,
        },
        { transaction }, //Indicar que esta operación se realiza dentro de la transacción
      );

      // Crear registro de la tabla intermedia con UUID
      await this.userAuctionModel.create(
        {
          id: uuidv4(),
          valueBid: newTransaction.initialBid,
          hourBid: new Date(),
          userId: product.userId,
          transactionId: newTransaction.id, // Utiliza el id de la subasta creada
        },
        { transaction },
      );

      // Confirmar la transacción para aplicar los cambios
      await transaction.commit();

      // Si todo ha ido bien, se retorna la nueva trasacción creada
      return { success: true, data: newTransaction };
    } catch (error) {
      // En caso de error, deshace cualquier cambio realizado dentro de la transacción
      await transaction.rollback();
      console.log(error);
      throw new HttpException(
        'Error creating transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
