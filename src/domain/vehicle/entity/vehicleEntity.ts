import type { VehicleStatusEnums } from "../enums/VehicleStatus"
import type { VehicleTypeEnums } from "../enums/VehicleType"
import { ChassisValidate } from "../value-objects/chassisValue"
import {  DateAcquisitionValidate } from "../value-objects/dateAcquisitionValue"
import { PlateValidate } from "../value-objects/plateValue"
import { YearValidate } from "../value-objects/yearValue"

export type vehicleEntityProps = {
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
}


export class VehicleEntityClass {
  private constructor(private props: vehicleEntityProps) {}

  public static create(
    plateValue: string,
    mark: string,
    model: string,
    yearValue: string,
    type: VehicleTypeEnums,
    chassisValue: string,
    status: VehicleStatusEnums,
    dateAcquisitionValue: Date,
    updateAt: Date
  ) {

    const plate = new PlateValidate(plateValue)
    const year = new YearValidate(yearValue)
    const chassis = new ChassisValidate(chassisValue)
    const dateAcquisition = new DateAcquisitionValidate(dateAcquisitionValue)
    
    return new VehicleEntityClass({
      id_vehicle: crypto.randomUUID().toString(),
      plate,
      mark,
      model,
      year,
      type,
      chassis,
      status,
      dateAcquisition,
      updateAt,
    })
  }

  public static with(props: vehicleEntityProps) {
    return new VehicleEntityClass(props)
  }

  public update(
    propsToUpdate: Partial<Omit<vehicleEntityProps, 'id_vehicle' | 'updateAt'>>
  ) {

    if(propsToUpdate.plate) propsToUpdate.plate = new PlateValidate(propsToUpdate.plate.getPlateValidate())

    if(propsToUpdate.year) propsToUpdate.year = new YearValidate(propsToUpdate.year.getYearValidate())

    if(propsToUpdate.chassis) propsToUpdate.chassis = new ChassisValidate(propsToUpdate.chassis.getChassisValidate())

    if(propsToUpdate.dateAcquisition) propsToUpdate.dateAcquisition = new DateAcquisitionValidate(propsToUpdate.dateAcquisition.getDateAcquisitionValidate())

    this.props = {
      ...this.props,
      ...propsToUpdate,
      updateAt: new Date(),
    }
  }


  public get id() {
    return this.props.id_vehicle
  }

  public get plate() {
    return this.props.plate.getPlateValidate();
  }

  public get mark() {
    return this.props.mark
  }

  public get model() {
    return this.props.model
  }

  public get year() {
    return this.props.year.getYearValidate();
  }

  public get type() {
    return this.props.type
  }

  public get chassis() {
    return this.props.chassis.getChassisValidate();
  }

  public get status() {
    return this.props.status
  }

  public get dateAcquisition() {
    return this.props.dateAcquisition.getDateAcquisitionValidate();
  }

  public get updateAt() {
    return this.props.updateAt
  }
}
