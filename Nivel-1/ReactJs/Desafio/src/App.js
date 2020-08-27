import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  var [projects, setProject] = useState([]);

  useEffect(() =>{
    api.get('/repositories').then(response =>{
      setProject(response.data);
      console.log(response.data);
    })
  },[]);
/**
 * Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar e,
 *  após a criação, deve ser capaz de exibir o nome dele após o cadastro.
 */
  async function handleAddRepository() {
    const response = await api.post('/repositories/',{
      title: `Meu projeto ${Date.now()}`,
      url: 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
    });
    setProject([...projects,response.data]);
    console.log(projects);
   }
/**
 * Para cada item da sua lista, deve possuir um botão com o texto Remover que, 
 * ao clicar, irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
 */
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const newRepositories = projects.filter(project =>
      project.id !== id);
    setProject(newRepositories);
  }
/**
 *  Deve ser capaz de criar uma lista com o campo title de todos os repositórios que estão cadastrados na sua API.
 */
  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => 
        <li key={project.id}>{project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
