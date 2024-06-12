import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/users/entities/users.entity';

@Table({
  tableName: 'PaymentOrders',
})
export class PaymentOrder extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isPaid: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  paidAt?: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  tax: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  subTotal: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total: number;

  @Column({
    type: DataType.STRING,
  })
  paymentId?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  //Relations
  @HasMany(() => Transaction)
  transaction: Transaction[];

  // 1 -> N: One PaymentOrder belongs to a User
  @BelongsTo(() => User)
  user: User;
}
