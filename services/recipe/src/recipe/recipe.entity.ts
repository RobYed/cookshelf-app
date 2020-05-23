import { IngredientDto, RecipeDto } from './recipe.dto';
import { Id } from '../common/typed-id';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
} from 'typeorm';

export type UnitOfMeasurementId = Id<UnitOfMeasurement>;
export type IngredientId = Id<Ingredient>;
export type RecipeId = Id<Recipe>;

export enum RecipeStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
  DELETED = 'DELETED',
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id?: RecipeId;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  description!: string;

  @OneToMany(
    () => Ingredient,
    ingredient => ingredient.recipe,
  )
  ingredients!: Ingredient[];

  @Column('simple-array')
  instructions!: string[];

  @Column('simple-array')
  imageUrls!: string[];

  @Column('simple-array')
  tags!: string[];

  @Column({ type: 'enum', enum: RecipeStatus, nullable: false })
  status!: RecipeStatus;

  @Column()
  note?: string;

  @Column()
  originalSource?: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updatedData!: Date;

  static build(recipe: RecipeDto) {
    const instance = new Recipe();
    instance.name = recipe.name;
    instance.description = recipe.description;
    instance.ingredients = recipe.ingredients.map(Ingredient.build);
    instance.instructions = recipe.instructions;
    instance.imageUrls = recipe.imageUrls;
    instance.tags = recipe.tags;
    instance.status = RecipeStatus[recipe.status];
    instance.note = recipe.note;
    instance.originalSource = recipe.originalSource;
    return instance;
  }
}

@Entity()
export class UnitOfMeasurement {
  @PrimaryGeneratedColumn('uuid')
  id!: UnitOfMeasurementId;

  @Column({ nullable: false })
  name!: string;

  @ManyToMany(
    () => Ingredient,
    ingredient => ingredient.unit,
  )
  ingredients!: Ingredient[];

  static build(name: string) {
    const instance = new UnitOfMeasurement();
    instance.name = name;
    return instance;
  }
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id!: IngredientId;

  @Column({ nullable: false })
  amount!: number;

  @OneToOne(
    () => UnitOfMeasurement,
    uom => uom.ingredients,
  )
  unit!: UnitOfMeasurement;

  @Column({ nullable: false })
  name!: string;

  @OneToMany(
    () => Recipe,
    recipe => recipe.ingredients,
  )
  recipe!: Recipe;

  static build(ingredient: IngredientDto) {
    const instance = new Ingredient();
    instance.amount = ingredient.amount;
    instance.unit = UnitOfMeasurement.build(ingredient.unit);
    instance.name = ingredient.name;
    return instance;
  }
}
