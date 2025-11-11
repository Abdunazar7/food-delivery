SELECT
    mi.id AS item_id,
    mi.name AS item_name,
    v.name AS vendor_name,
    SUM(oi.quantity) AS total_quantity_sold
FROM
    menu_items mi
    JOIN order_items oi ON mi.id = oi.menu_item_id
    JOIN vendors v ON mi.vendor_id = v.id
GROUP BY
    mi.id,
    mi.name,
    v.name
ORDER BY total_quantity_sold DESC
LIMIT 5;

SELECT
    c.id AS courier_id,
    c.full_name AS courier_name,
    COUNT(ca.id) AS total_deliveries,
    COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating
FROM
    couriers c
    LEFT JOIN courier_assignments ca ON c.id = ca.courier_id
    LEFT JOIN reviews r ON c.id = r.target_id
    AND r.target_type = 'courier'
GROUP BY
    c.id,
    c.full_name
ORDER BY
    average_rating DESC,
    total_deliveries DESC;

SELECT
    u.id AS user_id,
    u.full_name AS customer_name,
    COUNT(o.id) AS total_orders
FROM users u
    JOIN orders o ON u.id = o.user_id
GROUP BY
    u.id,
    u.full_name
ORDER BY total_orders DESC
LIMIT 5;