import type { UseCaseContract } from "../UseCaseContract";

export type ListVehicleInputDto = undefined;

export type ListVehicleOutputDto = {
    vehicles: {
        idVehicle: string;
        mark: string;
        chassis: string;
        year: string;
        dateAcquisition: Date;
    }[],
};

export class ListVehicleUseCase implements UseCaseContract <ListVehicleInputDto, ListVehicleOutputDto> {
    execute(input: undefined): Promise<ListVehicleOutputDto> {
        throw new Error("Method not implemented.");
    }
    
}