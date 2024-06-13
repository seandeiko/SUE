CREATE DATABASE SUE;

USE SUE;

CREATE TABLE Professores (
    professor_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    data_nascimento DATE,
    genero ENUM('Masculino', 'Feminino', 'Outro'),
    endereco VARCHAR(255)
);

CREATE TABLE Coordenadores (
    coordenador_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    data_nascimento DATE,
    genero ENUM('Masculino', 'Feminino', 'Outro'),
    endereco VARCHAR(255)
);

CREATE TABLE Alunos (
    aluno_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    data_nascimento DATE,
    genero ENUM('Masculino', 'Feminino', 'Outro'),
    endereco VARCHAR(255)
);

CREATE TABLE Disciplinas (
    disciplina_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    codigo VARCHAR(20),
    carga_horaria INT
);

CREATE TABLE Turmas (
    turma_id INT PRIMARY KEY AUTO_INCREMENT,
    ano_letivo YEAR,
    semestre ENUM('1', '2')
);

CREATE TABLE Notas (
    aluno_id INT,
    turma_id INT,
    disciplina_id INT,
    professor_id INT,
    data_nota DATE,
    nota FLOAT,
    FOREIGN KEY (aluno_id) REFERENCES Alunos(aluno_id),
    FOREIGN KEY (turma_id) REFERENCES Turmas(turma_id),
    FOREIGN KEY (disciplina_id) REFERENCES Disciplinas(disciplina_id),
    FOREIGN KEY (professor_id) REFERENCES Professores(professor_id)
);

CREATE TABLE Presencas (
    presenca_id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT,
    turma_id INT,
    data DATE,
    presente BOOLEAN,
    FOREIGN KEY (aluno_id) REFERENCES Alunos(aluno_id),
    FOREIGN KEY (turma_id) REFERENCES Turmas(turma_id)
);

CREATE TABLE ProfessorDisciplina (
    id INT PRIMARY KEY AUTO_INCREMENT,
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES Professores(professor_id),
    disciplina_id INT,
    FOREIGN KEY (disciplina_id) REFERENCES Disciplinas(disciplina_id)
);

CREATE TABLE Cronograma (
    evento_id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255),
    data_inicio DATE,
    data_fim DATE,
    tipo ENUM('Aula', 'Prova', 'Feriado', 'Recesso'),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES Professores(professor_id)
);
