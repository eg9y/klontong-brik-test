import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ShopItemService } from './shop-item.service';
import { CreateShopItemDto } from './create-shop-item.dto';
import { ShopItem } from './shop-item.entity';

@Controller('shop-item')
export class ShopItemController {
  constructor(private readonly shopItemService: ShopItemService) {}

  @Get('get-items')
  async getItems(
    @Query('searchQuery', ValidationPipe) searchQuery?: string,
    @Query('skip') skip = 0,
    @Query('take') take = 8,
  ) {
    return this.shopItemService.getItems(skip, take, searchQuery);
  }

  @Get('get-item/:id')
  async getItem(@Param('id') id: number) {
    return this.shopItemService.getItem(id);
  }

  // get count
  @Get('get-count')
  async getCount() {
    return this.shopItemService.getCount();
  }

  @Post('add-item')
  async addItem(
    @Body(ValidationPipe) createShopItemDto: CreateShopItemDto,
  ): Promise<ShopItem> {
    return this.shopItemService.create(createShopItemDto);
  }
}
