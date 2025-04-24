import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ListVehicleUseCase } from "@domain/use-cases/vehicle/listVehicleUseCase";
import { VehicleEntityClass } from "@domain/entities/vehicle/vehicleEntitys";
import type { VehicleGateway } from "@domain/gateway/vehicle/vehicleGateway";
import type { PlateValidate } from "@domain/entities/value-objects/vehicle/plateValueObjects";
import type { ChassisValidate } from "@domain/entities/value-objects/vehicle/chassisValueObjects";
import type { YearValidate } from "@domain/entities/value-objects/vehicle/yearValueObjects";
import type { DateAcquisitionValidade } from "@domain/entities/value-objects/vehicle/dateAcquisitionValueObjects";

// Mocks respeitando a estrutura sem acessar métodos privados

const plateMock: PlateValidate = {
  getPlateValidade: () => "ABC1234"
} as PlateValidate;

const chassisMock: ChassisValidate = {
  getChassisValidade: () => "CHASSIS123"
} as ChassisValidate;

const yearMock: YearValidate = {
  getYearValidate: () => "2020"
} as YearValidate;

const dateMock: DateAcquisitionValidade = {
  getDateAcquisition: () => new Date("2021-01-01")
} as DateAcquisitionValidade;

describe("ListVehicleUseCase", () => {
  let vehicleGatewayMock: VehicleGateway;

  beforeEach(() => {
    vehicleGatewayMock = {
      list: vi.fn()
    } as unknown as VehicleGateway;
  });

  it("deve listar todos os veículos", async () => {
    const vehicle = VehicleEntityClass.with({
      idVehicle: "1",
      plate: plateMock,
      mark: "Volvo",
      chassis: chassisMock,
      year: yearMock,
      dateAcquisition: dateMock
    });

    (vehicleGatewayMock.list as Mock).mockResolvedValue([vehicle]);

    const useCase = ListVehicleUseCase.create(vehicleGatewayMock);
    const result = await useCase.execute();

    console.log("Resultado da listagem:", result);

    expect(result.vehicles[0].idVehicle).toBe("1");
    expect(result.vehicles[0].plate).toBe("ABC1234");
    expect(result.vehicles[0].mark).toBe("Volvo");
    expect(result.vehicles[0].chassis).toBe("CHASSIS123");
    expect(result.vehicles[0].year).toBe("2020");
    expect(result.vehicles[0].dateAcquisition).toEqual(new Date("2021-01-01"));
  });
});
