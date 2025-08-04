import { model, Schema } from "mongoose";

const shipmntsSchema  = new Schema({
    shipment_number:{
        type: String
    },
    origin: {
        required: true,
        type: String
    },
    destination: {
        required: true,
        type: String
    },
    hops: [{
        type: String
    }]
})

export const ShipmentModel = new model("Shipment", shipmntsSchema);