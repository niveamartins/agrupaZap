# agrupaZap

Projeto consiste em uma página web capaz de, por geolocalização, mostrar os grupos de WhatsApp criados próximos de onde você está no momento, num raio de 1km, com um link para entrar no grupo. Caso você seja o cadastrante, é possível selecionar que o grupo é privado e, assim, para os outros só será possível visualizar o link de invite após confirmar a chave de acesso gerada pelo Backend.

## Como configurar

### Back-end: Node.js
Para o backend da aplicação foi escolhido o Node.js e para servir:
* ` $ npm install`
* ` $ npm start`

A porta estabelecida é a 3333, mas é possível mudar isso no arquivo server.js.

Além disso, é de extrema importância a criação de um banco de dados no pgAdmin. As configurações utilizadas no projeto foram:
      
      host: '127.0.0.1',
      user: 'user_db',
      password: '123456',
      database: 'agrupaZap',
      charset: 'utf8'

Porém, caso queira mudar, é possível em knexfile.js na parte de development.
## Rotas estabelecidas e possíveis requests

* /api/grupos?Latitude=&Longitude= (get -> retorna uma lista com todos os grupos cadastrados em um raio de 1km de distância.)


* /api/invite?ID_Grupo=&ID_Entrada= (get-> retorna o link de invite se o código de entrada for igual ao cadastrado).

Quando um grupo é dito como privado pelo criador, será mostrado para ele uma senha de acesso criada aleatoriamente pelo back para que entre usuários naquele raio de 1km e que tenham a senha de acesso. Restringindo, assim, a entrada de usuários não permitidos.

* /api/grupo (post -> cria um laboratório novo)

Para essa rota, o usuário deverá enviar um JSON com os seguintes dados:

      STR_NomeGrupo: (str),
      STR_DescricaoGrupo: (str),
      TXT_InviteGrupo: (str),
      B_Privado: (boolean),
      NR_Latitude: (float),
      NR_Longitude: (float)

OBS.: Está sendo checado se o Invite é realmente do WhatsApp. 

## Pacotes Adicionais
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "geolocation-utils": "^1.2.5",
    "knex": "^0.95.6",
    "pg": "^8.6.0"

