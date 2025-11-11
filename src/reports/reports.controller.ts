import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ReportsService } from "./reports.service";
// import { UserAuthGuard } from "../common/guards/user-auth.guard";
// import { RolesGuard } from "../common/guards/roles.guard";
// import { Roles, UserRole } from "../app.constants";

@ApiTags("Food Delivery Reports")
@Controller("reports")
// @UseGuards(UserAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: "Top 5 vendors by total revenue generated" })
  // @Roles(UserRole.ADMIN)
  @Get("top-revenue-vendors")
  topRevenueVendors() {
    return this.reportsService.topRevenueVendors();
  }

  @ApiOperation({
    summary: "Total number of orders grouped by month (YYYY-MM)",
  })
  // @Roles(UserRole.ADMIN)
  @Get("monthly-orders")
  monthlyOrderVolume() {
    return this.reportsService.monthlyOrderVolume();
  }

  @ApiOperation({ summary: "Top 5 menu items by quantity sold" })
  // @Roles(UserRole.ADMIN)
  @Get("top-selling-items")
  topSellingItems() {
    return this.reportsService.topSellingItems();
  }

  @ApiOperation({
    summary: "Courier performance (total deliveries and average rating)",
  })
  // @Roles(UserRole.ADMIN)
  @Get("courier-performance")
  courierPerformance() {
    return this.reportsService.courierPerformance();
  }

  @ApiOperation({ summary: "Top 5 customers by total order count" })
  // @Roles(UserRole.ADMIN)
  @Get("most-active-customers")
  mostActiveCustomers() {
    return this.reportsService.mostActiveCustomers();
  }
}
