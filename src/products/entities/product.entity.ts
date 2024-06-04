import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import { Auction } from 'src/auction/entities/auction.entity';

@Table({
  tableName: 'Products',
})
export class Product extends Model {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty()
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  initial_price: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty()
  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId: string;

  // Relations
  // 1 -> 1: A product has one auction
  @HasOne(() => Auction)
  auction: Auction;

  // N -> 1: Many products belong to one category
  @BelongsTo(() => Category)
  categoryEntity: Category;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
