import { VehicleEntityClass } from "@domain/vehicle/entity/vehicleEntity";
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import type { PrismaClient } from "@prisma/client";

export class VehicleRepositoryPrisma implements VehicleGateway {

    private constructor(private  prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new VehicleRepositoryPrisma(prismaClient)
    }

    public async save(vehicle: VehicleEntityClass): Promise<void> {
        const data = {
            id_vehicle: vehicle.id,
            plate: vehicle.plate,
            mark: vehicle.mark,
            model: vehicle.model,
            year: vehicle.year,
            type: vehicle.type,
            chassis: vehicle.chassis,
            status: vehicle.status,
            dateAcquisition: vehicle.dateAcquisition,
            updateAt: vehicle.updateAt
        };

        await this.prismaClient.vehicle.create({
            data,
        })
    }

    public async list(): Promise<VehicleEntityClass[]> {
        const vehicles  = await this.prismaClient.VehicleEntityClass.findMany();

        const vehicleList = vehicles.map((p) => {
            const vehicle = VehicleEntityClass.with({
                id_vehicle: p.id,
                plate: p.plate,
                mark: p.mark,
                model: p.model,
                year: p.year,
                type: p.type,
                chassis: p.chassis,
                status: p.status,
                dateAcquisition: p.dateAcquisition,
                updateAt: p.updateAt
            });
            return vehicle;
        });

        return vehicleList
    }

    update(VehicleEntityClass: VehicleEntityClass): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<VehicleEntityClass | null> {
        throw new Error("Method not implemented.");
    }
    
}