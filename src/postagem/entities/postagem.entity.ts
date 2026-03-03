import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) // CREATE TABLE  tb_postagens
export class Postagem{
    
    @PrimaryGeneratedColumn() //PRIMARY KEY(id) AUTO_INCREMENT
    id:number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remove os espaços em branco do início e do fim da string
    @IsNotEmpty() //Força digitação do campo
    @Column({length: 1000, nullable: false}) //VARCHAR(100) NOT NULL
    titulo:string;  

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remove os espaços em branco do início e do fim da string
    @IsNotEmpty() //Força digitação do campo
    @Column({length: 1000, nullable: false}) //VARCHAR(100) NOT NULL
    texto:string;

    @UpdateDateColumn() //Atualiza a data toda vez que o registro for atualizado    
    data:Date;
}