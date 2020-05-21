import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/recipe')
      .expect(200)
      .expect({
        id: 1,
        name: 'Spaghetti Aglio e Olio',
        description: 'Fast, healthy and delicious',
        ingredients: [
          {
            id: 1,
            amount: 1,
            unit: { id: 1, name: 'pound' },
            name: 'spaghetti',
          },
        ],
        instructions: [],
        imageUrls: [],
        tags: [{ id: 1, name: 'Italian ' }],
        note:
          'Add some fresh tomato while cooking to have some light and tasty sauce',
        status: 'DRAFT',
        originalSource:
          'https://www.allrecipes.com/recipe/222000/spaghetti-aglio-e-olio/',
      });
  });
});
