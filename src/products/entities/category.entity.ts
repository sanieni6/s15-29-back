import { Product } from './product.entity';
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

@Table({
  tableName: 'Category',
})
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM(
      'arte',
      'antigüedades',
      'coleccionables',
      'tecnología',
      'vehículos',
      'bienes inmuebles',
    ),
    allowNull: false,
  })
  type: string;
}
