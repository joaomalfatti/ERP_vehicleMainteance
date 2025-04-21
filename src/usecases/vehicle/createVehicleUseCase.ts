import { VehicleEntityClass} from "@domain/vehicle/entity/vehicleEntity";
import type { VehicleStatusEnums } from "@domain/vehicle/enums/VehicleStatus";
import type { VehicleTypeEnums } from "@domain/vehicle/enums/VehicleType";
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import type { UseCase } from "@usecases/UseCase";

export type CreateVehicleInputDto = {
        plate: string;
        mark: string;
        model: string;
        year: string;
        type: VehicleTypeEnums;
        chassis: string;
        status: VehicleStatusEnums;
        dateAcquisition : Date;
        updateAt: Date;
}

export type CreateVehicleOutputDto = {
    id: string;
}

export class CreateVehicleUseCase implements UseCase<CreateVehicleInputDto, CreateVehicleOutputDto> {

    private constructor(private readonly vehicleGateway: VehicleGateway) {}

    public static create(vehicleGateway: VehicleGateway) {
        return new CreateVehicleUseCase(vehicleGateway)
    }

    public async execute({
        plate,
        mark,
        model,
        year,
        type,
        chassis,
        status,
        dateAcquisition,
        updateAt
    }: CreateVehicleInputDto): Promise<CreateVehicleOutputDto>{
        const aVehicle = VehicleEntityClass.create(
            plate,
            mark,
            model,
            year,
            type,
            chassis,
            status,
            dateAcquisition,
            updateAt
        );

        await this.vehicleGateway.save(aVehicle);

        const output = this.presentOuput(aVehicle);

        return output;
    }

    private presentOuput(VehicleEntityClass: VehicleEntityClass): CreateVehicleOutputDto{
        const output: CreateVehicleOutputDto = {
            id: VehicleEntityClass.id,
        }

        return output;
    }

}