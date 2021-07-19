CREATE DATABASE membresia;

USE membresia;

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `nombreEmpresa` varchar(60) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaActualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `empresa` (`id`, `nombreEmpresa`, `fechaCreacion`, `fechaActualizacion`) VALUES
(12, 'Netflix', '2021-03-05 12:55:05', '2021-03-05 13:18:46'),
(14, 'Prime video', '2021-03-05 12:58:02', NULL),
(15, 'HBO+', '2021-03-05 12:58:06', NULL);


DELIMITER $$
CREATE TRIGGER `fechas` BEFORE INSERT ON `empresa` FOR EACH ROW set new.fechaCreacion = (SELECT now())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `fechasUpdate` BEFORE UPDATE ON `empresa` FOR EACH ROW set new.fechaActualizacion = (SELECT now())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `membresiasEmpresa` BEFORE DELETE ON `empresa` FOR EACH ROW DELETE FROM `membresia` WHERE `membresia`.`idEmpresa` = old.id
$$
DELIMITER ;

CREATE TABLE `membresia` (
  `id` int(11) NOT NULL,
  `nombreMembresia` varchar(60) NOT NULL,
  `tipo` varchar(60) NOT NULL,
  `duracion` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaActualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `membresia` (`id`, `nombreMembresia`, `tipo`, `duracion`, `precio`, `idEmpresa`, `fechaCreacion`, `fechaActualizacion`) VALUES
(16, 'HBO CHANNEL', 'PLUS', 5, 13000, 15, '2021-03-05 21:59:17', '2021-03-08 11:38:59'),
(17, '2 Pantallas', 'Mediun', 5, 12000, 12, '2021-03-05 21:59:23', '2021-03-07 18:03:17'),
(18, '1 Pantalla', 'Standar', 5, 1000, 12, '2021-03-05 21:59:27', '2021-03-07 19:08:46'),
(19, 'Prime Gaming', 'Standar', 5, 15000, 14, '2021-03-05 21:59:36', '2021-03-08 11:38:27'),
(20, '3 Pantallas', 'semi-medium', 5, 5000, 12, '2021-03-05 22:04:02', '2021-03-08 11:37:45'),
(23, '4 Pantallas', 'Premium', 20, 15000, 12, '2021-03-07 17:31:12', NULL);

DELIMITER $$
CREATE TRIGGER `eliminarMembresia` BEFORE DELETE ON `membresia` FOR EACH ROW DELETE FROM `membresiacomprada` WHERE `membresiacomprada`.`idMembresia` = old.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `fechaMUp` BEFORE UPDATE ON `membresia` FOR EACH ROW set new.fechaActualizacion = (SELECT now())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `fechaMembresia` BEFORE INSERT ON `membresia` FOR EACH ROW set new.fechaCreacion = (SELECT now())
$$
DELIMITER ;


CREATE TABLE `membresiacomprada` (
  `id` int(11) NOT NULL,
  `idMembresia` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `fechaFinMembresia` datetime NOT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `fechaActualizacion` datetime DEFAULT NULL,
  `cuenta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `membresiacomprada` (`id`, `idMembresia`, `idPersona`, `fechaFinMembresia`, `fechaCreacion`, `fechaActualizacion`, `cuenta`) VALUES
(12, 19, 2, '2021-03-08 14:00:05', '2021-03-07 14:00:05', NULL, 1),
(24, 17, 3, '2021-03-12 17:29:21', '2021-03-07 17:29:21', NULL, 1),
(26, 16, 3, '2021-03-12 17:29:25', '2021-03-07 17:29:25', NULL, 1),
(36, 23, 2, '2021-03-27 17:31:37', '2021-03-07 17:31:37', NULL, 1),
(38, 23, 1, '2021-03-27 20:39:01', '2021-03-07 20:39:01', NULL, 1),
(39, 17, 1, '2021-03-12 21:14:53', '2021-03-07 21:14:53', NULL, 1);

DELIMITER $$
CREATE TRIGGER `fechaCompra` BEFORE INSERT ON `membresiacomprada` FOR EACH ROW set new.fechaCreacion = (SELECT now()), new.cuenta = 1
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `fechaCompraUp` BEFORE UPDATE ON `membresiacomprada` FOR EACH ROW set new.fechaActualizacion = (SELECT now()), new.cuenta = (old.cuenta+1)
$$
DELIMITER ;



CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nombrePersona` varchar(60) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaActualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `persona` (`id`, `nombrePersona`, `fechaCreacion`, `fechaActualizacion`) VALUES
(1, 'Harold', '2021-03-05 16:49:30', NULL),
(2, 'Leyda', '2021-03-05 16:49:34', '2021-03-07 21:13:30'),
(3, 'Danna', '2021-03-05 16:49:38', NULL);

DELIMITER $$
CREATE TRIGGER `eliminarCompra` BEFORE DELETE ON `persona` FOR EACH ROW DELETE FROM `membresiacomprada` WHERE `membresiacomprada`.`idPersona` = old.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `fechaUpdatePersonas` BEFORE UPDATE ON `persona` FOR EACH ROW set new.fechaActualizacion = (SELECT now())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `fechasPersonas` BEFORE INSERT ON `persona` FOR EACH ROW set new.fechaCreacion = (SELECT now())
$$
DELIMITER ;


ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `membresia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmpresa` (`idEmpresa`);

ALTER TABLE `membresiacomprada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPersona` (`idPersona`),
  ADD KEY `idMembresia` (`idMembresia`) USING BTREE;

ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `membresia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

ALTER TABLE `membresiacomprada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


ALTER TABLE `membresia`
  ADD CONSTRAINT `membresia_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`id`);


ALTER TABLE `membresiacomprada`
  ADD CONSTRAINT `membresiacomprada_ibfk_1` FOREIGN KEY (`idMembresia`) REFERENCES `membresia` (`id`),
  ADD CONSTRAINT `membresiacomprada_ibfk_2` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`id`);

