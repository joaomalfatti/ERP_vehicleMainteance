import { ChassisValidate } from "@domain/entities/value-objects/vehicle/chassisValueObjects";
import { DateAcquisitionValidade } from "@domain/entities/value-objects/vehicle/dateAcquisitionValueObjects";
import { YearValidate } from "@domain/entities/value-objects/vehicle/yearValueObjects";
import type { VehicleEntityClass } from "@domain/entities/vehicle/vehicleEntitys";
import type { VehicleGateway } from "@domain/gateway/vehicle/vehicleGateway";
import type { PrismaClient } from '@prisma/client';

export class VehicleRepositoryPrisma implements VehicleGateway {
    private constructor(private prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new VehicleRepositoryPrisma(prismaClient);
    }

    public async save(vehicle: VehicleEntityClass): Promise<void> {
        const data = {
            idVehicle: vehicle.idVehicle,
            plate: vehicle.plate,
            mark: vehicle.mark,
            chassis: vehicle.chassis, // Aqui você precisa acessar o valor de chassis
            year: vehicle.year,       // Aqui você precisa acessar o valor de year
            dateAcquisition: vehicle.dateAcquisition, // Aqui você precisa acessar o valor de dateAcquisition
        };

        // Salvando no banco de dados com Prisma
        await this.prismaClient.vehicle.create({
            data,
        });
    }
}
