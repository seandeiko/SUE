CREATE DATABASE sue;

USE sue;

CREATE TABLE `alunos` (
  `aluno_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `endereco` varchar(255) NOT NULL,
  PRIMARY KEY (`aluno_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `coordenadores` (
  `coordenador_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `endereco` varchar(255) NOT NULL,
  PRIMARY KEY (`coordenador_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `disciplina` (
  `disciplina_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_disciplina` varchar(50) NOT NULL,
  `carga_horaria` int(11) NOT NULL,
  `descricao_disciplina` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`disciplina_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `notas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `disciplina_id` int(11) NOT NULL,
  `professor_id` int(11) NOT NULL,
  `data_nota` datetime NOT NULL,
  `nota` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`aluno_id`),
  KEY `disciplina_id` (`disciplina_id`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`aluno_id`),
  CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplina` (`disciplina_id`),
  CONSTRAINT `notas_ibfk_3` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`professor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `presencas` (
  `presenca_id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `data` date NOT NULL,
  `presente` tinyint(1) NOT NULL,
  PRIMARY KEY (`presenca_id`),
  KEY `aluno_id` (`aluno_id`),
  KEY `turma_id` (`turma_id`),
  CONSTRAINT `presencas_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`aluno_id`),
  CONSTRAINT `presencas_ibfk_2` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`turma_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `professores` (
  `professor_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `endereco` varchar(255) NOT NULL,
  PRIMARY KEY (`professor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `turmas` (
  `turma_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_turma` text NOT NULL,
  `turno` enum('Manhã','Tarde','Noite') NOT NULL,
  `ano` year(4) NOT NULL,
  `semestre` enum('primeiro','segundo') NOT NULL,
  PRIMARY KEY (`turma_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
