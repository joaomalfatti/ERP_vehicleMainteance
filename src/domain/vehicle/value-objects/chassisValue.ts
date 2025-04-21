export class ChassisValidate {
    private readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length < 5) {
            throw new Error("Número do chassi inválido.");
        }
        
        this.value = value;
    }

    public getChassisValidate(): string {
        return this.value;
    }
}