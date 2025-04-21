import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateVehicleUseCase } from "@usecases/vehicle/createVehicleUseCase";
import type { VehicleGateway } from '@domain/vehicle/gateway/vehicleGateway';
import { VehicleTypeEnums } from '@domain/vehicle/enums/VehicleType';
import { VehicleStatusEnums } from '@domain/vehicle/enums/VehicleStatus';

describe('CreateVehicleUseCase', () => {
    const mockVehicleGateway: VehicleGateway = {
        save: vi.fn<VehicleGateway['save']>(), // Mock tipado
        list: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findById: vi.fn()
    };

    const input = {
        plate: 'ABC-1234',
        mark: 'Volkswagen',
        model: 'Gol',
        year: '2020',
        type: VehicleTypeEnums.Truck,
        chassis: '9BWZZZ377VT004251',
        status: VehicleStatusEnums.Active,
        dateAcquisition : new Date('2024-01-01'),
        updateAt: new Date('2024-01-01'),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should create a vehicle and return its ID', async () => {
        const useCase = CreateVehicleUseCase.create(mockVehicleGateway);
        console.log('Input para criar veículo:', input);
        const output = await useCase.execute(input);
        

        // Acesso type-safe ao mock
        const saveMock = vi.mocked(mockVehicleGateway.save);
        expect(saveMock).toHaveBeenCalled(); // Verifica se foi chamado

        const savedVehicle = saveMock.mock.calls[0][0]; // Primeiro argumento da primeira chamada
        console.log('Veículo salvo:', savedVehicle);

        expect(savedVehicle).toHaveProperty('id');

        console.log('Output retornado:', output);
        expect(output).toEqual({ id: savedVehicle.id });
    });
});