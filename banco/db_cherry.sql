-- MySQL Script generated by MySQL Workbench
-- Wed Aug 19 22:04:51 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_cherry
-- -----------------------------------------------------
-- Banco de dados do sistema Cherry. Armazena informações dos usuários, produtos da padaria, e vendas efetuadas.
DROP SCHEMA IF EXISTS `db_cherry` ;

-- -----------------------------------------------------
-- Schema db_cherry
--
-- Banco de dados do sistema Cherry. Armazena informações dos usuários, produtos da padaria, e vendas efetuadas.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_cherry` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `db_cherry` ;

-- -----------------------------------------------------
-- Table `db_cherry`.`tipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_cherry`.`tipo` ;

CREATE TABLE IF NOT EXISTS `db_cherry`.`tipo` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Identificação do tipo de conta.',
  `nome` VARCHAR(45) NOT NULL COMMENT 'Nome do tipo da conta do usuário referente ao cargo do mesmo.',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_cherry`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_cherry`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `db_cherry`.`usuarios` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Identificação do usuário.',
  `nome` VARCHAR(45) NOT NULL COMMENT 'Nome do usuário.',
  `email` VARCHAR(45) NOT NULL COMMENT 'Endereço de e-mail do usuário.',
  `senha` VARCHAR(25) NOT NULL COMMENT 'Senha criptografada do usuário.',
  `ativo` TINYINT NOT NULL COMMENT 'Informa se o usuário pode acessar o sistema ou não.',
  `tipo_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'ID do registro respectivo ao tipo de conta do usuário.',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_usuarios_tipo1_idx` (`tipo_id` ASC),
  CONSTRAINT `fk_usuarios_tipo1`
    FOREIGN KEY (`tipo_id`)
    REFERENCES `db_cherry`.`tipo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_cherry`.`produtos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_cherry`.`produtos` ;

CREATE TABLE IF NOT EXISTS `db_cherry`.`produtos` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Identificação do produto.',
  `nome` VARCHAR(20) NOT NULL COMMENT 'Nome do produto.',
  `valor` DECIMAL(7,2) UNSIGNED NOT NULL COMMENT 'Valor monetário do produto em reais.',
  `usuario_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'Identificação do usuário que cadastrou o produto.',
  PRIMARY KEY (`id`),
  INDEX `fk_produtos_usuarios1_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_produtos_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `db_cherry`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_cherry`.`vendas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_cherry`.`vendas` ;

CREATE TABLE IF NOT EXISTS `db_cherry`.`vendas` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Identificação da venda.',
  `valor` DECIMAL(7,2) UNSIGNED NOT NULL COMMENT 'Valor total da venda.',
  `dt_realizado` DATETIME NOT NULL COMMENT 'Data em que a venda foi efetuada.',
  `usuario_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'Identificação do usuário que efetuou a venda.',
  PRIMARY KEY (`id`),
  INDEX `fk_vendas_usuarios1_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_vendas_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `db_cherry`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_cherry`.`produtos_vendidos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_cherry`.`produtos_vendidos` ;

CREATE TABLE IF NOT EXISTS `db_cherry`.`produtos_vendidos` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Identificação do registro.',
  `quantidade` INT UNSIGNED NOT NULL COMMENT 'Quantidade do produto que foi vendida.',
  `valor_unit` DECIMAL(7,2) UNSIGNED NOT NULL COMMENT 'Valor unitário do produto na hora da venda.',
  `venda_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'Identificação da venda.',
  `produto_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'Identificação do produto.',
  PRIMARY KEY (`id`),
  INDEX `fk_produtos_vendidos_vendas1_idx` (`venda_id` ASC),
  INDEX `fk_produtos_vendidos_produtos1_idx` (`produto_id` ASC),
  CONSTRAINT `fk_produtos_vendidos_vendas1`
    FOREIGN KEY (`venda_id`)
    REFERENCES `db_cherry`.`vendas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produtos_vendidos_produtos1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `db_cherry`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_cherry`.`log_alteracao_vendas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_cherry`.`log_alteracao_vendas` ;

CREATE TABLE IF NOT EXISTS `db_cherry`.`log_alteracao_vendas` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Identificação do log.',
  `dados` VARCHAR(100) NOT NULL COMMENT 'Objeto referente a venda em formato de string.',
  `vendas_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'Identificação da venda.',
  `usuarios_id` INT UNSIGNED ZEROFILL NOT NULL COMMENT 'Identificação do usuário que realizou a alteração.',
  PRIMARY KEY (`id`),
  INDEX `fk_log_alteracao_vendas_vendas1_idx` (`vendas_id` ASC),
  INDEX `fk_log_alteracao_vendas_usuarios1_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_log_alteracao_vendas_vendas1`
    FOREIGN KEY (`vendas_id`)
    REFERENCES `db_cherry`.`vendas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_alteracao_vendas_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `db_cherry`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
