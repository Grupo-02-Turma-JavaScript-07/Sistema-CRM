import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_crm',
      entities: [Categoria],
      synchronize: true,
    }),
    CategoriaModule
    // NomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
