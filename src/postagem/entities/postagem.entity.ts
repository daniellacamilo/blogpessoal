import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_postagens"}) // CREATE TABLE  tb_postagens
export class Postagem {
    
    @PrimaryGeneratedColumn() //PRIMARY KEY(id) AUTO_INCREMENT
    id:number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remove os espaços em branco do início e do fim da string
    @IsNotEmpty() //Força digitação do campo
    @Length(10, 1000, {message: "O texto deve ter entre 10 e 1000 caracteres"})
    @Column({length: 1000, nullable: false}) //VARCHAR(100) NOT NULL
    titulo:string;  

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remove os espaços em branco do início e do fim da string
    @IsNotEmpty() //Força digitação do campo
    @Length(10, 1000, {message: "O texto deve ter entre 10 e 1000 caracteres"})
    @Column({length: 1000, nullable: false}) //VARCHAR(100) NOT NULL
    texto:string;

    @UpdateDateColumn() //Atualiza a data toda vez que o registro for atualizado    
    data:Date;

    @ManyToOne( () => Tema, (tema) => tema.postagem, { 
        onDelete: "CASCADE" //Se um tema for deletado, todas as postagens relacionadas a ele também serão deletadas
    })
    tema:Tema; //Chave estrangeira para a tabela de temas

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}