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
import { Products } from './Products';

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

  @ForeignKey(() => Products)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    products_id: string;

  @BelongsTo(() => Products)
    product: Products;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    quantity: number;
}
