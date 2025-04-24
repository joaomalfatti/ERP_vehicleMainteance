import type { VehicleGateway } from "@domain/gateway/vehicle/vehicleGateway";
import type { UseCaseContract } from "../UseCaseContract";
import type { VehicleEntityClass } from "@domain/entities/vehicle/vehicleEntitys";

export type ListVehicleInputDto = undefined;

export type ListVehicleOutputDto = {
    vehicles: {
        idVehicle: string;
        plate: string;
        mark: string;
        chassis: string;
        year: string;
        dateAcquisition: Date;
    }[],
};

export class ListVehicleUseCase implements UseCaseContract <ListVehicleInputDto, ListVehicleOutputDto> {

    private constructor(private readonly vehicleGateway: VehicleGateway){}

    public static create(vehicleGateway: VehicleGateway) {
        return new ListVehicleUseCase(vehicleGateway)
    }

    public async execute() : Promise<ListVehicleOutputDto> {
        const aVehicle = await this.vehicleGateway.list();

        const output = this.presentOutput(aVehicle)

        return output;
    }

    private presentOutput(vehicle: VehicleEntityClass[]): ListVehicleOutputDto {
        return {
            vehicles: vehicle.map((p) => {
                return {
                    idVehicle: p.idVehicle,
                    plate: p.plate,
                    mark: p.mark,
                    chassis: p.chassis,
                    year: p.year,
                    dateAcquisition: p.dateAcquisition
                };
            }),
        };
    }
    
}