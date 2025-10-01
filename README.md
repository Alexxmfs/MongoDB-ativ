# API para Gerenciamento de Reality Shows

Este projeto consiste em uma API RESTful construída com Node.js e Express para gerenciar dados de reality shows, participantes e prêmios. Os dados são armazenados em um banco de dados NoSQL (MongoDB Atlas) e a integridade dos dados é garantida por um Schema Validator.

A aplicação também inclui uma interface de frontend simples para votação e um dashboard para visualização dos resultados em tempo real.

---

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

*   [Node.js](https://nodejs.org/) (que inclui o `npm`)
*   [Git](https://git-scm.com/)
*   [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools) (para usar o `mongoimport`)

**Dica:** Para usar o comando `mongoimport` de qualquer pasta no terminal, adicione a pasta `bin` das MongoDB Database Tools ao PATH do seu sistema.

---

## 🚀 Guia de Configuração e Execução

Siga estes passos para configurar e rodar o projeto localmente.

### Passo 1: Clonar o Repositório

Primeiro, clone este repositório para a sua máquina local.

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git
cd NOME_DO_SEU_REPOSITORIO
```

### Passo 2: Instalar as Dependências

Este comando irá instalar todas as bibliotecas necessárias para o projeto, como `express`, `mongodb` e `dotenv`.

```bash
npm install
```

### Passo 3: Configurar as Credenciais do Banco de Dados

Este projeto se conecta a uma instância do MongoDB Atlas. É necessário configurar suas credenciais de forma segura.

1.  **Obter a String de Conexão:**
    *   Acesse sua conta no [MongoDB Atlas](https://cloud.mongodb.com/).
    *   Navegue até o seu Cluster e clique no botão **"Connect"**.
    *   Selecione a opção **"Drivers"**.
    *   Copie a **Connection String** fornecida. Ela será parecida com `mongodb+srv://<username>:<password>@cluster01.jfo8ott.mongodb.net/`.
    *   **Importante:** Substitua `<password>` pela senha do usuário do seu banco de dados.

2.  **Criar o Arquivo de Ambiente:**
    *   Na raiz do projeto, crie um novo arquivo chamado `.env`.
    *   Copie o conteúdo do arquivo `.env.example` e cole n