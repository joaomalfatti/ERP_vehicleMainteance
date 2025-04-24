import type { ListVehicleOutputDto, ListVehicleUseCase } from "@domain/use-cases/vehicle/listVehicleUseCase";
import { HttpMethod, type RouteContract } from "../routesContract";
import type { Request, Response } from "express";

export type ListVehicleResponseDto = {
	vehicles: {
		idVehicle: string;
		plate: string;
		mark: string;
		chassis: string;
		year: string;
		dateAcquisition: Date;
	}[];
};

export class ListVehicleRoute implements RouteContract {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly listVehicleService: ListVehicleUseCase,
	) {}

	public static create(listVehicleService: ListVehicleUseCase) {
		return new ListVehicleRoute(
			"/vehicles",
			HttpMethod.GET,
			listVehicleService,
		);
	}

	public getHandler() {
		return async(request: Request, response: Response) => {
            const output = await this.listVehicleService.execute();

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send()
        }
	}

    private present(input: ListVehicleOutputDto): ListVehicleResponseDto {
        const response: ListVehicleResponseDto = {
            vehicles: input.vehicles.map((vehicle) => ({
                idVehicle: vehicle.idVehicle,
                plate: vehicle.plate,
                mark: vehicle.mark,
                chassis: vehicle.chassis,
                year: vehicle.year,
                dateAcquisition: vehicle.dateAcquisition
            })),
        };

        return response
    }



	public getPath(): string {
		return this.path;
	}

	public getMethod(): HttpMethod {
		return this.method;
	}
}
