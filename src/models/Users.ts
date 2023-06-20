import {
  AllowNull,
  AutoIncrement,
  Column, DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Orders } from './Orders';
import { Favorites } from './Favorites';
import { Cart } from './Cart';
import { Token } from './Token';

@Table({
  tableName: 'users',
  createdAt: true,
  updatedAt: true,
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

  @HasOne(() => Token)
    token: Token;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    password: string;

  @AllowNull(true)
  @Column({
    field: 'activation_token',
    type: DataType.STRING,
  })
    activationToken: string | null;
}
