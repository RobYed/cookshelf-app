import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Recipe, Ingredient } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
