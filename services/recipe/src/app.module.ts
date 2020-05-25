import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { DatabaseConfigService } from './database-config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
      inject: [ConfigService],
    }),
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
