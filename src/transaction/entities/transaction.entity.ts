import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PaymentOrder } from 'src/payment-orders/entities/payment-order.entity';
import { Product } from 'src/products/entities/product.entity';
import { UserAuction } from 'src/user-auction/entities/user-auction.entity';
import { User } from 'src/users/entities/users.entity';

export enum AuctionType {
  TraditionalAuctions = 'traditional auctions',
  DirectPurchase = 'direct purchase',
  JudicialAuctions = 'judicial auctions',
}

@Table({
  tableName: 'Transactions',
})
export class Transaction extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  initialBid: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: Date;

  @Column({
    type: DataType.ENUM,
    values: Object.values(AuctionType),
    allowNull: false,
  })
  auctionType: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  winnerId?: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  productId: string;

  @ForeignKey(() => PaymentOrder)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId: string;

  // Relations

  // 1 -> 1: One Transaction has one product
  @BelongsTo(() => Product)
  product: Product;

  // 1 -> N: One Transaction belongs to a PaymentOrder
  @BelongsTo(() => PaymentOrder)
  paymentOrder: PaymentOrder;

  // N -> N: Many Transactions can have many users (bidders)
  @BelongsToMany(() => User, () => UserAuction)
  users: User[];
}
