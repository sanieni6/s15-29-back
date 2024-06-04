import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';
import { UserAuction } from 'src/user-auction/entities/user-auction.entity';
import { User } from 'src/users/entities/users.entity';

export enum AuctionType {
  TraditionalAuctions = 'traditional auctions',
  DirectPurchase = 'direct purchase',
  JudicialAuctions = 'judicial auctions',
}

@Table({
  tableName: 'Auctions',
})
export class Auction extends Model {
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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  productId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  // Relations

  // 1 -> 1: One auction has one product
  @BelongsTo(() => Product)
  product: Product;

  // N -> 1: Many auctions are created by one user
  @BelongsTo(() => User)
  user: User;

  // N -> N: Many auctions can have many users (bidders)
  @BelongsToMany(() => User, () => UserAuction)
  users: User[];
}
