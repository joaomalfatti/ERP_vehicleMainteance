export class ChassisValidate{
    private readonly getChassisValidadevalue: string;

    constructor(value: string) {
        if(!value || value.trim().length < 5) {
            throw new Error ("Número do chassis inválido")
        }

        this.getChassisValidadevalue = value;
    }

    public getChassisValidade(): string {
        return this.getChassisValidadevalue;
    }
}