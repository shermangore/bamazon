USE `bamazon`;
# Insert seed records into Products table
INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES 
	('Zojirushi rice cooker', 'Household', 100.00, 223),
	('LG 55-inch LED TV', 'Electronics', 1500.00, 556),
	('Roku Premiere+', 'Electronics', 49.99, 762),
	('Grokking Algorithms', 'Books', 27.48, 357),
	('Stanley Tape Measure', 'Tools and Garden', 7.00, 1),
	('Adidas Serrano', 'Shoes and Clothing', 72.98, 22),
	('Duracell AA Batteries - 12 pack', 'Electronics', 6.45, 45),
	('Post-It Notes', 'Office Supplies', 2.25, 44),
	('MacBook Pro 15-inch Retina', 'Computers', 2300.00, 4),
	('Excedrin', 'Personal Hygiene', 11.94, 40);

# Insert seed records into Departments table
USE `bamazon`;
INSERT INTO departments (`department_name`, overhead_costs) 
VALUES 
	('Household', 234.54), 
    ('Electronics', 23548.22), 
    ('Books', 100.03), 
    ('Tools and Garden', 2514.00), 
    ('Shoes and Clothing', 454.19), 
    ('Office Supplies', 199.22), 
    ('Computers', 19875.55), 
    ('Personal Hygiene', 55.55);
