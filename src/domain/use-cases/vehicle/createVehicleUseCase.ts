import type { VehicleGateway } from "@domain/gateway/vehicle/vehicleGateway"
import type { UseCaseContract } from "../UseCaseContract"
import { VehicleEntityClass } from "@domain/entities/vehicle/vehicleEntitys"
import { PlateValidate } from "@domain/entities/value-objects/vehicle/plateValueObjects"
import { ChassisValidate } from "@domain/entities/value-objects/vehicle/chassisValueObjects"
import { YearValidate } from "@domain/entities/value-objects/vehicle/yearValueObjects"
import { DateAcquisitionValidade } from "@domain/entities/value-objects/vehicle/dateAcquisitionValueObjects"

export type CreateVehicleInputDto = {
    plate: string
    mark: string
    chassis: string,
    year: string,
    dateAcquisition: Date
}

export type CreateVehicleOutputDto =  {
    idVehicle: string
}


export class CreateVehicleUseCase implements UseCaseContract<CreateVehicleInputDto, CreateVehicleOutputDto> {

    private constructor (private readonly vehicleGateway: VehicleGateway) {}

    public static create(vehicleGateway: VehicleGateway) {
        return new CreateVehicleUseCase(vehicleGateway)
    }


    public async execute({
        plate,
        mark,
        chassis,
        year,
        dateAcquisition
    }: CreateVehicleInputDto): Promise<CreateVehicleOutputDto> {
        const aVehicle = VehicleEntityClass.create(
            new PlateValidate(plate),
            mark,
            new ChassisValidate(chassis),
            new YearValidate(year),
            new DateAcquisitionValidade(dateAcquisition)
        );
    
        await this.vehicleGateway.save(aVehicle);
    
        const output = this.presentOutput(aVehicle);
    
        return output;
    }

    private presentOutput(VehicleEntityClass: VehicleEntityClass): CreateVehicleOutputDto{
        const output: CreateVehicleOutputDto = {
            idVehicle: VehicleEntityClass.idVehicle,
        }
        return output;
    }
}