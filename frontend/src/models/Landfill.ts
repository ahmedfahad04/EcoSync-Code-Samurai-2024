export interface ILandfill {
    landfill_id: string;
    landfill_name: string;
    opening_time: string;
    closing_time: string;
    capacity: string;
    latitude: string;
    longitude: string;
    gps_coordinate: string;
    current_waste_volume: string;
}

export interface IDumpingEntry {
    sts_name: string;
    vehicle_number: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}