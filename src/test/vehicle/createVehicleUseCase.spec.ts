import { beforeEach, describe, expect, it, vi } from "vitest";
import type { VehicleGateway } from "@domain/gateway/vehicle/vehicleGateway";
import { CreateVehicleUseCase } from "@domain/use-cases/vehicle/createVehicleUseCase";



describe('create an vehicle', () => {
    const mockVehicleGateway: VehicleGateway = {
        save: vi.fn()
    }

    const input = {
        plate: 'ABC-1234',
        mark: 'Volkswagen',
        chassis: '9BW',
        year: '2020',
        dateAcquisition: new Date('2024-01-01'),
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Should create a vehicle and return its ID', async () => {

        const useCase = CreateVehicleUseCase.create(mockVehicleGateway);
        console.log("Input para criar veículo:", input);

        const output = await useCase.execute(input)

        const saveMock = vi.mocked(mockVehicleGateway.save)
        expect(saveMock).toHaveBeenCalled();

        const savedVehicle = saveMock.mock.calls[0][0];
        expect(savedVehicle).toHaveProperty('idVehicle')
        console.log('Veículo Salvo:', savedVehicle)

        expect(output).toEqual({
            idVehicle: savedVehicle.idVehicle
        });
        console.log('Output retornando:', output)
    })
})