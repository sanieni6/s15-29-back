import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserAuction } from 'src/user-auction/entities/user-auction.entity';
import { User } from 'src/users/entities/users.entity';
import { Product } from 'src/products/entities/product.entity';

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
    type: DataType.CHAR,
    allowNull: false,
    unique: true,
  })
  auctioneer: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  initialBid: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  currentBid: number;

  @Column({
    type: DataType.CHAR,
    allowNull: false,
  })
  currentBidClient: string;

  @Column({
    type: DataType.CHAR,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(AuctionType),
    allowNull: false,
  })
  auctionType: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  //TODO: relations
  //   @HasMany(() => Product)
  //   products: Product[];

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => User, () => UserAuction)
  users: User[];
}
