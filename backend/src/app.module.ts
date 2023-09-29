import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as session from 'express-session';
import config from './typeorm.config';
import { UserService } from './user/user.service';
import { ShopItemModule } from './shop-item/shop-item.module';
import { SeederService } from './seeder/seeder.service';
import { ShopItemService } from './shop-item/shop-item.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), // assuming you have a TypeORM configuration set up
    AuthModule,
    UserModule,
    ShopItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService, ShopItemService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
  }
}
