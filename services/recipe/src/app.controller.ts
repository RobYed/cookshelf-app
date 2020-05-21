import { Controller, Put, Get } from '@nestjs/common';
import { Recipe } from './recipe/recipe.model';
import { RecipeService } from './recipe/recipe.service';

@Controller('recipe')
export class AppController {
  constructor(private readonly recipeService: RecipeService) {}

  @Put()
  updateRecipe(): Recipe {
    return this.recipeService.updateRecipe();
  }

  @Get()
  getRecipe(): Recipe {
    return this.recipeService.getRecipe();
  }
}
