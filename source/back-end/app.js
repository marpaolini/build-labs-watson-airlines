const express = require('express');
const path = require('path');
const {router} = require ('./sample/routes/routes.js')

const {create_connection} = require('./sample/sample.mongodb');

const app = express();
const port = 3001;

app.use(express.static(path.resolve('/Users/mpaol/OneDrive/Documentos/build-labs-watson-airlines/source/front-end')));

app.use(router)

app.listen(port, () => {
    console.log(`Server in http://localhost:${port}/`);
});
create_connection().then(() => console.log("successful connection"));