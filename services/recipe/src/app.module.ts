import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeService } from './recipe/recipe.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RecipeService],
})
export class AppModule {}
