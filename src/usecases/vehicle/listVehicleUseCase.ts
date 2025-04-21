import type { VehicleEntityClass, VehicleStatus, VehicleType } from "@domain/vehicle/entity/vehicleEntity";
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import type { UseCase } from "@usecases/UseCase";


export type ListVehicleInputDto = void;

export type ListVehicleOutputDto = {
    vehicle: {
            plate: string;
            mark: string;
            model: string;
            year: string;
            type: VehicleType;
            chassis: string;
            status: VehicleStatus;
            dateAcquisition : Date;
    }[];
};

export class ListVehicleUseCase implements UseCase<ListVehicleInputDto, ListVehicleOutputDto> {

    private constructor(private readonly vehicleGateway: VehicleGateway) {}

    public static create(vehicleGateway: VehicleGateway) {
        return new ListVehicleUseCase(vehicleGateway);
    }

    public async execute(): Promise<ListVehicleOutputDto> {
        const aVehicle = await this.vehicleGateway.list();

        const output = this.presentOuput(aVehicle);

        return output;
    }

    private presentOuput(vehicle: VehicleEntityClass[]): ListVehicleOutputDto {
        return {
            vehicle: vehicle.map((p) => {
                return {
                    id: p.id,
                    plate: p.plate,
                    mark: p.mark,
                    model: p.model,
                    year: p.year,
                    type: p.type,
                    chassis: p.chassis,
                    status: p.status,
                    dateAcquisition : p.dateAcquisition 
                };
            }),
        };
    }
    
}