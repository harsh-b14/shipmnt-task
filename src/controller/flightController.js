import { FlightModel } from "../model/flight.js";
import { ShipmentModel } from "../model/shipment.js";

const addNewFlight = async (req, res) => {
    try {   
        const {carrier, from, to, flight_number, departure, arrival } = req.body
        const shipment_number = req.params.shipment_number;

        if(!shipment_number) {
            return res.status(403).json({
                "success": false,
                "message": "shipment_number not found."              
            })
        }

        if(!carrier || !from || !to || !flight_number || !departure || !arrival){
            return res.json({
                "message": "All fields are necessary"
            })
        }

        const shipment = await ShipmentModel.findOne({
            shipment_number
        })

        console.log(shipment);
        

        if(shipment){
            const hop = shipment.hops;
            console.log(hop);

            for(var i=0; i<hop.length-1; i++){
                console.log(i);
                console.log(hop[i]);
                console.log(from);
                console.log(hop[i+1]);
                console.log(to);
                
                
                if((hop[i] === from && hop[i+1] === to)){
                    const newFlight = await FlightModel.create({
                        carrier, 
                        from, 
                        to, 
                        flight_number, 
                        departure,
                        arrival,
                        shipment_number
                    })
            
                    if(newFlight){
                        return res.status(201).json({
                            "success": true,
                            "message": "Flight information added successfully.",
                            data: newFlight
                        })
                    }
                }
            }
        }  

        return res.json({
            "success": false,
            "message": "something went wrong with locations"
        })
    } catch (error) {
        return res.json({
            "success": false,
            "message": "In error block."
        })
    }
}

const updateFlightStaus = async (req, res) => {
    try {
        const flight_number = req.params.flight_number;
        const { status } = req.body;

        const flight = await FlightModel.findOneAndUpdate({
            flight_number
        }, {
            $set: { status: status }
        })

        if(!flight){
            return res.json({
                "success": false,
                "message": `Flight with ID ${flight_number} not found.`
            })
        }

        if(flight){
            return res.status(200).json({
                "success": true,
                "message": "Flight status updated successfully.",
                "data": {
                flight_number,
                status
                }
            
            })
        }
    } catch (error) {
        return res.json({
            "success": false,
            "message": "Flight with ID 'em-789' not found."
        })
    }
}

export { addNewFlight, updateFlightStaus }