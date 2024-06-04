import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'PaymentOrders',
})
export class PaymentOrder extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isPaid: boolean;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  tax: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  subTotal: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total: number;

  //TODO: Relations
}
