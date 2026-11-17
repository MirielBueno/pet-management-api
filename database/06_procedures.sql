
USE pet_management;

-- PROCEDURE 1: Atualizar a altura de um pet
-- atualizar a altura pelo ID do pet.
-- O trigger BEFORE UPDATE atualiza a categoria automaticamente.

CREATE PROCEDURE sp_atualizar_altura_pet(
    IN p_id_pet INT,
    IN p_altura DECIMAL(5,2)
)
UPDATE pet
SET altura_cm = p_altura
WHERE id_pet = p_id_pet;

-- PROCEDURE 2: Relatório de pets por tutor

CREATE PROCEDURE sp_relatorio_tutor(
    IN p_id_tutor INT
)
SELECT
    t.nome AS tutor,
    c.descricao AS categoria,
    COUNT(p.id_pet) AS quantidade_pets
FROM tutor t
INNER JOIN pet p
    ON t.id_tutor = p.id_tutor
INNER JOIN categoria_pet c
    ON p.id_categoria = c.id_categoria
WHERE t.id_tutor = p_id_tutor
GROUP BY t.nome, c.descricao;
