SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `sfc` DEFAULT CHARACTER SET latin1 ;
USE `sfc` ;

-- -----------------------------------------------------
-- Table `sfc`.`Registered`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sfc`.`Registered` ;

CREATE TABLE IF NOT EXISTS `sfc`.`Registered` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `phonenumber` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `zip` INT NULL,
  `HomeGroup` VARCHAR(45) NULL,
  `BadgeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `phonenumber_UNIQUE` (`phonenumber` ASC),
  UNIQUE INDEX `firstname_UNIQUE` (`firstname` ASC),
  UNIQUE INDEX `lastname_UNIQUE` (`lastname` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 62
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
