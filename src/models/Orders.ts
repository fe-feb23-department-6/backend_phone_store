import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column, DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Users } from './Users';
import { OrderDetails } from './OrderDetails';

@Table({
  tableName: 'orders',
  createdAt: true,
  updatedAt: false,
})

export class Orders extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    id: number;

  @HasMany(() => OrderDetails)
    order_detail: OrderDetails;

  @ForeignKey(() => Users)
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
    user_id: number;

  @BelongsTo(() => Users)
    user: Users | null;
}
