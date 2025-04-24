import type { VehicleEntityClass } from "@domain/entities/vehicle/vehicleEntitys";

export interface VehicleGateway {
    save(vehicleprops: VehicleEntityClass): Promise<void>
}