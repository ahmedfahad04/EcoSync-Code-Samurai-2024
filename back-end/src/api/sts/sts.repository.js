import { sequelize, models, Op } from "../../configs/mysql.js";

async function countTotalTrip(vehicle_id, departure_time) {
    const today = new Date(departure_time).setHours(0, 0, 0, 0);

    const count = await models.STSDepartureEntry.count({
        where: {
            vehicle_id,
            departure_time: {
                [Op.between]: [today, today + 86400000],
            },
        },
    });

    return count;
}

async function isTripNumberExistForCurrentDay(vehicle_id, departure_time, trip_number) {
    const today = new Date(departure_time).setHours(0, 0, 0, 0);

    const count = await models.STSDepartureEntry.count({
        where: {
            vehicle_id,
            trip_number,
            departure_time: {
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
