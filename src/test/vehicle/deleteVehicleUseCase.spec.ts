import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteVehicleUseCase } from "@usecases/vehicle/deleteVehicleUseCase"; // ajuste o caminho se necessário
import type { VehicleGateway } from "@domain/vehicle/gateway/vehicleGateway";
import { VehicleEntityClass, VehicleStatus, VehicleType } from "@domain/vehicle/entity/vehicleEntity";

describe("DeleteVehicleUseCase", () => {
    // @ts-ignore
  let vehicleGatewayMock: vi.Mocked<VehicleGateway>;
  let deleteVehicleUseCase: DeleteVehicleUseCase;

  beforeEach(() => {
    vehicleGatewayMock = {
      save: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn(),
    };

    deleteVehicleUseCase = DeleteVehicleUseCase.create(vehicleGatewayMock);
  });

  it("deve deletar um veículo com sucesso", async () => {
    const fakeVehicle = VehicleEntityClass.create(
      "ABC1234",
      "Ford",
      "Fiesta",
      "2015",
      VehicleType.Truck, // ou outro tipo correspondente ao seu `VehicleType`
      "CHASSIS123",
      VehicleStatus.Active, // ou outro status correspondente ao seu `VehicleStatus`
      new Date(),
      new Date()
    );

    vehicleGatewayMock.findById.mockResolvedValue(fakeVehicle);
    vehicleGatewayMock.delete.mockResolvedValue();

    const result = await deleteVehicleUseCase.execute({ id: fakeVehicle.id });

    expect(vehicleGatewayMock.findById).toHaveBeenCalledWith(fakeVehicle.id);
    expect(vehicleGatewayMock.delete).toHaveBeenCalledWith(fakeVehicle.id);
    expect(result).toEqual({ success: true });
  });

  it("deve lançar erro se o veículo não for encontrado", async () => {
    vehicleGatewayMock.findById.mockResolvedValue(null);

    await expect(
      deleteVehicleUseCase.execute({ id: "veiculo-inexistente" })
    ).rejects.toThrowError("Veículo não encontrado.");
  });
});
