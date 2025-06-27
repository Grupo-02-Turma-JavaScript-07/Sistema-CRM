import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Perfil } from '../enums/usuario.enum';
// import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({length: 255, unique: true, nullable: false })
  email: string;

  @IsNotEmpty()
  @Column({length: 255, nullable: false })
  senha: string;

  @IsNotEmpty()
  @Column({length: 255, nullable: true })
  foto: string;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: Perfil, nullable: false })
  perfil: Perfil;

  // aguardando a configuração do responsável
  // @OneToMany(() => Produto, (produto) => produto.usuario)
  // produtos: Produto[];
}
