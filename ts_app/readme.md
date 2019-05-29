### Installation

**ts_app** requiere [Node.js](https://nodejs.org/) v12.2.0.

Instalar las dependencias y levantar el servidor.

```sh
$ cd ts_app
$ npm install
$ npm start
```

Correr unit tests:

```sh
$ npm test
```
Correr mutation:

```sh
$ npm run test:mutation
```
### Endpoints
**GET /api/users/** retorna los usuarios del sistema

**GET /api/users/{id}** retorna un usuario

**GET /api/albums/** retorna los albumes del sistema

**GET /api/photos/** retorna las fotos del sistema ()

**GET /api/photos/?field=userId&value={userId}** retorna las fotos de un usuario

**GET /api/comments/?name={name}** retorna los comentarios filtrados por nombre

**GET /api/comments/?email={email}** retorna los comentarios filtrados por el mail del usuario que realizo el comentario

**PUT /api/shared/album/{albumId}/user/{userId}** recibe en el body un objecto con keys write y read para setear los permisos del usuario para el album

**PATCH /api/shared/album/{albumId}/user/{userId}** recibe en el body un objeto con permision (read, write) y value (true, false)

**GET /api/shared/album/{albumId}/user/?permission=read** retorna los usuarios con permisos de lectura del album

**GET /api/shared/album/{albumId}/user/?permission=write** retorna los usuarios con permisos de escritura del album


### Test results
**Coverage**

90.2% Statements

88.24% Branches

78.43% Functions

92.22% Lines

**Mutation score**

93.91%

