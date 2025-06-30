import {
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Perfil } from '../enums/usuario.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
          produtos: true,
      }
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        produtos: true
      }
    });

    if (!usuario) {
      throw new HttpException(
        `Usuário com ID ${id} não encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return usuario;
  }

  async findByName(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        produtos: true
      }
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const perfisValidos = Object.values(Perfil);
    const perfil = usuario.perfil;

    const usuarioBusca = await this.usuarioRepository.findOne({
      where: {
        email: usuario.email
      }
    });

    if (usuarioBusca != null) {
      throw new BadRequestException(
        `Usuário já existe.`,
      );
    }

    if (!perfisValidos.includes(perfil)) {
      throw new BadRequestException(
        `Perfil inválido. Os perfis devem ser: ${perfisValidos.join(', ')}`,
      );
    }

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);
    return this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.usuarioRepository.delete(id);
  }
}
