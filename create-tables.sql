CREATE DATABASE `curso_node` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- curso_node.usuarios definition

CREATE TABLE `curso_node`.`usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edad` int NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- curso_node.tareas definition

CREATE TABLE `curso_node`.`tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prioridad` enum('urgent','monthly','daily') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'diaria',
  `ponderacion` decimal(4,2) NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuariotarea_fk` (`usuario_id`),
  CONSTRAINT `usuariotarea_fk` FOREIGN KEY (`usuario_id`) REFERENCES `curso_node`.`usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
