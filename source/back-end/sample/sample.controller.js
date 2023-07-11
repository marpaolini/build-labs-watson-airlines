const { request, response } = require("express");

// Mongoose Schemas
const flight = require("./flight.schema");

/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const sample = async (req = request, res = response) => {
    // Returns list of Sample objects under "result" field
    /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Sample"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {
        // Your Code Goes Here!!!!
        
        // Return query result
        res.json ({
            result : flights
        });
    } catch (error) {
        res.json ({
            status : error.status
        });
    }
};

module.exports = {
    getFlights,
};