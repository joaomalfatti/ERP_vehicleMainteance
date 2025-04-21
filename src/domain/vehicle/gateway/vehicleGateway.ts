import type { VehicleEntityClass } from "../entity/vehicleEntity";


export interface VehicleGateway {
    save(vehicle: VehicleEntityClass): Promise<void>
    list(): Promise<VehicleEntityClass[]>
    update(VehicleEntityClass: VehicleEntityClass): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<VehicleEntityClass | null>; // Aqui

}