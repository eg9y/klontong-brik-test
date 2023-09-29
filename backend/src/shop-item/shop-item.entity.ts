// src/shop-item/shop-item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CategoryId: number;

  @Column()
  categoryName: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  width: number;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  image: string;

  @Column()
  harga: number;
}
