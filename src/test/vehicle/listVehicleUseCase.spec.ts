import { describe, it, expect, vi } from 'vitest';
import { ListVehicleUseCase } from '@usecases/vehicle/listVehicleUseCase';
import { VehicleEntityClass, VehicleStatus, VehicleType } from '@domain/vehicle/entity/vehicleEntity';

describe('ListVehicleUseCase', () => {
  it('deve retornar a lista de veículos corretamente', async () => {
    const fakeVehicle = VehicleEntityClass.with({
      plate: 'ABC1234',
      mark: 'Fiat',
      model: 'Uno',
      year: '2020',
      type: VehicleType.Truck,
      chassis: 'XYZ123456789',
      status: VehicleStatus.Active,
      dateAcquisition: new Date(),
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
    expect(result.vehicle[0].plate).toBe('ABC1234');
  });
});
