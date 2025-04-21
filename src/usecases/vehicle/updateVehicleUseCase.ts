
import type { VehicleStatusEnums } from "@domain/vehicle/enums/VehicleStatus";
import type { VehicleTypeEnums } from "@domain/vehicle/enums/VehicleType";
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import type { ChassisValidate } from "@domain/vehicle/value-objects/chassisValue";
import type { DateAcquisitionValidate } from "@domain/vehicle/value-objects/dateAcquisitionValue";
import type { PlateValidate } from "@domain/vehicle/value-objects/plateValue";
import type { YearValidate } from "@domain/vehicle/value-objects/yearValue";
import type { UseCase } from "@usecases/UseCase";

export type UpdateVehicleInputDto = {
    id: string;
    plate?: PlateValidate;
    mark?: string;
    model?: string;
    year?: YearValidate;
    type?: VehicleTypeEnums;
    chassis?: ChassisValidate;
    status?: VehicleStatusEnums;
    dateAcquisition?: DateAcquisitionValidate;
}

export type UpdateVehicleOutputDto = {
    id: string;
    updateAt: Date;
}

export class UpdateVehicleUseCase implements UseCase<UpdateVehicleInputDto, UpdateVehicleOutputDto> {

    private constructor(private readonly vehicleGateway: VehicleGateway) {};

    public static create(vehicleGateway: VehicleGateway){
        return new UpdateVehicleUseCase(vehicleGateway);
    };

    public async execute(input: UpdateVehicleInputDto): Promise<UpdateVehicleOutputDto>{
        const aVehicle = await this.vehicleGateway.findById(input.id);
    
        if (!aVehicle) {
            throw new Error("Veículo não encontrado.");
        }

        aVehicle.update({
            plate: input.plate,
            mark: input.mark,
            model: input.model,
            year: input.year,
            type: input.type,
            chassis: input.chassis,
            status: input.status,
            dateAcquisition: input.dateAcquisition,
        });

        await this.vehicleGateway.update(aVehicle);

        return {
            id: aVehicle.id,
            updateAt: new Date(),
        }
    }
    
}