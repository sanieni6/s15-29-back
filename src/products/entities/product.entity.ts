import {
  AfterCreate,
  AfterUpdate,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

export enum StateProduct {
  Active = 'publish',
  Inactive = 'draft',
}

@Table({
  tableName: 'Products',
})
export class Product extends Model {
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
  title: string;

  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.DOUBLE,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  selled: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_categories: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status: StateProduct;
}
