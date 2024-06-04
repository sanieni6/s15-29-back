import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/products/entities/product.entity';

@Table({
  tableName: 'Users',
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
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
}
