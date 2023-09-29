import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ShopItemService } from './shop-item.service';
import { CreateShopItemDto } from './create-shop-item.dto';

@Controller('shop-item')
export class ShopItemController {
  constructor(private readonly shopItemService: ShopItemService) {}

  @Get('get-items')
  async getItems(@Query('skip') skip = 0, @Query('take') take = 8) {
    return this.shopItemService.getItems(skip, take);
  }

  // get count
  @Get('get-count')
  async getCount() {
    return this.shopItemService.getCount();
  }

  @Post('add-item')
  async addItem(
    @Body(ValidationPipe) createShopItemDto: CreateShopItemDto,
  ): Promise<void> {
    await this.shopItemService.create(createShopItemDto);
  }
}
