import { Column, DataType, Model, Table } from 'sequelize-typescript';
// import { Product } from 'src/products/entities/product.entity';

export enum AuctionType {
  TraditionalAuctions = 'traditional auctions',
  DirectPurchase = 'direct purchase',
  JudicialAuctions = 'judicial auctions',
}

@Table({
  tableName: 'Auction',
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
    values: ['traditional auctions', 'direct purchase', 'judicial auctions'],
    allowNull: false,
  })
  auctionType: string;

  //TODO: relations
  //   @HasMany(() => Product)
  //   products: Product[];
}
