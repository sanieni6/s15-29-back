import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.entity';

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
  nombre: string;

  @Column({
    type: DataType.STRING,
  })
  descripcion: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  precio_inicial: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imagen: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  category: string;

  @BelongsTo(() => Category)
  categoryEntity: Category;
}
