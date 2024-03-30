import { models, Op } from "../../configs/mysql.js";

async function countTotalTrip(vehicle_id, sts_departure_time) {
    const today = new Date(sts_departure_time).setHours(0, 0, 0, 0);

    const count = await models.TripEntry.count({
        where: {
            vehicle_id,
            sts_departure_time: {
                [Op.between]: [today, today + 86400000],
            },
        },
    });

    return count;
}

async function isTripNumberExistForCurrentDay(vehicle_id, sts_departure_time, trip_number) {
    const today = new Date(sts_departure_time).setHours(0, 0, 0, 0);

    const count = await models.TripEntry.count({
        where: {
            vehicle_id,
            trip_number,
            sts_departure_time: {
                [Op.between]: [today, today + 86400000],
            },
        },
    });

    return count > 0;
}

export default {
    countTotalTrip,
    isTripNumberExistForCurrentDay,
};
