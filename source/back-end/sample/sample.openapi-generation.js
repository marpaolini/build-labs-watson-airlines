/**
 * For more information see: https://github.com/davibaltar/swagger-autogen#openapi-3x
 */
const swagger_autogen = require("swagger-autogen")({ openapi: "3.0.0" });

// Data schemas
const mongo_specs = {
    flight: {
        type: "object",
        properties: {
            AIRLINE: {
                type: "string",
            },
            FLIGHT_NUMBER: {
                type: "number",
            },
            ORIGIN_AIRPORT: {
                type: "string",
            },
            DESTINATION_AIRPORT: {
                type: "string",
            },
            CANCELLED: {
                type: "boolean",
            },
            ARRIVAL_DATE: {
                type: "date",
            },
        },
    }
};

// API general specs
const general_specs = {
    info: {
        title: "Watson Airlines Customer Experience",
        description:
            "This is a Sample REST API for the Watson Airlines Customer Experience use case.",
        contact: {
            name: "Mariana Paolini Lara",
            email: "m.paolinilara@gmail.com",
        },
        version: "1.0.0",
    },
    servers: [
        {
            url: "https://localhost:8080",
            description: "Local Server",
        },
        {
            url: "https://build-labs-watson-airlines.14lbobqtzxew.us-south.codeengine.appdomain.cloud/",
            description: "IBM Code Engine Deployment",
        },
    ],
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    security: [
        {
            BasicAuth: [],
        },
    ],
    securitySchemes: {
        BasicAuth: {
            type: "http",
            scheme: "basic",
        },
    },
};

// API Routes
// NOTE: if using Express Router, pass only the root file where the route starts.
const api_routes = [
    "../app.js",
    "./sample.controller.js"
];

// Output file path
const output_file_path = "./docs/openapi-spec.json";

// Generate OpenAPI spec
swagger_autogen(
    (outputFile = output_file_path),
    (endpointsFiles = api_routes),
    (data = general_specs)
);