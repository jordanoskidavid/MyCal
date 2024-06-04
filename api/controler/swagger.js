const swaggerJsdoc = require('swagger-jsdocs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyCal API',
      version: '1.0.0',
      description: 'API za MyCal, web aplikacija za sledenje na kaloriski vnes ',
    },
  },
  apis: ['MyCal\api\controler\routes.js'], 
};

const openApiSpecification = swaggerJsdoc(options);

module.exports = openApiSpecification;
