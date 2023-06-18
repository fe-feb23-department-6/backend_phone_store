import {
  AllowNull,
  AutoIncrement,
  Column, DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Orders } from './Orders';
import { Favorites } from './Favorites';
import { Cart } from './Cart';

@Table({
  tableName: 'users',
  createdAt: true,
  updatedAt: false,
})

export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    id: number;

  @HasMany(() => Orders)
    order: Orders;

  @HasMany(() => Favorites)
    favorite: Favorites;

  @HasMany(() => Cart)
    cart: Cart;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    password: string;
}
