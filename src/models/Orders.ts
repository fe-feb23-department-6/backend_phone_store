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

  @ForeignKey(() => Users)
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
    user_id: number;

  @BelongsTo(() => Users)
    user: Users | null;
}
