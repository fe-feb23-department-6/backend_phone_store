import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Phones } from './Phones';
import { OrderDetails } from './OrderDetails';
import { Cart } from './Cart';
import { Favorites } from './Favorites';

@Table({
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
})

export class Products extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    id: string;

  @HasMany(() => OrderDetails)
    order_details: OrderDetails;

  @HasMany(() => Cart)
    cart: Cart;

  @HasMany(() => Favorites)
    favorite: Favorites;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    category: string;

  @ForeignKey(() => Phones)
  @AllowNull(false)
  @Column({
    field: 'phone_id',
    type: DataType.STRING,
  })
    phoneId: string;

  @BelongsTo(() => Phones)
    phone: Phones | null;

  @AllowNull(false)
  @Column({
    field: 'item_id',
    type: DataType.STRING,
  })
    itemId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    field: 'full_price',
    type: DataType.INTEGER,
  })
    fullPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    price: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    year: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    image: string;
}
