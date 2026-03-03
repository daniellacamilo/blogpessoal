import { Controller, Get } from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';


@Controller("/postagens")    
export class PostagemController {

    constructor(
        private readonly postagemService: PostagemService //Injeção de dependência do serviço
    ){}

    @Get() //Rota para buscar todas as postagens
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll(); //Chama o método do serviço para buscar todas as postagens
    }
}