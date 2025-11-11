import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";

@Injectable()
export class ReportsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  /**
   * 1️ Eng ko‘p tushum olib kelgan 5 ta vendor (restoran)
   */
  async topRevenueVendors() {
    const sqlQuery = `
      SELECT
        v.id AS vendor_id,
        v.name AS vendor_name,
        COALESCE(SUM(o.total_price), 0) AS total_revenue
      FROM vendors v
      LEFT JOIN orders o ON o.vendor_id = v.id AND o.status = 'delivered'
      GROUP BY v.id, v.name
      ORDER BY total_revenue DESC
      LIMIT 5;
    `;
    return this.entityManager.query(sqlQuery);
  }

  /**
   * 2️ Oylar kesimida umumiy buyurtmalar soni
   */
  async monthlyOrderVolume() {
    const sqlQuery = `
      SELECT
        TO_CHAR(o.created_at, 'YYYY-MM') AS month,
        COUNT(o.id) AS total_orders
      FROM orders o
      GROUP BY TO_CHAR(o.created_at, 'YYYY-MM')
      ORDER BY month;
    `;
    return this.entityManager.query(sqlQuery);
  }

  /**
   * 3️ Eng ko‘p sotilgan 5 ta menu mahsulotlari
   */
  async topSellingItems() {
    const sqlQuery = `
      SELECT
        mi.id AS item_id,
        mi.name AS item_name,
        v.name AS vendor_name,
        SUM(oi.quantity) AS total_quantity_sold
      FROM menu_items mi
      JOIN order_items oi ON mi.id = oi.menu_item_id
      JOIN vendors v ON mi.vendor_id = v.id
      GROUP BY mi.id, mi.name, v.name
      ORDER BY total_quantity_sold DESC
      LIMIT 5;
    `;
    return this.entityManager.query(sqlQuery);
  }

  /**
   * 4️ Kuryerlar faoliyati statistikasi (o‘rtacha reyting va yetkazish soni)
   */
  async courierPerformance() {
    const sqlQuery = `
      SELECT
        c.id AS courier_id,
        c.full_name AS courier_name,
        COUNT(ca.id) AS total_deliveries,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating
      FROM couriers c
      LEFT JOIN courier_assignments ca ON c.id = ca.courier_id
      -- Reviewlar jadvalidan faqat kuryerga tegishli reytinglarni olamiz
      LEFT JOIN reviews r ON c.id = r.target_id AND r.target_type = 'courier'
      GROUP BY c.id, c.full_name
      ORDER BY average_rating DESC, total_deliveries DESC;
    `;
    return this.entityManager.query(sqlQuery);
  }

  /**
   * 5️ Eng faol 5 ta mijoz (buyurtmalar soni bo‘yicha)
   */
  async mostActiveCustomers() {
    const sqlQuery = `
      SELECT
        u.id AS user_id,
        u.full_name AS customer_name,
        COUNT(o.id) AS total_orders
      FROM users u
      JOIN orders o ON u.id = o.user_id
      GROUP BY u.id, u.full_name
      ORDER BY total_orders DESC
      LIMIT 5;
    `;
    return this.entityManager.query(sqlQuery);
  }
}
