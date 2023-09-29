import { Module } from '@nestjs/common';
import { ShopItemService } from './shop-item.service';
import { ShopItemController } from './shop-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopItem])],
  providers: [ShopItemService],
  controllers: [ShopItemController],
  exports: [TypeOrmModule.forFeature([ShopItem])]
})
export class ShopItemModule {}
