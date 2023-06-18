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
import { Users } from './Users';
import { Products } from './Products';

@Table({
  tableName: 'cart',
  createdAt: true,
  updatedAt: false,
})

export class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    user_id: number;

  @BelongsTo(() => Users)
    user: Users | null;

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
