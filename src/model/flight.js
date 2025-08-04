import { Schema, model } from "mongoose";

const FlightSchema = new Schema({
    carrier: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    flight_number: {
        type: String,
        required: true
    },
    departure: {
        type: Date(),
        required: true
    },
    arrival: {
        type: Date(),
        required: true
    },
    status: {
        type: String,
        enum: ["in-transit","landed"],
        default: "in-transit"
    }
})

export const FlightModel = new model('Flight', FlightSchema)