import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserAuction } from 'src/user-auction/entities/user-auction.entity';

@Table({
  tableName: 'Users',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @HasMany(() => Product)
  products: Product[];

  // Relations
  @HasMany(() => Auction)
  auctions: Auction[];

  @BelongsToMany(() => Auction, () => UserAuction)
  auctionsAsUser: Auction[];
}
