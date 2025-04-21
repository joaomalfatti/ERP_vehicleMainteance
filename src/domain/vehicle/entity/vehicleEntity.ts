export type vehicleEntityProps = {
    id_vehicle: string;
    plate: string;
    mark: string;
    model: string;
    year: string;
    type: VehicleType;
    chassis: string;
    status: VehicleStatus;
    dateAcquisition: Date;
}

export enum VehicleType {
    cart = "Carreta",
    Toco = "Caminhão Toco",
    Truck = "Caminhão Truck"
}

export enum VehicleStatus {
    Active = "Ativo",
    Inactive = "Inativo",
    Maintenance = "Em manutenção"
}

export class VehicleEntityClass { 

    private constructor(private props: vehicleEntityProps){};

    public static create(plate: string, mark: string, model: string, year: string, type: VehicleType, chassis: string, status: VehicleStatus, dateAcquisition: Date) {
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
        });
    };

    public static with(props: vehicleEntityProps ) {
        return new VehicleEntityClass(props);
    };

    public get id() {
        return this.props.id_vehicle;
    };

    public get plate() {
        return this.props.plate;
    };

    public get mark() {
        return this.props.mark;
    };

    public get model() {
        return this.props.model;
    };

    public get year() {
        return this.props.year;
    };

    public get type() {
        return this.props.type;
    };

    public get chassis() {
        return this.props.chassis;
    };

    public get status() {
        return this.props.status;
    };

    public get dateAcquisition () {
        return this.props.dateAcquisition ;
    };
}
