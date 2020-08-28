import React, { useState, FormEvent } from 'react';
import logoImg from   '../../assets/explorer-logo.svg';
import { Title, Form, Repositories } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

const Dashboard : React.FC = () => {
    const [ newRepository, setNewRepository] = useState('');
    const [ repositories, setRepositores] = useState([]);
    function handleAddProject( event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const repository = api.get(`/repos/${newRepository}`);
    }
    return (
    <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github</Title>
    <Form onSubmit={handleAddProject}>
        <input value={newRepository}
        onChange={(e) => setNewRepository(e.target.value)}
        placeholder="Digite o nome do repositório"/>
        <button type="submit">Pesquisa</button>
    </Form>
    <Repositories>
        <a href="">
            <img 
            src="https://avatars0.githubusercontent.com/u/39345247?s=460&u=cdff2624a327a43e2765112a54e966a06eac6d79&v=4" 
            alt="Joseph Oliveira"/>
            <div>
                <strong>rocketseat-education/bootcamp-gostack-desafios</strong>
                <p>desafios nodejs</p>
            </div>
            <FiChevronRight size={20}>

            </FiChevronRight>
        </a>
    </Repositories>
    </>)
};

export default Dashboard;