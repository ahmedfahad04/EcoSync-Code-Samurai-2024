export interface ISTS {
    sts_id: string;
    sts_name: string;
    ward_number: number;
    capacity: number;
    gps_coordinate: number[];
    latitude: string;
    longitude: string;
}

export interface IDepartureEntry {
    sts_id: string;
    vehicle_number: string;
    landfill_name: string;
    trip: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}