import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateVehicleUseCase } from "@usecases/vehicle/updateVehicleUseCase";
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import { VehicleEntityClass, VehicleType, VehicleStatus } from "@domain/vehicle/entity/vehicleEntity";

// Mock da gateway
let vehicleGatewayMock: VehicleGateway;
let updateVehicleUseCase: UpdateVehicleUseCase;

// Mock do veículo existente
const mockVehicle = VehicleEntityClass.create(
  "ABC-1234",
  "Volvo",
  "FH",
  "2022",
  VehicleType.Truck,
  "9BWZZZ377VT004251",
  VehicleStatus.Active,
  new Date("2022-01-01"),
  new Date()
);

// Espionamos o método update do veículo
const vehicleUpdateSpy = vi.spyOn(mockVehicle, "update");

beforeEach(() => {
  vehicleGatewayMock = {
    findById: vi.fn().mockResolvedValue(mockVehicle),
    update: vi.fn().mockResolvedValue(undefined),
    save: vi.fn(),
    list: vi.fn(),
    delete: vi.fn(),
  };

  updateVehicleUseCase = UpdateVehicleUseCase.create(vehicleGatewayMock);
});

describe("UpdateVehicleUseCase", () => {
  it("deve atualizar um veículo com sucesso", async () => {
    const input = {
      id: mockVehicle.id,
      plate: "XYZ-9876",
      mark: "Scania",
    };

    const result = await updateVehicleUseCase.execute(input);

    expect(vehicleGatewayMock.findById).toHaveBeenCalledWith(input.id);
    expect(vehicleUpdateSpy).toHaveBeenCalledWith({
      plate: input.plate,
      mark: input.mark,
      model: undefined,
      year: undefined,
      type: undefined,
      chassis: undefined,
      status: undefined,
      dateAcquisition: undefined,
    });

    expect(vehicleGatewayMock.update).toHaveBeenCalledWith(mockVehicle);
    expect(result.id).toBe(mockVehicle.id);
    expect(result.updateAt).toBeInstanceOf(Date);
  });

  it("deve lançar erro se o veículo não for encontrado", async () => {
    // @ts-ignore
    (vehicleGatewayMock.findById as vi.Mock).mockResolvedValueOnce(null);

    const input = { id: "id-inexistente" };

    await expect(updateVehicleUseCase.execute(input)).rejects.toThrowError("Veículo não encontrado.");
  });
});
