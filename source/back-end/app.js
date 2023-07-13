const express = require('express');
const path = require('path');
const { router } = require('./sample/routes/routes.js')
const app = express();
const port = 3001;

// Connection to Database MongoDB
const { create_connection } = require('./sample/sample.mongodb.js');

create_connection().then(() => {
    console.log('MongoDB connected');
})
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(express.static(path.join(__dirname, '../front-end')));

app.use(router)

app.listen(port, () => {
    console.log(`Server in http://localhost:${port}/`);
});