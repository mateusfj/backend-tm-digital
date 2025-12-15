## backend-tm-digital

Backend em NestJS para o desafio da TM Digital, utilizando PostgreSQL e TypeORM.

Este guia explica como **instalar**, **configurar** e **rodar** o projeto em ambiente local.

---

## Requisitos

- Node.js **>= 20**
- npm **>= 10**
- Docker e Docker Compose (opcional, mas recomendado para o banco de dados)

---

## 1. Clonar o repositório

No diretório onde você deseja manter o projeto:

```bash
git clone https://github.com/mateusfj/backend-tm-digital.git
cd backend-tm-digital
```

---

## 2. Instalar dependências

Dentro da pasta do projeto:

```bash
npm install
```

---

## 3. Configurar variáveis de ambiente

O projeto usa PostgreSQL e lê as configurações de conexão via variáveis de ambiente:

- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

Já existe um arquivo `.env.example` na raiz do projeto. Para começar, copie-o para `.env`:

```bash
cp .env.example .env
```

A configuração padrão assume:

- Banco rodando em `localhost`
- Porta `5432`
- Usuário, senha e nome do banco conforme definidos no `.env`

---

## 4. Subir o banco de dados com Docker (recomendado)

Há um `docker-compose.yml` na raiz configurando o serviço do PostgreSQL.

Para subir o banco (via Docker Compose):

```bash
docker compose up -d
```

Isso irá:

- Criar o container PostgreSQL usando as variáveis do seu `.env`
- Expor a porta `5432` no host

> Certifique-se de que a porta 5432 não esteja sendo usada por outro serviço local.

---

## 5. Rodar a aplicação

Com as dependências instaladas, o `.env` configurado e o banco rodando, você pode iniciar a API.

### Ambiente de desenvolvimento (watch mode)

```bash
npm run start:dev
```

A aplicação deverá subir (por padrão) em `http://localhost:3001`.

## Observações

- O TypeORM está configurado com `synchronize: true`, ou seja, o schema do banco é sincronizado automaticamente com as entidades em ambiente de desenvolvimento.
- Para ambientes de produção, o ideal é usar migrações explícitas.
