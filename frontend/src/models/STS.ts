export interface ISTS {
    STSName: string;
    wardNumber: number;
    capacity: number;
    latitude: string;
    longitude: string;
}

export interface IDepartureEntry {
    vehicleNumber: string;
    landfillName: string;
    trip: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}