# Aplicativo MeetApp

# Introdução

O MeetApp é um aplicativo com versões para Web e Mobile que permite a organização, divulgação e inscrição em Meetups. Através do aplicativo Web, um usuário pode criar e gerenciar os Meetups que organizará, e pelo aplicativo Mobile, o usuário poderá visualizar e realizar a inscrição nos Meetups cadastrados através da versão Web.

# Instalação do Back-end

IMPORTANTE: Caso a aplicação já tenha sido instalada e executada previamente, execute apenas a observação do passo 2 e o passo 8 para iniciá-la.

1. Certifique-se de que sua máquina tenha o Yarn e o Docker instalados.

2. Antes da primeira execução, caso não tenha Postgres, Mongo e Redis instalados em sua máquina, execute os seguintes comandos para instalação de contêineres Docker contendo essas ferramentas:

- docker run --name [database] -e POSTGRES_PASSWORD=[senha_acesso] -p 5432:5432 -d -t postgres
- docker run --name [mongo] -p 27017:27017 -d -t mongo
- docker run --name [redis] -p 6379:6379 -d -t redis:alpine
  Obs.: Para inicializar os contêineres em execuções posteriores, basta executar os comandos:
  docker start [database]
  docker start [mongo]
  docker start [redis]

3. Conecte-se ao servidor do banco de dados através do aplicativo Postbird utilizando as seguintes credenciais:
   Host: localhost
   Port: 5432
   Username: postgres
   Password: [senha_acesso] definida no passo anterior

4. Crie o banco de dados com nome "meetapp".

5. Acesse a pasta "backend" e utilize o comando "yarn" no terminal para instalação das dependências.

6. Renomeie o arquivo ".env.example" para ".env" e altere-o inserindo as seguntes informações:

# Database

DB_HOST=localhost
DB_USER=postgres
DB_PASS=[senha_acesso] definida no passo 2
DB_NAME=meetapp

# Mongo

MONGO_URL=mongodb://localhost:27017/meetapp

# Redis

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

7. Execute o comando "yarn sequelize db:migrate" para criação da estrutura de tabelas do banco de dados.

8. Execute o comando "yarn dev" para inicializar o back-end da aplicação.

# Instalação do Front-end

1. Certifique-se de que sua máquina tenha o Yarn instalado e o Back-end da aplicação em execução.
2. Antes da primeira execução, acesse a pasta "frontend" e utilize o comando "yarn" no terminal para instalação das dependências.
3. Execute o comando "yarn start" para iniciar a aplicação.

# Instalação do app Mobile

IMPORTANTE: O aplicativo e os passos abaixo foram elaborados tendo como base a plataforma Android. Não garantimos o correto funcionamento da aplicação em plataforma iOS.

1. Certifique-se de que sua máquina tenha o Yarn e o react-native-cli instalados, o Back-end da aplicação em execução, e um celular ou emulador
   configurados para emular a aplicação.
2. Antes da primeira execução, acesse a pasta "mobile" e utilize o comando "yarn" no terminal para instalação das dependências.
3. Em um terminal, execute o comando "react-native start" na pasta do projeto para iniciar o Metro Bundler.
4. Abra outra instância do terminal e execute o comando "react-native run-android" (Android) ou "react-native run-ios" (iOS) na pasta do projeto para iniciar a aplicação.
   Obs.: Caso esteja utilizando um celular ou emulador Android pra executar a aplicação, será necessário abrir o arquivo "services/api.js" e substituir o termo "localhost" pelo IP atual da máquina que estará rodando o back-end.
