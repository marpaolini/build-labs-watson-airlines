const fs = require('fs');
const IbmCloudSecretsManagerApiV1 = require('@ibm-cloud/secrets-manager/secrets-manager/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');

const mongoose = require('mongoose');

const secretManagerApikey = `${process.env.SECRET_MANAGER_APIKEY}`;
const secretManagerUrl = `${process.env.SECRET_MANAGER_URL}`;
const secretManagerCertId = `${process.env.SECRET_MANAGER_CERT_ID}`;
const mongoDbUri = `${process.env.MONGO_DB_URI}`;



// Mongoose configuration
mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);

/**
 * Create connection to the database
 */
const create_connection = async () => {
    try {
        // Create a Secrets Manager client instance
        const secretsManagerService = new IbmCloudSecretsManagerApiV1({
            authenticator: new IamAuthenticator({
                apikey: secretManagerApikey,
            }),
            serviceUrl: secretManagerUrl,
        });

        // Get the mongodb certificate from Secrets Manager Service
        let cert = await secretsManagerService.getSecret({
            secretType: 'imported_cert',
            id: secretManagerCertId,
        });

        // Create an auxiliary certificate file for the mongoose connection
        const cert_name = './certificate.pem';
        fs.writeFileSync(cert_name, cert.result.resources[0].secret_data.certificate, (err) => { if (err) throw err; });

        // Connect to the mongodb database
        await mongoose.connect(
            uri = mongoDbUri,
            options = {
                ssl: true,
                sslValidate: false,
                sslCA: cert_name,
            }
        );

        // Store connection
        let db = mongoose.connection;


        // Check connection status
        // Values are: 
        //  0: disconnected
        //  1: connected --------
        //  2: connecting
        //  3: disconnecting


        if (db.readyState == 1) {
            console.log("MongoDB connection successful.");
        } else {
            console.error.bind(console, "connection error: ");
        }

        // Delete temporary certificate file
        fs.unlinkSync(cert_name);

        // Return connection
        return db;
    } catch (e) {
        return e.status;
    }
}

/**
 * Disconnect the database
 */
const close_connection = async () => {
    try {
        //Disconnect the mongodb database
        mongoose.connection.close();
    } catch (e) {
        //console.error(e)
        next(e);

    }
}

module.exports = {
    create_connection,
    close_connection,
};