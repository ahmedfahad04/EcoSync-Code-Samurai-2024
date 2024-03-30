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
    vehicle_number: string;
    landfillName: string;
    trip: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}