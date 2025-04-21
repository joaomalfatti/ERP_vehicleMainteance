import type { VehicleEntityClass} from "@domain/vehicle/entity/vehicleEntity";
import type { VehicleStatusEnums } from "@domain/vehicle/enums/VehicleStatus";
import type { VehicleTypeEnums } from "@domain/vehicle/enums/VehicleType";
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import type { UseCase } from "@usecases/UseCase";


export type ListVehicleInputDto = void;

export type ListVehicleOutputDto = {
    vehicle: {
            id_vehicle: string;
            plate: string;
            mark: string;
            model: string;
            year: string;
            type: VehicleTypeEnums;
            chassis: string;
            status: VehicleStatusEnums;
            dateAcquisition: Date;
            updateAt: Date,
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

    private presentOuput(vehicles: VehicleEntityClass[]): ListVehicleOutputDto {
        return {
          vehicle: vehicles.map(vehicle => ({
            id_vehicle:vehicle.id,
            plate: vehicle.plate,
            mark: vehicle.mark,
            model: vehicle.model,
            year: vehicle.year,
            type: vehicle.type,
            chassis: vehicle.chassis,
            status: vehicle.status,
            dateAcquisition: vehicle.dateAcquisition,
            updateAt: vehicle.updateAt,
          }))
        }
      }
}