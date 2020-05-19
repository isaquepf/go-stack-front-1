import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]); 

  useEffect(()=> {
    api.get('repositories')
       .then(response => {
         setRepositories(response.data);
       });
  }, []);

  async function handleAddRepository() {
    let response  = await 
    api.post('repositories', {
      title: `New repository  ${Date.now()}`
    })  

    if(response.data)
      setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    if(!id)
      return;

     var result = await api.delete(`repositories/${id}`);           
     if(result.status === 204) {
      const index = repositories.findIndex(repository => repository.id !== id);

      let newState = repositories;

      newState.splice(index, 1);
        
      setRepositories([...repositories, newState]);

      if(newState.length <= 0)
      {
        var ul = document.getElementById("repository-list");
        ul.innerHTML = "";      
      }
     }
  }

  return (
    <div>
    <ul id="repository-list" data-testid="repository-list">
      {repositories.map(repository => (
         <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
