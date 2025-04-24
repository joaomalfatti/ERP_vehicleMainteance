import { ChassisValidate } from "@domain/entities/value-objects/vehicle/chassisValueObjects";
import { DateAcquisitionValidade } from "@domain/entities/value-objects/vehicle/dateAcquisitionValueObjects";
import { PlateValidate } from "@domain/entities/value-objects/vehicle/plateValueObjects";
import { YearValidate } from "@domain/entities/value-objects/vehicle/yearValueObjects";
import { VehicleEntityClass } from "@domain/entities/vehicle/vehicleEntitys";
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

    public async list(): Promise<VehicleEntityClass[]> {
        const vehicles = await this.prismaClient.vehicle.findMany();

        const vehicleList = vehicles.map((p) => {
            const vehicle = VehicleEntityClass.with({
                idVehicle: p.idVehicle,
                plate: new PlateValidate(p.plate),
                mark: p.mark,
                chassis: new ChassisValidate(p.chassis),
                year: new YearValidate(p.year),
                dateAcquisition: new DateAcquisitionValidade(p.dateAcquisition),
            });
            return vehicle
        });

        return vehicleList
    }
}
