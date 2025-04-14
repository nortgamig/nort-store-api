const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('api/db.json'); // Ruta relativa al archivo db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Habilitar CORS manualmente
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Permitir parseo de JSON en POST
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date().toISOString();
  }
  next();
});

server.use(router);
module.exports = server;
