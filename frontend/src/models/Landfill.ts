export interface ILandfill {
    landfill_id: string;
    landfill_name: string;
    opening_time: string;
    closing_time: string;
    capacity: string;
    latitude: string;
    longitude: string;
    gps_coordinate: number[];
    current_waste_volume: string;
}

export interface IDumpingEntry {
    trip_id: string;
    sts_name: string;
    vehicle_number: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}

export interface IBill {
    waste_volume: string,
    distance: number,
    cost_per_kilo: number,
    total_cost: number, // Assuming waste volume * distance * cost per kilo
    vehicle: {
        vehicle_number: string,
        type: string,
        capacity: string,
        cpk_loaded: number,
        cpk_unloaded: number,
    },
    sts_name: string,
    landfill_name: string,
    dumping_time: string,
    createdAt: Date,
}