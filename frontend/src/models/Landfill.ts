export interface ILandfill {
    landfillName: string;
    openingTime: string;
    endingTime: string;
    capacity: string;
    latitude: string;
    longitude: string;
}

export interface IDumpingEntry {
    sts_name: string;
    vehicle_number: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}