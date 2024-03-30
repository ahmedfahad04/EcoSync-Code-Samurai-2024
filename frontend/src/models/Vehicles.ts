export interface IVehicle {
    vehicle_id: string;
    vehicle_number: string;
    type: string;
    capacity: string;
    cpk_loaded: number;
    cpk_unloaded: number;
    createdAt: Date;
    updatedAt: Date;
}