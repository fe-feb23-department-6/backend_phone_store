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
  tableName: 'favorites',
  createdAt: true,
  updatedAt: false,
})

export class Favorites extends Model {
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
    producrts_id: string;

  @BelongsTo(() => Products)
    producrt: Products;
}
