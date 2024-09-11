CREATE OR REPLACE VIEW items_view as
SELECT items.* ,categories.* FROM items
INNER JOIN categories ON categories.categories_id = items.items_cat