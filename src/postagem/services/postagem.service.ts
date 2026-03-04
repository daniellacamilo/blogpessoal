import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
    ){}

    async findAll(): Promise<Postagem[]>{
        //SELECT * FROM tb_postagens
        return await this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem>{
        //SELECT * FROM tb_postagens WHERE id = id
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        })
        if (!postagem)
          throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{
        //SELECT * FROM tb_postagens WHERE titulo LIKE '%titulo%'
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) 
            }
        })
    }
    
    async create(postagem: Postagem): Promise<Postagem>{
        //INSERT INTO tb_postagens (titulo, texto, data) VALUES (postagem.titulo, postagem.texto, postagem.data)
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{

        if (!postagem.id || !postagem.id)
          throw new HttpException('O ID da postagem é inválido', HttpStatus.BAD_REQUEST);
        
        await this.findById(postagem.id);

        return this.postagemRepository.save(postagem);
            //UPDATE tb_postagens SET titulo = ?,
        // texto = ? ,
        //data = CURRENT_TIMESTAMP()
        //WHERE id = ?;
        //UPDATE tb_postagens SET titulo = postagem.titulo, texto = postagem.texto, data = postagem.data WHERE id = postagem.id
    //     let buscaPostagem = await this.findById(postagem.id || 0);

    //     if (!buscaPostagem || !postagem.id)
    //       throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        
    //     return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaPostagem = await this.findById(id);

         //DELETE FROM tb_postagens FROM id = ?;
         return this.postagemRepository.delete(id);
        // await this.postagemRepository.remove(buscaPostagem);
        // return await this.postagemRepository.delete(id);
    }
}