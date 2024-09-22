CREATE DATABASE sue;

USE sue;

CREATE TABLE `alunos` (
  `aluno_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `endereco` varchar(255) NOT NULL,
  PRIMARY KEY (`aluno_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `coordenadores` (
  `coordenador_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `endereco` varchar(255) NOT NULL,
  PRIMARY KEY (`coordenador_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `professores` (
  `professor_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `genero` enum('Masculino','Feminino','Outro') NOT NULL,
  `endereco` varchar(255) NOT NULL,
  PRIMARY KEY (`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `turmas` (
  `turma_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_turma` text NOT NULL,
  `turno` enum('Manhã','Tarde','Noite') NOT NULL,
  `ano` year(4) NOT NULL,
  `semestre` enum('primeiro','segundo') NOT NULL,
  PRIMARY KEY (`turma_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `disciplina` (
  `disciplina_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_disciplina` varchar(50) NOT NULL,
  `carga_horaria` int(11) NOT NULL,
  `descricao_disciplina` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`disciplina_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Insert data into alunos
INSERT INTO alunos (nome, data_nascimento, genero, endereco) VALUES 
('João Silva', '2000-05-15', 'Masculino', 'Rua A, 123'),
('Maria Oliveira', '2001-07-20', 'Feminino', 'Rua B, 456');

-- Insert data into coordenadores
INSERT INTO coordenadores (nome, data_nascimento, genero, endereco) VALUES 
('Carlos Santos', '1985-03-10', 'Masculino', 'Avenida C, 789'),
('Ana Pereira', '1990-11-25', 'Feminino', 'Avenida D, 101');

-- Insert data into professores
INSERT INTO professores (nome, data_nascimento, genero, endereco) VALUES 
('Pedro Almeida', '1978-04-30', 'Masculino', 'Rua E, 112'),
('Lucia Costa', '1982-08-05', 'Feminino', 'Rua F, 131');

-- Insert data into turmas
INSERT INTO turmas (nome_turma, turno, ano, semestre) VALUES 
('Turma A', 'Manhã', 2024, 'primeiro'),
('Turma B', 'Tarde', 2024, 'segundo');

-- Insert data into disciplina
INSERT INTO disciplina (nome_disciplina, carga_horaria, descricao_disciplina, createdAt, updatedAt) VALUES 
('Matemática', 60, 'Disciplina de Matemática básica', NOW(), NOW()),
('História', 40, 'Disciplina de História do Brasil', NOW(), NOW());

-- Insert data into notas
INSERT INTO notas (aluno_id, disciplina_id, professor_id, data_nota, nota) VALUES 
(1, 1, 1, NOW(), 8.5),
(2, 2, 2, NOW(), 9.0);

-- Insert data into presencas
INSERT INTO presencas (aluno_id, turma_id, data, presente) VALUES 
(1, 1, '2024-09-01', 1),
(2, 2, '2024-09-01', 0);
