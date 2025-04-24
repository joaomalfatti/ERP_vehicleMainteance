import type { CreateVehicleInputDto, CreateVehicleUseCase } from "@domain/use-cases/vehicle/createVehicleUseCase";
import { HttpMethod, type RouteContract } from "../routesContract";
import type { Request, Response } from 'express'

export type CreateVehicleResponseDto = {
	idVehicle: string;
};

export class CreateVehicleRoute implements RouteContract {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly createVehicleService: CreateVehicleUseCase,
	) {}

	public static create(createVehicleService: CreateVehicleUseCase) {
		return new CreateVehicleRoute(
			"/vehicles",
			HttpMethod.POST,
			createVehicleService,
		);
	}

	public getHandler() {
		return async (request: Request, response: Response) => {
            const { plate, mark, chassis, year, dateAcquisition } = request.body

            const input: CreateVehicleInputDto = {
                plate, 
                mark, 
                chassis, 
                year, 
                dateAcquisition
            };

            const output: CreateVehicleResponseDto = await this.createVehicleService.execute(input);

            const responseBody = this.present(output)

            response.status(201).json(responseBody).send()
        }
	}
    private present(input: CreateVehicleResponseDto): CreateVehicleResponseDto {
        const response =  {idVehicle: input. idVehicle }

        return response;
    }

	getPath(): string {
		return this.path;
	}
	getMethod(): HttpMethod {
		return this.method;
	}
}
