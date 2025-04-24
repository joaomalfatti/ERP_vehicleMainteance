import { randomUUID } from "node:crypto"
import type { PlateValidate } from "../value-objects/vehicle/plateValueObjects"
import type { ChassisValidate } from "../value-objects/vehicle/chassisValueObjects"
import type { YearValidate } from "../value-objects/vehicle/yearValueObjects"
import type { DateAcquisitionValidade } from "../value-objects/vehicle/dateAcquisitionValueObjects"

export type vehicleEntityProps = {
    idVehicle: string
    plate: PlateValidate
    mark: string
    chassis: ChassisValidate
    year: YearValidate
    dateAcquisition: DateAcquisitionValidade
}

export class VehicleEntityClass {
    private constructor (private props: vehicleEntityProps) {}

    public static create (
        plate: PlateValidate,
        mark: string,
        chassis: ChassisValidate,
        year: YearValidate,
        dateAcquisition: DateAcquisitionValidade
    ) {
        if (!plate || !mark || !chassis || !year || !dateAcquisition) {
            throw new Error("Missing required vehicle data");
        }
        return new VehicleEntityClass({
            idVehicle: crypto.randomUUID().toString(),
            plate,
            mark,
            chassis,
            year,
            dateAcquisition
        })
    }

    public static with(vehicleprops: vehicleEntityProps) {
        return new VehicleEntityClass(vehicleprops)
    }

    public get idVehicle(): string {
        return this.props.idVehicle;
    }

    public get plate(): string {
        return this.props.plate.getPlateValidade();
    }

    public get mark(): string {
        return this.props.mark;
    }

    public get chassis(): string {
        return this.props.chassis.getChassisValidade(); // Assuming there's a method for Chassis
    }

    public get year(): string {
        return this.props.year.getYearValidate(); // Assuming there's a method for Year
    }

    public get dateAcquisition(): Date {
        return this.props.dateAcquisition.getDateAcquisition(); // Assuming a method for Date
    }
}