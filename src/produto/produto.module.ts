import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './controllers/produto.controller';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    UsuarioModule,
    CategoriaModule,
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}
