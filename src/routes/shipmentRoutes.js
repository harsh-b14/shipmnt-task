import { Router } from "express";
import { addNewHop, createShipment } from "../controller/shipmentController.js";
import { addNewFlight } from "../controller/flightController.js";

const router = new Router();

router.route('/create').post(createShipment);

router.route('/:shipment_number/hops/add').post(addNewHop);

router.route('/:shipment_number/flights/add').post(addNewFlight);

export default router;


