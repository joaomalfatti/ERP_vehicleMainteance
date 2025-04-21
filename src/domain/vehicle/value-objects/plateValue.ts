export class PlateValidate {
    private readonly value: string;

    constructor(value: string) {

        if(!value || value.trim() === "") {
            throw new Error('A placa do veículo é obrigatória.')
        }

        const plateRefex = /^[A-Z]{3}-\d{4}$/;
        if(!plateRefex.test(value)) {
            throw new Error("Formato da placa inválido.");
        }

        this.value = value;
    }

    public getPlateValidate(): string {
        return this.value;
    }
}