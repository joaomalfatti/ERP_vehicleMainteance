import type { VehicleStatusEnums } from '@domain/vehicle/enums/VehicleStatus'
import type { VehicleTypeEnums } from '@domain/vehicle/enums/VehicleType'
import { ChassisValidate } from '@domain/vehicle/value-objects/chassisValue'
import { DateAcquisitionValidate } from '@domain/vehicle/value-objects/dateAcquisitionValue'
import { PlateValidate } from '@domain/vehicle/value-objects/plateValue'
import { YearValidate } from '@domain/vehicle/value-objects/yearValue'
import { HttpMethod, type RouteContract } from '../routesContract'
import type { ListVehicleInputDto, ListVehicleOutputDto, ListVehicleUseCase } from '@usecases/vehicle/listVehicleUseCase'
import type { Request, Response } from 'express'

export type ListVehicleResponseDto = {
  vehicles: {
    id_vehicle: string
    plate: PlateValidate
    mark: string
    model: string
    year: YearValidate
    type: VehicleTypeEnums
    chassis: ChassisValidate
    status: VehicleStatusEnums
    dateAcquisition: DateAcquisitionValidate
    updateAt: Date
  }[]
}

export class ListVehicleRoute implements RouteContract {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listVehicleService: ListVehicleUseCase
  ) {}

  public static create(listVehicleService: ListVehicleUseCase) {
    return new ListVehicleRoute('/vehicle', HttpMethod.GET, listVehicleService)
  }

  public getHandler() {
    return async (request: Request, response: Response) => {

        const output = await this.listVehicleService.execute();

        const responseBody = this.present(output);

        response.status(200).json(responseBody).send();
    };
  }
  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
      return this.method
  }


  private present(input: ListVehicleOutputDto): ListVehicleResponseDto {
    const response: ListVehicleResponseDto = {
        vehicles: input.vehicle.map((vehicle) => ({
            id_vehicle: vehicle.id_vehicle,
            plate: new PlateValidate(vehicle.plate), // Convert string to PlateValidate
            mark: vehicle.mark,
            model: vehicle.model,
            year: new YearValidate(vehicle.year), // Convert string to YearValidate
            type: vehicle.type,
            chassis: new ChassisValidate(vehicle.chassis), // Convert string to ChassisValidate
            status: vehicle.status,
            dateAcquisition: new DateAcquisitionValidate(vehicle.dateAcquisition), // Convert to validated type
            updateAt: vehicle.updateAt,
        })),
    };
    return response;
}
}
