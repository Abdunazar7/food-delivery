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
import { CategoriesModule } from './categories/categories.module';
import { VendorCategoryModule } from './vendor_category/vendor_category.module';
import { CouriersModule } from './couriers/couriers.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { CourierAssignmentsModule } from './courier_assignments/courier_assignments.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ReportsModule } from './reports/reports.module';



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
      // dropSchema: true,
      logging: false,
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

    CategoriesModule,

    VendorCategoryModule,

    CouriersModule,

    OrdersModule,

    OrderItemsModule,

    CourierAssignmentsModule,

    PaymentsModule,

    ReviewsModule,

    AuthModule,

    MailModule,

    ReportsModule,

  ],
})
export class AppModule {}
