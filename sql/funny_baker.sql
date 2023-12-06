-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema funny_baker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `funny_baker` ;

-- -----------------------------------------------------
-- Schema funny_baker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `funny_baker` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `funny_baker` ;

-- -----------------------------------------------------
-- Table `funny_baker`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `funny_baker`.`location` ;

CREATE TABLE IF NOT EXISTS `funny_baker`.`location` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `funny_baker`.`producer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `funny_baker`.`producer` ;

CREATE TABLE IF NOT EXISTS `funny_baker`.`producer` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `location` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_producer_location1_idx` (`location` ASC) VISIBLE,
  CONSTRAINT `fk_producer_location1`
    FOREIGN KEY (`location`)
    REFERENCES `funny_baker`.`location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `funny_baker`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `funny_baker`.`product` ;

CREATE TABLE IF NOT EXISTS `funny_baker`.`product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `producer` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_producer_idx` (`producer` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_product_producer`
    FOREIGN KEY (`producer`)
    REFERENCES `funny_baker`.`producer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `funny_baker`.`delivery`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `funny_baker`.`delivery` ;

CREATE TABLE IF NOT EXISTS `funny_baker`.`delivery` (
  `price` INT NULL,
  `quantity` INT NULL,
  `date` DATE NULL,
  `product` INT UNSIGNED NOT NULL,
  INDEX `fk_delivery_product1_idx` (`product` ASC) VISIBLE,
  CONSTRAINT `fk_delivery_product1`
    FOREIGN KEY (`product`)
    REFERENCES `funny_baker`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `funny_baker`.`sale`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `funny_baker`.`sale` ;

CREATE TABLE IF NOT EXISTS `funny_baker`.`sale` (
  `date` DATE NULL,
  `cost` INT NULL,
  `quantity` INT NULL,
  `product` INT UNSIGNED NOT NULL,
  INDEX `fk_sale_product1_idx` (`product` ASC) VISIBLE,
  CONSTRAINT `fk_sale_product1`
    FOREIGN KEY (`product`)
    REFERENCES `funny_baker`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `funny_baker`.`location`
-- -----------------------------------------------------
START TRANSACTION;
USE `funny_baker`;
INSERT INTO `funny_baker`.`location` (`id`, `name`) VALUES (1, 'Київ');
INSERT INTO `funny_baker`.`location` (`id`, `name`) VALUES (2, 'Львів');
INSERT INTO `funny_baker`.`location` (`id`, `name`) VALUES (3, 'Луцьк');

COMMIT;


-- -----------------------------------------------------
-- Data for table `funny_baker`.`producer`
-- -----------------------------------------------------
START TRANSACTION;
USE `funny_baker`;
INSERT INTO `funny_baker`.`producer` (`id`, `name`, `location`) VALUES (1, 'Теремно', 3);
INSERT INTO `funny_baker`.`producer` (`id`, `name`, `location`) VALUES (2, 'Кондитерська фабрика №1', 2);
INSERT INTO `funny_baker`.`producer` (`id`, `name`, `location`) VALUES (3, 'КиївХліб', 1);
INSERT INTO `funny_baker`.`producer` (`id`, `name`, `location`) VALUES (4, 'Рум\'янець', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `funny_baker`.`product`
-- -----------------------------------------------------
START TRANSACTION;
USE `funny_baker`;
INSERT INTO `funny_baker`.`product` (`id`, `name`, `producer`) VALUES (1, 'хліб висівковий', 3);
INSERT INTO `funny_baker`.`product` (`id`, `name`, `producer`) VALUES (2, 'торт \"Тірамісу\"', 2);
INSERT INTO `funny_baker`.`product` (`id`, `name`, `producer`) VALUES (3, 'булка здобна', 1);
INSERT INTO `funny_baker`.`product` (`id`, `name`, `producer`) VALUES (4, 'круасан з шоколадом', 4);
INSERT INTO `funny_baker`.`product` (`id`, `name`, `producer`) VALUES (5, 'батон', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `funny_baker`.`delivery`
-- -----------------------------------------------------
START TRANSACTION;
USE `funny_baker`;
INSERT INTO `funny_baker`.`delivery` (`price`, `quantity`, `date`, `product`) VALUES (1500, 5, '2023-12-09', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `funny_baker`.`sale`
-- -----------------------------------------------------
START TRANSACTION;
USE `funny_baker`;
INSERT INTO `funny_baker`.`sale` (`date`, `cost`, `quantity`, `product`) VALUES ('2023-12-15', 1600, 8, 2);
INSERT INTO `funny_baker`.`sale` (`date`, `cost`, `quantity`, `product`) VALUES ('2024-01-06', 210, 14, 5);

COMMIT;

