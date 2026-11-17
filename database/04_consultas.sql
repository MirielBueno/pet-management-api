
USE pet_management;

-- CONSULTA 1: Listar pets, tutores e categorias

SELECT
    p.nome_pet AS pet,
    p.raca_pet AS raca,
    p.altura_cm AS altura,
    t.nome AS tutor,
    c.descricao AS categoria
FROM pet p
INNER JOIN tutor t
    ON p.id_tutor = t.id_tutor
INNER JOIN categoria_pet c
    ON p.id_categoria = c.id_categoria
ORDER BY t.nome, p.nome_pet;

-- CONSULTA 2: Listar tutores, id e quantidade de pets

SELECT
    t.id_tutor,
    t.nome AS tutor,
    COUNT(p.id_pet) AS quantidade_pets
FROM tutor t
INNER JOIN pet p
    ON t.id_tutor = p.id_tutor
GROUP BY t.id_tutor, t.nome
HAVING COUNT(p.id_pet) >= 2
ORDER BY quantidade_pets DESC;

