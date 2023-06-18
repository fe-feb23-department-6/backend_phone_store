import {
  AllowNull,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Products } from './Products';

@Table({
  tableName: 'phones',
  createdAt: false,
  updatedAt: false,
})

export class Phones extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    id: string;

  @HasOne(() => Products)
    products: Products;

  @AllowNull(false)
  @Column({
    field: 'namespace_id',
    type: DataType.STRING,
  })
    namespaceId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    field: 'capacity_available',
    type: DataType.ARRAY(DataType.STRING),
  })
    capacityAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    field: 'price_regular',
    type: DataType.INTEGER,
  })
    priceRegular: number;

  @AllowNull(false)
  @Column({
    field: 'price_discount',
    type: DataType.INTEGER,
  })
    priceDiscount: number;

  @AllowNull(false)
  @Column({
    field: 'colors_available',
    type: DataType.ARRAY(DataType.STRING),
  })
    colorsAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
    images: string[];

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.JSONB),
  })
    description: Array<{ title: string, text: string[] }>;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    resolution: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    processor: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    camera: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    zoom: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
    cell: string[];
}
