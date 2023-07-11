const fs = require('fs');

const IbmCloudSecretsManagerApiV1 =  require('@ibm-cloud/secrets-manager/secrets-manager/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');

const mongoose = require('mongoose');

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
                apikey: 'L09rGrUHuHh8JFyNCpOIcYGExEyKgi4Ero_bUn4a7Boi',
            }),
            serviceUrl: 'https://b6e2ceca-06e6-4a6c-9f7b-f0aa8253569a.us-south.secrets-manager.appdomain.cloud',
        });

        // Get the mongodb certificate from Secrets Manager Service
        let cert = await secretsManagerService.getSecret({
            secretType: 'imported_cert',
            id: '7ae302de-3e81-3853-f490-a7fdd5d21c9c', //TODO. Validar si es correcto este ID o es de DB. Documentarlo.
        });
        
        // Create an auxiliary certificate file for the mongoose connection
        const cert_name = './certificate.pem';
        fs.writeFileSync(cert_name, cert.result.resources[0].secret_data.certificate, (err) => {if (err) throw err;});
        
        // Connect to the mongodb database
        await mongoose.connect(
            uri = 'mongodb://ibm_cloud_11c382c4_10e2_4852_a725_2c01cf4a5dc0:5a4a4c06224d2c98aef2441757d4214878fbf7659617f486c487579ea2466637@bf25838b-1eab-467f-ba31-038aca6978f4-0.c5km1ted03t0e8geevf0.databases.appdomain.cloud:32691,bf25838b-1eab-467f-ba31-038aca6978f4-1.c5km1ted03t0e8geevf0.databases.appdomain.cloud:32691,bf25838b-1eab-467f-ba31-038aca6978f4-2.c5km1ted03t0e8geevf0.databases.appdomain.cloud:32691/watson-airlines?authSource=admin&replicaSet=replset', 
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
        //  1: connected
        //  2: connecting
        //  3: disconnecting

        if (db.readyState == 1){
            console.log("MongoDB connection successful.");    
        }
        else{
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
    }catch(e){
        //console.error(e)
        next(e);

    }
}

module.exports = {
    create_connection,
    close_connection,
};