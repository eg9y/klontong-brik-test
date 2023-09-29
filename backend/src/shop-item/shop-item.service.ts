// src/shop-item/shop-item.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopItemService {
  constructor(
    @InjectRepository(ShopItem)
    private readonly shopItemRepository: Repository<ShopItem>,
  ) {}

  async create(data: Partial<ShopItem>): Promise<ShopItem> {
    const item = this.shopItemRepository.create(data);
    return this.shopItemRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    await this.shopItemRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.shopItemRepository.clear();
  }

  async getItem(id: number): Promise<ShopItem> {
    return this.shopItemRepository.findOne({
      where: { id },
    });
  }

  async getItems(
    skip = 0,
    take = 10,
    searchQuery?: string,
  ): Promise<ShopItem[]> {
    if (searchQuery) {
      return this.searchItems(searchQuery, skip, take);
    }
    return this.shopItemRepository.find({ skip, take });
  }

  async getCount(): Promise<number> {
    return this.shopItemRepository.count();
  }

  async searchItems(
    searchQuery: string,
    skip = 0,
    take = 10,
  ): Promise<ShopItem[]> {
    return this.shopItemRepository.find({
      where: [
        { name: ILike(`%${searchQuery}%`) },
        { description: ILike(`%${searchQuery}%`) },
      ],
      skip,
      take,
    });
  }
}
