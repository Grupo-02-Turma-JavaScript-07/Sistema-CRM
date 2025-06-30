import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { Between, DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private readonly categoriaService: CategoriaService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
          usuario: true,
          categoria: true
      }
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        usuario: true,
        categoria: true
      }
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return produto;
  }

  async findByName(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        usuario: true,
        categoria: true
      }
    });
  }

  async findEntrePrecos(precoMin: number, precoMax: number) {
    if (precoMin > precoMax) {
      throw new BadRequestException('Preço mínimo não pode ser maior que a preço máximo');
    }

    const produtos = await this.produtoRepository.find({
      where: {
        preco: Between(precoMin, precoMax)
      },
      relations: {
        categoria: true,
        usuario: true
      }
    });

    if (!produtos) {
      throw new HttpException('Produtos não encontrados', HttpStatus.NOT_FOUND);
    }

    return produtos;
  }

  async create(produto: Produto): Promise<Produto> {
    if (produto.categoria) {
      const categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );

      if (!categoria) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }

      const produtoBusca = await this.produtoRepository.findOne({
        where: {
          nome: produto.nome
        }
      });
  
      if (produtoBusca != null) {
        throw new BadRequestException(
          `Produto já existe.`,
        );
      }

      produto.categoria = categoria;
    }

    if (produto.usuario) {
      const usuario = await this.usuarioService.findById(produto.usuario.id);

      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }

      produto.usuario = usuario;
    }

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    if (produto.categoria) {
      const categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );

      if (!categoria) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }

      produto.categoria = categoria;
    }

    if (produto.usuario) {
      const usuario = await this.usuarioService.findById(produto.usuario.id);

      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }

      produto.usuario = usuario;
    }

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
