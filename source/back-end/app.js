const express = require('express');
const path = require('path');
const { router } = require('./sample/routes/routes.js')
const app = express();
const port = 3001;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./sample/docs/openapi-spec.json');
require('dotenv').config({path: path.resolve(__dirname,".env")});

// Connection to Database MongoDB
const { create_connection } = require('./sample/sample.mongodb.js');

create_connection().then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
        console.error('MongoDB connection error:', error);
});


app.use(express.static(path.join(__dirname, '../front-end')));
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server in http://localhost:${port}/`);
});