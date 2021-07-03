-- MySQL Script generated by MySQL Workbench
-- Sat Jul  3 20:24:05 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema socialmediarelations
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `socialmediarelations` ;

-- -----------------------------------------------------
-- Schema socialmediarelations
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `socialmediarelations` DEFAULT CHARACTER SET utf8mb4 ;
USE `socialmediarelations` ;

-- -----------------------------------------------------
-- Table `socialmediarelations`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `socialmediarelations`.`users` ;

CREATE TABLE IF NOT EXISTS `socialmediarelations`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `socialmediarelations`.`uploads`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `socialmediarelations`.`uploads` ;

CREATE TABLE IF NOT EXISTS `socialmediarelations`.`uploads` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `likes` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `likes` (`likes` ASC) VISIBLE,
  CONSTRAINT `uploads_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `socialmediarelations`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `socialmediarelations`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `socialmediarelations`.`comment` ;

CREATE TABLE IF NOT EXISTS `socialmediarelations`.`comment` (
  `idcomment` INT NOT NULL AUTO_INCREMENT,
  `commentaire` MEDIUMTEXT NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`idcomment`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  CONSTRAINT `comment_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `socialmediarelations`.`users` (`id`),
  CONSTRAINT `comment_ibfk_2`
    FOREIGN KEY (`post_id`)
    REFERENCES `socialmediarelations`.`uploads` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 52
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `socialmediarelations`.`likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `socialmediarelations`.`likes` ;

CREATE TABLE IF NOT EXISTS `socialmediarelations`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `likes_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `socialmediarelations`.`users` (`id`),
  CONSTRAINT `likes_ibfk_2`
    FOREIGN KEY (`post_id`)
    REFERENCES `socialmediarelations`.`uploads` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 44
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;