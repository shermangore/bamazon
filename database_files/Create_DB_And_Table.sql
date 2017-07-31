DROP DATABASE IF EXISTS `bamazon`;
CREATE DATABASE `bamazon`;
USE `bamazon`;
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
	`item_id` int auto_increment NOT NULL,
    PRIMARY KEY (`item_id`),
    `product_name` varchar(255) NOT NULL,
    `department_name` varchar(100) NOT NULL,
    `price` decimal(12, 2) DEFAULT NULL,
    `stock_quantity` int NOT NULL
);

USE `bamazon`;
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
	`department_id` int auto_increment NOT NULL,
    PRIMARY KEY (`department_id`),
    `department_name` varchar(100) NOT NULL,
    `overhead_costs` decimal(12, 2) DEFAULT NULL
);

ALTER TABLE `products` ADD COLUMN `product_sales` decimal(12, 2);