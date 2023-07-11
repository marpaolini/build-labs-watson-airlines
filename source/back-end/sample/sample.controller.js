const { request, response } = require("express");

// Mongoose Schemas
const flight = require("./flight.schema");

/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getFlights = async (req = request, res = response) => {
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
        const flights = await flight.find({
            AIRLINE: "WA",
            ORIGIN_AIRPORT: "OGG",
            DESTINATION_AIRPORT: "HNL",
            DEPARTURE_DATE: new Date("2023-01-01T14:45:00.000Z")
        })
        // Return query result
        res.json ({
            result : flights
        });
    } catch (error) {
        res.status(404).json ({
            status : error.status
        });
    }
};

module.exports = {
    getFlights,
};