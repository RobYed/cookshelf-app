import { RecipeModule } from './recipe/recipe.module';
import { DatabaseConfigService } from './database-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfigService }),
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
