# agrupaZap

Projeto consiste em uma página web capaz de, por geolocalização, mostrar os grupos de WhatsApp criados próximos de onde você está no momento, num raio de 1km, com um link para entrar no grupo. Caso você seja o cadastrante, é possível selecionar que o grupo é privado e, assim, para os outros só será possível visualizar o link de invite após confirmar a chave de acesso gerada pelo Backend.


## BD: Postgres

### Como configurar
Dentro do pgAdmin, será necessário criar um novo database chamado "agrupaZap" e um usuário chamado "user_db" com senha 123456. Porém, caso você não queira realizar esse passo, mais para frente será possível alterar essas configurações no backend.

Além disso, dentro da pasta ./backend, você deverá rodar os seguintes comandos:
* ` $ npx knex migrate:latest`

Esse comando configurará a tabela 'grupo' no nosso BD.

Caso você queira realizar os testes do mocha sem grandes problemas, é recomendado rodar o seguinte comando:
* ` $ npm knex seed:run`

Esse comando colocará 2 rows na nossa tabela para que seja possível testar todas as funcionalidades com os testes automatizados.

## Back-end: Node.js

### Como configurar
Para o backend da aplicação foi escolhido o Node.js e para servir:
* ` $ npm install`
* ` $ npm start`

A porta estabelecida é a 3333, mas é possível mudar isso no arquivo server.js. Caso ela seja alterada, faz-se necessário a alteração no front também dentro do arquivo instance.js.

Além disso, é de extrema importância a criação de um banco de dados no pgAdmin. As configurações utilizadas no projeto foram:
      
      host: '127.0.0.1',
      user: 'user_db',
      password: '123456',
      database: 'agrupaZap',
      charset: 'utf8'

Porém, caso queira mudar, é possível em knexfile.js na parte de development.
### Rotas estabelecidas e possíveis requests

* /api/grupos?Latitude=&Longitude= (get -> retorna uma lista com todos os grupos cadastrados em um raio de 1km de distância.)


* /api/invite?ID_Grupo=&ID_Entrada= (get-> retorna o link de invite se o código de entrada for igual ao cadastrado).

Quando um grupo é dito como privado pelo criador, será mostrado para ele uma senha de acesso criada aleatoriamente pelo back para que entre usuários naquele raio de 1km e que tenham a senha de acesso. Restringindo, assim, a entrada de usuários não permitidos.

* /api/grupo (post -> cria um grupo novo)

Para essa rota, o usuário deverá enviar um JSON com os seguintes dados:

      STR_NomeGrupo: (str),
      STR_DescricaoGrupo: (str),
      TXT_InviteGrupo: (str),
      B_Privado: (boolean),
      NR_Latitude: (float),
      NR_Longitude: (float)

OBS.: Está sendo checado se o Invite é realmente do WhatsApp. 

### Rodando os testes

Para rodar os testes é só rodar o seguinte comando:
* ` $ npm test`


### Pacotes Adicionais

      "devDependencies": {
      "chai": "^4.3.4",
      "chai-http": "^4.3.0",
      "nodemon": "^2.0.7",
      "should": "^13.2.3"
      },
      "dependencies": {
      "cors": "^2.8.5",
      "express": "^4.17.1",
      "geolocation-utils": "^1.2.5",
      "knex": "^0.95.6",
      "pg": "^8.6.0"
      }

## Front-end: React.js

### Como configurar
Para o frontend da aplicação foi escolhido o React.js e para servir:
* ` $ npm install`
* ` $ npm start`

A porta estabelecida é a 3000.


### Rotas estabelecidas

* /procurar 

Nessa página serão exibidos todos os grupos criados em um raio de 1km. Para entrar em algum, basta apertar nele que, ou aparecerá para colocar a senha ou direto o link para entrar.


* /cadastrar

Nessa página será possível cadastrar um grupo novo na sua localização.

* /

Página meramente para apresentação midiática do agrupaZap.


### Pacotes Adicionais
      "dependencies": {
            "axios": "^0.21.1",
            "bootstrap": "^4.6.0",
            "node-sass": "^6.0.0",
            "react": "^17.0.2",
            "react-bootstrap": "^1.6.0",
            "react-dom": "^17.0.2",
            "react-router-dom": "^5.2.0",
            "react-scripts": "4.0.3",
            "web-vitals": "^1.1.2"
      }

