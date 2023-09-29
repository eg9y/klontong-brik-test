// src/seeder/seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ShopItemService } from '../shop-item/shop-item.service';
import { UserService } from 'src/user/user.service';
import { shoppingItems } from './items';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly shopItemService: ShopItemService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedShopItems();
    await this.seedUser();
  }

  private async seedShopItems(): Promise<void> {
    this.shopItemService.deleteAll();

    for (const item of shoppingItems) {
      await this.shopItemService.create(item);
    }

    for (const item of shoppingItems) {
      await this.shopItemService.create({
        ...item,
        name: item.name + '-2',
      });
    }

    for (const item of shoppingItems) {
      await this.shopItemService.create({
        ...item,
        name: item.name + '-3',
      });
    }

    for (const item of shoppingItems) {
      await this.shopItemService.create({
        ...item,
        name: item.name + '-4',
      });
    }
  }

  private async seedUser(): Promise<void> {
    const defaultUser = await this.userService.findByName('default');
    if (!defaultUser) {
      await this.userService.create('default', 'password123');
    }
  }
}
