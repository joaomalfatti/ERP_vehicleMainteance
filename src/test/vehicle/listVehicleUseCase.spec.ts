import { describe, it, expect, vi } from 'vitest';
import { ListVehicleUseCase } from '@usecases/vehicle/listVehicleUseCase';
import { VehicleEntityClass} from '@domain/vehicle/entity/vehicleEntity';
import { VehicleTypeEnums } from '@domain/vehicle/enums/VehicleType';
import { VehicleStatusEnums } from '@domain/vehicle/enums/VehicleStatus';
import { PlateValidate } from '@domain/vehicle/value-objects/plateValue';
import { YearValidate } from '@domain/vehicle/value-objects/yearValue';
import { ChassisValidate } from '@domain/vehicle/value-objects/chassisValue';
import { DateAcquisitionValidate } from '@domain/vehicle/value-objects/dateAcquisitionValue';

describe('ListVehicleUseCase', () => {
  it('deve retornar a lista de veículos corretamente', async () => {
    const fakeVehicle = VehicleEntityClass.with({
      plate: new PlateValidate('ABC-1234'),
      mark: 'Fiat',
      model: 'Uno',
      year: new YearValidate('2020'),
      type: VehicleTypeEnums.Truck,
      chassis: new ChassisValidate('XYZ123456789'),
      status: VehicleStatusEnums.Active,
      dateAcquisition: new DateAcquisitionValidate(new Date()),
      updateAt: new Date(),
      id_vehicle: ''
    });
  
    const vehicleGateway = {
      list: vi.fn().mockResolvedValue([fakeVehicle]),
    };
  
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const useCase = ListVehicleUseCase.create(vehicleGateway as any);

    console.log('🚀 Chamando useCase.execute()...');
    const result = await useCase.execute();
    console.log('✅ Resultado da useCase:', JSON.stringify(result, null, 2));
  
    expect(result.vehicle).toHaveLength(1);
    expect(result.vehicle[0].plate).toBe('ABC-1234');
  });
});
