import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Entity('tb_produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ type: 'text', nullable: false })
  descricao: string;

  @IsNumber()
  @Min(0)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  @IsNumber()
  @Min(0)
  @Column({ type: 'bigint', nullable: false })
  quantidade: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.produtos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
