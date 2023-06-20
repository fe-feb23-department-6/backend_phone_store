import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './Users';

@Table({
  tableName: 'token',
  createdAt: true,
  updatedAt: true,
})

export class Token extends Model {
  @AllowNull(false)
  @Column({
    field: 'refresh_token',
    type: DataType.STRING,
  })
    refreshToken: string;

  @ForeignKey(() => Users)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
  })
    userId: number;

  @BelongsTo(() => Users)
    user: Users;
}
