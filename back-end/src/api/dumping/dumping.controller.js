import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function generateBill(req, res) {
    const { dumping_id } = req.params;

    const dumpingEntry = await models.TruckDumpingEntry.findByPk(dumping_id);

    if (!dumpingEntry) throw new HttpError({ message: "invalid dumping entry" }, 404);

    const vehicle = await models.Vehicle.findByPk(dumpingEntry.vehicle_id);
    const landfill = await models.Landfill.findByPk(dumpingEntry.landfill_id);
    const sts = await models.STS.findByPk(dumpingEntry.sts_id);

    const cpk_journey = vehicle.cpk_unloaded + (dumpingEntry.waste_volume / vehicle.capacity) * (vehicle.cpk_loaded - vehicle.cpk_unloaded);

    const result = {
        waste_volume: dumpingEntry.waste_volume,
        distance: 20,
        cost_per_kilo: cpk_journey,
        total_cost: cpk_journey * 20,
        vehicle: {
            vehicle_number: vehicle.vehicle_number,
            type: vehicle.type,
            capacity: vehicle.capacity,
            cpk_loaded: vehicle.cpk_loaded,
            cpk_unloaded: vehicle.cpk_unloaded,
        },
        sts_name: sts.toJSON().sts_name,
        landfill_name: landfill.toJSON().landfill_name,
        createdAt: new Date().toString(),
    };

    res.json(result);
}

export default {
    generateBill,
};
