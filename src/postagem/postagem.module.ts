import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';
import { TemaModule } from '../tema/tema.module';
import { ManyToOne } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';


@Module({
    imports:[TypeOrmModule.forFeature([Postagem]), TemaModule], 
    controllers: [PostagemController],
    providers: [PostagemService],  
    exports: []
})
export class PostagemModule {}

 