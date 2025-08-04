import { model, Schema } from "mongoose";

const shipmntsSchema  = new Schema({
    shipmentNumber:{
        type: Number,
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
    }],
    flights: [{
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }]
})

export const ShipmentModel = new model("Shipment", shipmntsSchema);