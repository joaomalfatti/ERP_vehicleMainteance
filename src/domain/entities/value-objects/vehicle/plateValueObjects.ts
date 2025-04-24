export class PlateValidate {
    private readonly getPlateValidadevalue: string;

    constructor(value: string) {
        if(!value || value.trim() === "") {
            throw new Error("A Placa do veículo é obrigatória.")
        }

        const plateRefex = /^[A-Z]{3}-\d{4}$/;
        if(!plateRefex.test(value)) {
            throw new Error("Formato da placa inválido.");
        }

        this.getPlateValidadevalue = value;
    }

    public getPlateValidade(): string {
        return this.getPlateValidadevalue;
    }
}