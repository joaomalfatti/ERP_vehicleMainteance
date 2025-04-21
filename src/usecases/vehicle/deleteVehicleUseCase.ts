import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import type { UseCase } from "@usecases/UseCase";

export type DeleteVehicleInputDto = {
    id: string;
}

export type DeleteVehicleOutputDto = {
    success: boolean;
}


export class DeleteVehicleUseCase implements UseCase<DeleteVehicleInputDto, DeleteVehicleOutputDto> {
    
    private constructor(private readonly vehicleGateway: VehicleGateway) {}

    public static create(vehicleGateway: VehicleGateway) {
        return new DeleteVehicleUseCase(vehicleGateway);
    }
    
    
    public async execute ({ id }: DeleteVehicleInputDto): Promise<DeleteVehicleOutputDto> {
        const vehicleExists = await this.vehicleGateway.findById(id);

        if (!vehicleExists) {
            throw new Error("Veículo não encontrado.");
        }

        await this.vehicleGateway.delete(id);

        return {
            success: true,
        }
    }
    
}