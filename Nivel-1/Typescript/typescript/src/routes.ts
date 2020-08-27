import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export default function helloWorld(request: Request, response: Response){

    const user = createUser({
        name : 'Muriel',
        email : 'muriel@email.com',
        password : 'teste123',
        techs : ['React JS', 'Node JS', {title: 'Javascript', experience: 100}]
    });
    return response.json({message: 'hello world'});
}