
-- criação do banco 
CREATE DATABASE IF NOT EXISTS pet_management;

USE pet_management;


-- tabela de tutores
CREATE TABLE IF NOT EXISTS tutor (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    cpf CHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

-- tabela categoria de tamanho pets
CREATE TABLE IF NOT EXISTS categoria_pet (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(20) NOT NULL UNIQUE
);


-- tabela de pets
CREATE TABLE IF NOT EXISTS pet (
    id_pet INT AUTO_INCREMENT PRIMARY KEY,
    nome_pet VARCHAR(100) NOT NULL,
    raca_pet VARCHAR(80),
    sexo_pet CHAR(1) NOT NULL,
    altura_cm DECIMAL(5,2) NOT NULL,
    id_tutor INT NOT NULL,
    id_categoria INT NOT NULL,

    CONSTRAINT chk_pet_sexo
        CHECK (sexo_pet IN ('M', 'F')),

    CONSTRAINT chk_pet_altura
        CHECK (altura_cm >= 0),

    FOREIGN KEY (id_tutor)
        REFERENCES tutor(id_tutor),

    FOREIGN KEY (id_categoria)
        REFERENCES categoria_pet(id_categoria)
);


