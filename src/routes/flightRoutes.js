import { Router } from "express";
import { updateFlightStaus } from "../controller/flightController.js";

const router = new Router();

router.route('/:flight_number/status').put(updateFlightStaus);

export default router
