# API Connect

## Objetivo

A **API Connect** é uma API REST desenvolvida como Produto Mínimo Viável (MVP) para demonstrar o cadastro, a consulta, a atualização e a remoção de usuários. A aplicação recebe e retorna dados no formato JSON e utiliza uma coleção em memória como persistência simulada, permitindo validar o fluxo completo de operações CRUD sem dependência imediata de um banco de dados.

A persistência em memória é reinicializada sempre que o processo do servidor é encerrado. Por isso, a solução é adequada para prototipação e testes iniciais; em uma evolução do produto, o módulo de dados deverá ser substituído por uma camada de persistência definitiva.

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| Node.js | Ambiente de execução JavaScript no servidor |
| Express | Framework HTTP para criação do servidor, rotas e middlewares |
| dotenv | Carregamento de variáveis de ambiente |
| npm | Gerenciamento de dependências e scripts |
| curl | Cliente HTTP utilizado nos testes funcionais |

A aplicação utiliza módulos ES (`type: module`) e o middleware `express.json()` para interpretar corpos de requisição no formato JSON.

## Estrutura do projeto

```text
api-connect/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── server.js
    ├── controllers/
    │   ├── connectController.js
    │   └── userController.js
    ├── data/
    │   ├── connectData.js
    │   └── userData.js
    └── routes/
        ├── connectRoutes.js
        └── userRoutes.js
```

## Execução local

### Pré-requisitos

É necessário ter o Node.js e o npm instalados. Verifique as versões disponíveis:

```bash
node --version
npm --version
```

### Instalação

Clone o repositório, acesse a pasta e instale as dependências:

```bash
git clone https://github.com/joaovictorrego/api-connect-joaovictorrego.git
cd api-connect-joaovictorrego
npm install
```

### Inicialização

Para executar em modo de desenvolvimento, com reinicialização automática após alterações:

```bash
npm run dev
```

Para executar normalmente:

```bash
npm start
```

Por padrão, o servidor escuta na porta `3000`. Uma porta diferente pode ser informada pela variável de ambiente `PORT`:

```bash
PORT=3001 npm start
```

Após a inicialização, a API estará disponível em `http://localhost:3000`.

## Referência dos endpoints

Todos os endpoints utilizam o prefixo `/api/users`. Os corpos de requisição devem ser enviados com o cabeçalho `Content-Type: application/json`.

| Método | Endpoint | Corpo JSON | Sucesso | Falha possível |
|---|---|---|---|---|
| `GET` | `/health` | Não possui corpo | `200` com o status da aplicação | — |
| `GET` | `/api/users` | Não possui corpo | `200` com a coleção em `data` e a quantidade em `total` | — |
| `GET` | `/api/users/:id` | Não possui corpo | `200` com o usuário em `data` | `404` se o ID não existir |
| `POST` | `/api/users` | `name` e `email` obrigatórios | `201` com o usuário criado em `data` | `400` para campos ausentes, vazios ou e-mail inválido |
| `PUT` | `/api/users/:id` | `name` e `email` obrigatórios | `200` com o usuário atualizado em `data` | `400` para dados inválidos; `404` se o ID não existir |
| `DELETE` | `/api/users/:id` | Não possui corpo | `204` sem conteúdo | `404` se o ID não existir |

### Verificação da aplicação

```bash
curl http://localhost:3000/health
```

Resposta:

```json
{
  "status": "ok",
  "service": "api-connect"
}
```

### Listagem geral

```bash
curl http://localhost:3000/api/users
```

Resposta:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Ana Souza",
      "email": "ana.souza@example.com"
    },
    {
      "id": 2,
      "name": "Bruno Lima",
      "email": "bruno.lima@example.com"
    }
  ],
  "total": 2
}
```

### Cadastro de usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Marina Oliveira","email":"marina.oliveira@example.com"}'
```

Resposta com status `201 Created`:

```json
{
  "data": {
    "id": 3,
    "name": "Marina Oliveira",
    "email": "marina.oliveira@example.com"
  }
}
```

Quando o e-mail não é enviado, a API responde com status `400 Bad Request`:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Usuário sem e-mail"}'
```

```json
{
  "error": "O campo email é obrigatório e não pode estar vazio"
}
```

### Consulta por ID

```bash
curl http://localhost:3000/api/users/1
```

Resposta com status `200 OK`:

```json
{
  "data": {
    "id": 1,
    "name": "Ana Souza",
    "email": "ana.souza@example.com"
  }
}
```

Para um ID inexistente:

```bash
curl http://localhost:3000/api/users/99999
```

A API responde com status `404 Not Found`:

```json
{
  "error": "Usuário não encontrado"
}
```

### Atualização de usuário

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana Atualizada","email":"ana.atualizada@example.com"}'
```

Resposta com status `200 OK`:

```json
{
  "data": {
    "id": 1,
    "name": "Ana Atualizada",
    "email": "ana.atualizada@example.com"
  }
}
```

### Remoção de usuário

```bash
curl -i -X DELETE http://localhost:3000/api/users/2
```

Em caso de sucesso, a resposta possui status `204 No Content` e não contém corpo.

## Testes funcionais

Os cenários funcionais foram executados com `curl`:

| Cenário | Método e endpoint | Status obtido |
|---|---|---:|
| Criação com sucesso | `POST /api/users` | `201` |
| Criação sem campo de e-mail | `POST /api/users` | `400` |
| Listagem geral | `GET /api/users` | `200` |
| Busca por ID inexistente | `GET /api/users/99999` | `404` |

Os resultados estruturados dos testes podem ser reproduzidos pelo script `test-api.sh`, quando a aplicação estiver em execução.

## Licença

Este projeto foi criado para fins de prototipação e demonstração técnica da API Connect.
