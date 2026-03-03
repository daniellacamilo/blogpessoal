import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Postagem} from "../entities/postagem.entity";
import {Repository} from "typeorm";

@Injectable()
export class PostagemService{

    constructor(        
        @InjectRepository(Postagem)         
        private postagemRepository: Repository<Postagem>, //Injeção de dependência do repositório    
    ){}

    async findAll(): Promise<Postagem[]>{
        //SELECT * FROM tb_postagens
        return this.postagemRepository.find(); 
      

    }
}