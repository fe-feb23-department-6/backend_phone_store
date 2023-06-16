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
}
