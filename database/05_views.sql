
USE pet_management;

-- VIEW 1: Quantidade de pets por categoria

CREATE VIEW vw_total_pets_categoria AS
SELECT
    c.descricao AS categoria,
    COUNT(p.id_pet) AS quantidade_pets
FROM categoria_pet c
LEFT JOIN pet p
    ON c.id_categoria = p.id_categoria
GROUP BY c.id_categoria, c.descricao;


-- VIEW 2: Quantidade de pets por sexo e categoria

CREATE VIEW vw_pets_sexo_categoria AS
SELECT
    c.descricao AS categoria,
    p.sexo_pet AS sexo,
    COUNT(*) AS quantidade
FROM pet p
INNER JOIN categoria_pet c
    ON p.id_categoria = c.id_categoria
GROUP BY c.descricao, p.sexo_pet;
