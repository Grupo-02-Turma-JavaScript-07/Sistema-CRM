import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_produtos")
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column({type: 'text', nullable: false})
    descricao: string;

    @IsNumber()
    @Min(0)
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    preco: number;

    @IsNumber()
    @Min(0)
    @Column({type: 'bigint', nullable: false})
    quantidade: number;
}