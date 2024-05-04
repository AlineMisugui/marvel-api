
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/populateRoutes.ts', './src/routes/comicRoutes.ts', './src/routes/characterRoutes.ts', './src/routes/creatorRoutes.ts'];




swaggerAutogen(outputFile, routes, doc);
 
