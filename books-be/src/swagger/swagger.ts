import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './index';

export const setupSwagger = (app: any) => {
  const specs = swaggerJsdoc({
    definition: swaggerDocs,
    apis: [],
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
