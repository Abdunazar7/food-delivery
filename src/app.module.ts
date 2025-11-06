import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { VendorsModule } from './vendors/vendors.module';
import { UserAddressesModule } from './user_addresses/user_addresses.module';
import { VendorAddressesModule } from './vendor_addresses/vendor_addresses.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { MenuCategoryModule } from './menu_category/menu_category.module';
import { ItemCategoryModule } from './item_category/item_category.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    UsersModule,

    AdminsModule,

    RegionsModule,

    DistrictsModule,

    VendorsModule,

    UserAddressesModule,

    VendorAddressesModule,

    MenuItemsModule,

    MenuCategoryModule,

    ItemCategoryModule,

  ],
})
export class AppModule {}
