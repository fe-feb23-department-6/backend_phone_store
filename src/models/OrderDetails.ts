import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column, DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Orders } from './Orders';
import { Phones } from './Phones';

@Table({
  tableName: 'order_details',
  createdAt: false,
  updatedAt: false,
})

export class OrderDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    id: number;

  @ForeignKey(() => Orders)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    order_id: number;

  @BelongsTo(() => Orders)
    order: Orders | null;

  @ForeignKey(() => Phones)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    phone_id: string;

  @BelongsTo(() => Phones)
    phone: Phones;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    quantity: number;
}
