

-- classifica automaticamente o pet no cadastro
CREATE TRIGGER trg_pet_categoria_insert
BEFORE INSERT ON pet
FOR EACH ROW
SET NEW.id_categoria = (
    SELECT id_categoria
    FROM categoria_pet
    WHERE descricao = CASE
        WHEN NEW.altura_cm <= 15 THEN 'Pequeno'
        WHEN NEW.altura_cm < 45 THEN 'Médio'
        ELSE 'Alto'
    END
);

-- atualiza a categoria quando um pet é alterado
CREATE TRIGGER trg_pet_categoria_update
BEFORE UPDATE ON pet
FOR EACH ROW
SET NEW.id_categoria = (
    SELECT id_categoria
    FROM categoria_pet
    WHERE descricao = CASE
        WHEN NEW.altura_cm <= 15 THEN 'Pequeno'
        WHEN NEW.altura_cm < 45 THEN 'Médio'
        ELSE 'Alto'
    END
);
