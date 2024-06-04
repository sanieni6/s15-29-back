import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';

@Table({
  tableName: 'Products',
})
export class Product extends Model {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
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
