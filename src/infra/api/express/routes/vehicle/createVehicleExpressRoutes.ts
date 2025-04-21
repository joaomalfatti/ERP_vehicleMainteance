import type { Request, Response } from 'express'
import { HttpMethod, type RouteContract } from '../routesContract'
import type { CreateVehicleInputDto, CreateVehicleUseCase } from '@usecases/vehicle/createVehicleUseCase'

export type CreateVehicleResponseDto = {
    id: string
}

export class CreateVehicleRoute implements RouteContract {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createVehicleService: CreateVehicleUseCase
  ) {}

  public static create(createVehicleService: CreateVehicleUseCase) {
    return new CreateVehicleRoute(
      '/vehicles',
      HttpMethod.POST,
      createVehicleService
    )
  } 
  public getHandler() {

    return async (request: Request, response: Response) => {
        const {plate, mark, model, year, type, chassis, status, dateAcquisition, updateAt} = request.body;

        const input: CreateVehicleInputDto = {
            
            plate, 
            mark, 
            model, 
            year, 
            type, 
            chassis, 
            status, 
            dateAcquisition, 
            updateAt
        };

        const output: CreateVehicleResponseDto = await this.createVehicleService.execute(input);

        const responseBody = this.present(output)

        response.status(201).json(responseBody).send()
    };
  }
  public getPath(): string {
      return this.path
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  private present(input: CreateVehicleResponseDto): CreateVehicleResponseDto {
    const response = {id: input.id}
    return response;
  }
}
