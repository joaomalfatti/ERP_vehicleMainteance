import type { VehicleEntityClass, vehicleEntityProps } from "../entity/vehicleEntity";


export interface VehicleGateway {
    save(VehicleEntityClass: VehicleEntityClass): Promise<void>
    list(): Promise<VehicleEntityClass[]>
}