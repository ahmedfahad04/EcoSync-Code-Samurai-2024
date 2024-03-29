export interface ILandfill {
    landfillName: string;
    openingTime: string;
    endingTime: string;
    capacity: string;
    latitude: string;
    longitude: string;
}

export interface IDumpingEntry {
    STSName: string;
    vehicleNumber: string;
    wasteVolume: string;
    arrivalTime: string;
    departureTime: string;
}