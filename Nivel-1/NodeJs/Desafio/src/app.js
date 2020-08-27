const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

function validateId(request, response, next){
  const { id } = request.params;
  if(!isUuid(id)){
    return response.status(400).json({message:'There is not a UUID'});
  }
  return next();
}
app.use('/repositories/:id', validateId);
var repositories = [];
/**
 * Rota que lista todos os repositórios;
 */
app.get("/repositories", (request, response) => {
  response.json(repositories);
});
/**
 *  A  rota deve receber title, url e techs dentro do corpo da requisição, sendo a URL o link para o github desse repositório.
 *  Ao cadastrar um novo projeto, ele deve ser armazenado dentro de um objeto no seguinte formato:
 *  { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }; 
 *  Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0.
 */
app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const project = {
    id : uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(project);
  response.json(project);
});
/**
 * A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota;
 */
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  

  const projectIndex = repositories.findIndex(project => project.id == id);
  if(projectIndex < 0){
    return response.status(400).json({message:'Project not found'});
  }
  const project = repositories[projectIndex];
  repositories[projectIndex] = {
    id: project.id,
    title,
    url,
    techs,
    likes: project.likes
  }
  return response.json(repositories[projectIndex]);
});
/**
 *  A rota deve deletar o repositório com o id presente nos parâmetros da rota;
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(project => project.id == id);
  if (projectIndex >= 0) {
    repositories = repositories.slice(projectIndex, 1);
  }
  return response.status(204).send();
});

/**
 * A rota deve aumentar o número de likes do repositório específico escolhido através do id presente nos parâmetros da rota,
 *  a cada chamada dessa rota, o número de likes deve ser aumentado em 1;
 */
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(project => project.id == id);
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }
  const projectAux = repositories[projectIndex];
  const project = {
    id: projectAux.id,
    title: projectAux.title,
    url: projectAux.url,
    techs: projectAux.techs,
    likes: projectAux.likes + 1  
  }
  repositories[projectIndex] = project;
  return response.json(project);
});

module.exports = app;
