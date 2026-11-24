# Pet Management API

API REST para gerenciamento de tutores e pets, desenvolvida como projeto das disciplinas de Programação Server-Side e Banco de Dados.

## Tecnologias

- **JavaScript / Node.js:** servidor da aplicação.
- **Express:** rotas e requisições HTTP.
- **Sequelize:** acesso ao banco por ORM.
- **MariaDB:** banco de dados relacional.
- **CORS:** acesso à API por diferentes origens.
- **JWT:** proteção de uma rota por token.
- **Git / GitHub:** versionamento.
- **DBeaver:** administração do banco durante o desenvolvimento.

## Funcionalidades

- CRUD de tutores e pets.
- Consulta de pets por tutor e por altura exata.
- Classificação automática dos pets por altura, por meio de triggers.
- Geração de JWT por senha configurada no servidor e proteção de `GET /pets/:id`.
- Scripts com consultas SQL, views, triggers e stored procedures.

## Banco de dados

| Tabela | Dados principais |
| --- | --- |
| `tutor` | `id_tutor` (PK), `cpf` (único), `nome`, `email` |
| `pet` | `id_pet` (PK), `nome_pet`, `raca_pet`, `sexo_pet`, `altura_cm`, `id_tutor` (FK), `id_categoria` (FK) |
| `categoria_pet` | `id_categoria` (PK), `descricao` |

Um tutor pode ter vários pets. Cada pet pertence a um tutor e a uma categoria de altura.

| Altura | Categoria |
| --- | --- |
| Até 15 cm | Pequeno |
| Acima de 15 e abaixo de 45 cm | Médio |
| 45 cm ou mais | Alto |

Os triggers `BEFORE INSERT` e `BEFORE UPDATE` definem a categoria automaticamente. A pasta `database/` contém os scripts para recriar a estrutura e os recursos SQL.

## Rotas da API

| Método | Endpoint | Função |
| --- | --- | --- |
| GET | `/tutores` | Listar tutores |
| POST | `/tutores` | Cadastrar tutor |
| PUT | `/tutores/:id` | Atualizar tutor |
| DELETE | `/tutores/:id` | Excluir tutor |
| GET | `/pets` | Listar pets |
| GET | `/pets/:id` | Consultar pet por ID (requer JWT) |
| POST | `/pets` | Cadastrar pet |
| PUT | `/pets/:id` | Atualizar pet |
| DELETE | `/pets/:id` | Excluir pet |
| GET | `/pets/tutor/:id` | Listar pets de um tutor |
| GET | `/pets/altura/:altura` | Consultar pets por altura exata |
| POST | `/auth/token` | Gerar token JWT |

## Recursos SQL

A pasta `database/` reúne a criação das tabelas, os dados iniciais, **3 consultas**, **2 views**, **2 triggers** e **2 stored procedures**, conforme os requisitos da disciplina de Banco de Dados.

> Projeto acadêmico. Testes automatizados com Jest estão planejados para uma etapa posterior.
