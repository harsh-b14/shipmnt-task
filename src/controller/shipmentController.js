import { FlightModel } from "../model/flight.js";
import { ShipmentModel } from "../model/shipment.js";

const createShipment = async (req, res) => {

    try {
        const { origin, destination, shipment_number } = req.body;

        if(!origin || !destination){
            res.status(403).json({
                "success": false,
                "message": "Origin and destination are required fields."
                  
            })
        }

        const newShipment = await ShipmentModel.create({
            origin, 
            destination,
            shipment_number,
            hops: [
                origin, destination
            ]
        })

        if(!newShipment){
            res.json({
                "message": "Error while creating shipment"
            })
        }

        return res.status(201).json({
            "success": true,
            "message": "Shipment created successfully.",
            "data": {
                newShipment
            }
        })
    } catch (error) {
        res.json({
            "success": false,
            "message": "Shipment with ID not found."         
        })
    }
}

const addNewHop = async (req, res) => {
    try {
        const shipment_number = req.params.shipment_number;
        console.log(typeof shipment_number);
        const { previous_hop, next_hop, new_hop } = req.body

        if(!shipment_number){
            return res.json({
                "success": false,
                "message": "Shipment with ID not found."
            })
        }
        if(!previous_hop || !next_hop || !new_hop){
            return res.json({
                "success": false,
                "message": "Please enter correct hop information."
            })
        }

        const shipment = await ShipmentModel.findOne({
            shipment_number
        })
        console.log(shipment);
        
        if(!shipment){
            return res.json({
                "success": false,
                "message": "Shipment with ID not found."
            })
        }

        const hops = shipment.hops;
        const idx = -1;
        hops.map((hop, i) => {
            if(hop == previous_hop){
                idx == i
            }
        })

        hops.splice(idx+2, 0, new_hop);

        console.log(hops);
        

        const updatedShipment = await ShipmentModel.findOneAndUpdate({
            shipment_number
        }, {
            $set: { hops }
        }, { success: true })

        return res.json({
            "success": true,
            "message": "Hop added successfully.",
            "data": {
                updatedShipment
            }
        })
    } catch (error) {
        console.log(error);
        
        return res.json({
            "success": false,
            "message": "Shipment with ID not found in error block."          
        })
    }
}

const shipmentProgress = async (req, res) => {
    const shipment_number = req.params.shipment_number;

    const allFlights = await FlightModel.find({
        shipment_number
    })

    const shipment = await ShipmentModel.findOne({
        shipment_number
    })

    if(!shipment){
        return res.json({
            "success": false,
            "message": `Shipment with ${shipment_number} not found`
        })
    }

    const hops = shipment.hops;
    for(var i=0; i<hops.length-1; i++){
        const from = hops[i];
        const to = hops[i+1];

        // for(var j=0; j<allFlights.length; j++){
        //     if(allFlights[j].from === from && )
        // }
    }
}

export { createShipment, addNewHop }